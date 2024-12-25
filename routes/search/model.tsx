import type { Handlers, PageProps } from "$fresh/server.ts";
import ModelCards from "../../components/ModelCards.tsx";
import ModelSearchForm from "../../components/ModelSearchForm.tsx";
import {
  attach_url_search,
  get_handler_data,
  get_tag_data,
  IHandlerData,
  image_url_history,
  ITagInfo,
  model_url_history,
} from "../../static/utilities.ts";
import {
  DefaultClosedAccordion,
  MainDiv,
  NavFixedTop,
} from "../../components/DefaultComponents.tsx";
import NavPageButtons from "../../components/NavPageButtons.tsx";
import NavBreadcrumb from "../../components/NavBreadcrumb.tsx";

interface IModelHandlerData {
  tag_data: ITagInfo;
  handler_data: IHandlerData;
}

export const handler: Handlers<IModelHandlerData> = {
  async GET(req, ctx) {
    const civitai_url: URL = attach_url_search({
      search_url: req.url,
      url: "https://civitai.com/api/v1/models",
    });

    image_url_history.reset();

    civitai_url.searchParams.set("limit", "100");

    if (civitai_url.searchParams.has("nsfw")) {
      const value = civitai_url.searchParams.get("nsfw") ? "false" : "true";
      civitai_url.searchParams.set("nsfw", value);
    }

    const handler_data: IHandlerData = await get_handler_data(
      civitai_url.toString(),
      req.url.toString(),
    );

    const tag_data: ITagInfo = await await get_tag_data();

    return await ctx.render({ handler_data: handler_data, tag_data: tag_data });
  },
};

export default function SearchModel(props: PageProps) {
  const { handler_data, tag_data } = props.data;

  return (
    <MainDiv>
      <NavBreadcrumb crumbs={["Search", "Models"]} />
      <div className="px-4 py-8">
        <NavFixedTop>
          <DefaultClosedAccordion summary="Search Parameters">
            <ModelSearchForm tags={tag_data.tags} />
          </DefaultClosedAccordion>
          <NavPageButtons
            searched_url={handler_data.searched_url}
            next_cursor={handler_data.next_cursor}
            url_history={model_url_history}
          />
        </NavFixedTop>
        <ModelCards items={handler_data.items} />
      </div>
    </MainDiv>
  );
}
