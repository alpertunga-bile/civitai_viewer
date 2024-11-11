import type { Handlers, PageProps } from "$fresh/server.ts";
import ModelCards from "../../components/ModelCards.tsx";
import ModelSearchForm from "../../components/ModelSearchForm.tsx";
import {
    attach_url_search,
    get_handler_data,
    IHandlerData,
    image_url_history,
    model_url_history,
} from "../../static/utilities.ts";
import {
    DefaultClosedAccordion,
    MainDiv,
    NavFixedTop,
} from "../../components/DefaultComponents.tsx";
import NavPageButtons from "../../components/NavPageButtons.tsx";
import NavBreadcrumb from "../../components/NavBreadcrumb.tsx";

export const handler: Handlers<IHandlerData> = {
    async GET(req, ctx) {
        const civitai_url: URL = attach_url_search({
            search_url: req.url,
            url: "https://civitai.com/api/v1/models",
        });

        image_url_history.reset();

        civitai_url.searchParams.set("limit", "100");

        if (civitai_url.searchParams.has("nsfw")) {
            const value = civitai_url.searchParams.get("nsfw")
                ? "false"
                : "true";
            civitai_url.searchParams.set("nsfw", value);
        }

        const handler_data: IHandlerData = await get_handler_data(
            civitai_url.toString(),
            req.url.toString(),
        );

        return await ctx.render(handler_data);
    },
};

export default function SearchModel(props: PageProps) {
    const { items, searched_url, next_cursor } = props.data;

    return (
        <MainDiv>
            <div className={"px-4 pico"}>
                <NavBreadcrumb crumbs={["Search", "Models"]} />
            </div>
            <div className="px-4 py-8">
                <NavFixedTop>
                    <DefaultClosedAccordion summary="Search Parameters">
                        <ModelSearchForm />
                    </DefaultClosedAccordion>
                    <hr></hr>
                    <NavPageButtons
                        searched_url={searched_url}
                        next_cursor={next_cursor}
                        url_history={model_url_history}
                    />
                </NavFixedTop>
                <ModelCards items={items} />
            </div>
        </MainDiv>
    );
}
