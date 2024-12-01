import { encode } from "cbor-x";
import {
  CacherManager,
  CacherManagerReturnInfo,
  default_cacher_manager_options,
} from "../static/cacher_manager.ts";

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function attach_url_search(
  data: { search_url: string; url: string },
): URL {
  const search_url = new URL(data.search_url);
  const url = new URL(data.url);

  search_url.searchParams.forEach((value, key) => {
    value !== "" && url.searchParams.append(key, value);
  });

  return url;
}

export class URLHistory {
  constructor(home_page: string) {
    this.url_history = new Map<string, number>();
    this.url_history.set(home_page, 0);
    this.homepage = home_page;
  }

  add_url(url: string) {
    if (this.url_history.has(url)) {
      return;
    }

    const prev_index = this.url_history.size < 2
      ? 0
      : this.url_history.size - 2;
    this.url_history.set(url, prev_index);
  }

  get_prev_url(next_url: string): string {
    const prev_index = this.url_history.has(next_url)
      ? this.url_history.get(next_url)
      : 0;

    return this.url_history.keys().toArray()[prev_index!];
  }

  reset() {
    /*
     * check with 1 because of the homepage is added as default
     */
    if (this.url_history.size === 1) {
      return;
    }

    this.url_history.clear();
    this.url_history.set(this.homepage, 0);
  }

  readonly url_history: Map<string, number>;
  readonly homepage: string;
}

export const model_url_history = new URLHistory("/search/model");
export const image_url_history = new URLHistory("/search/image");

export function reset_histories() {
  model_url_history.reset();
  image_url_history.reset();
}

const cache_manager_options = default_cacher_manager_options;
cache_manager_options.save_path = ".cache";

export const cache_manager = new CacherManager(cache_manager_options);

export interface IHandlerData {
  items: Uint8Array[];
  searched_url: string;
  next_cursor: string;
}

export async function get_handler_data(
  civitai_url: string,
  req_url: string,
): Promise<IHandlerData> {
  const url = civitai_url.toString();
  let civitai_data = undefined;

  if (cache_manager.is_cache_exists(url)) {
    const return_info: CacherManagerReturnInfo = await cache_manager.get_data(
      url,
    );

    if (!return_info.is_expired) {
      civitai_data = JSON.parse(return_info.data);
    }
  }

  if (!civitai_data) {
    civitai_data = await fetch(civitai_url.toString()).then((res) =>
      res.json()
    );

    cache_manager.save_from_str(JSON.stringify(civitai_data), url);
  }

  const handler_data: IHandlerData = {
    items: [],
    searched_url: req_url.toString(),
    next_cursor: "0",
  };

  if (!civitai_data.items) {
    return handler_data;
  }

  handler_data.items = civitai_data.items.map((item) =>
    new Uint8Array(encode(item))
  );

  handler_data.next_cursor =
    civitai_data.metadata && civitai_data.metadata.nextCursor
      ? civitai_data.metadata.nextCursor
      : "0";

  return handler_data;
}

export async function get_tags_by_char(
  char: string,
  min_model_count?: number,
): Promise<Set<string>> {
  const tags: Set<string> = new Set();

  const url = new URL(`https://civitai.com/api/v1/tags`);
  url.searchParams.set("limit", "200");
  url.searchParams.set("query", char);
  url.searchParams.set("page", "1");

  const temp_json = await fetch(url.toString()).then((res) => res.json());
  const totalpages = temp_json.metadata && temp_json.metadata.totalPages - 1;

  const tag_url_promises = [];

  const process_tag = function (tag: string): string {
    let processed: string = tag.replaceAll(",", "");
    processed = processed.replaceAll(/\s+/g, " ");

    return processed;
  };

  for (let i = 1; i < totalpages; ++i) {
    url.searchParams.set("page", `${i}`);

    tag_url_promises.push(
      fetch(url.toString()).then((res) => res.json()),
    );
  }

  const json_data = await Promise.all(tag_url_promises);

  json_data.forEach((data) => {
    data.items.forEach((item) => {
      if (min_model_count && item.modelCount < min_model_count) {
        return;
      }

      tags.add(process_tag(item.name));
    });
  });

  return tags;
}
