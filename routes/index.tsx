import type { Handlers, PageProps } from "$fresh/server.ts";
import * as path from "jsr:@std/path";
import { INavObject, NavRouteColumns } from "../components/NavRouteColumns.tsx";
import { MainDiv } from "../components/DefaultComponents.tsx";
import { reset_histories } from "../static/utilities.ts";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const dataset_filenames = [];

    for await (
      const post of Deno.readDir(
        path.join(import.meta.dirname, "..", "datasets"),
      )
    ) {
      if (post.name.endsWith(".csv")) {
        dataset_filenames.push(post.name.replace(".csv", ""));
      }
    }

    reset_histories();

    return await ctx.render({ dataset_filenames: dataset_filenames });
  },
};

export default function Home(props: PageProps) {
  const { dataset_filenames } = props.data;

  const dataset_nav_elements: INavObject[] = dataset_filenames.map((
    filename,
  ) => ({ href: `/datasets/${filename}`, text: filename }));

  const search_nav_elements: INavObject[] = [
    { href: "/search/model", text: "model" },
    { href: "/search/image", text: "image" },
  ];

  return (
    <MainDiv>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pico">
        <h1 className="flex items-center justify-center">
          Lora Dataset Viewer
        </h1>
        <div className="flex flex-row justify-around">
          <NavRouteColumns
            category_name="Search"
            list_elements={search_nav_elements}
          />
          <NavRouteColumns
            category_name="Dataset"
            list_elements={dataset_nav_elements}
          />
        </div>
      </div>
    </MainDiv>
  );
}
