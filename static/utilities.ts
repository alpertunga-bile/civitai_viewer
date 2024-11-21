import { encode } from "cbor-x";

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

        return this.url_history.keys().toArray()[prev_index];
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

export interface IHandlerData {
    items: Uint8Array[];
    searched_url: string;
    next_cursor: string;
}

export async function get_handler_data(
    civitai_url: string,
    req_url: string,
): Promise<IHandlerData> {
    const civitai_data = await fetch(civitai_url.toString()).then((res) =>
        res.json()
    );

    let next_cursor = "0";

    if (!civitai_data.items) {
        return ({
            items: [],
            searched_url: req_url.toString(),
            next_cursor: next_cursor,
        });
    }

    const items = civitai_data.items.map((item) =>
        new Uint8Array(encode(item))
    );

    next_cursor = civitai_data.metadata && civitai_data.metadata.nextCursor
        ? civitai_data.metadata.nextCursor
        : "0";

    return ({
        items: items,
        searched_url: req_url.toString(),
        next_cursor: next_cursor,
    });
}
