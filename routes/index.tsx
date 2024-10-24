import type { PageProps } from "$fresh/server.ts";
import ListElementLinkDataset from "../components/ListElementLinkDataset.tsx";
import * as path from "jsr:@std/path";
import { INavObject, NavRouteColumns } from "../components/NavRouteColumns.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const dataset_filenames = [];

    for await (
      const post of Deno.readDir(
        path.join(import.meta.dirname, "..", "datasets"),
      )
    ) {
      if (post.name.includes(".csv")) {
        dataset_filenames.push(post.name.replace(".csv", ""));
      }
    }

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
    <div className="div-center">
      <h1 className="elem-div-center">Lora Dataset Viewer</h1>
      <div className="nav-row">
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
  );
}
