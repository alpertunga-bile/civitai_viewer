import { Handlers, PageProps } from "$fresh/server.ts";
import {
    DefaultOpenedAccordion,
    NavFixedTop,
} from "../../components/DefaultComponents.tsx";
import ImageCards from "../../components/ImageCards.tsx";
import ImageSearchForm from "../../components/ImageSearchForm.tsx";
import NavPageButtons from "../../components/NavPageButtons.tsx";
import {
    attach_url_search,
    get_handler_data,
    IHandlerData,
    image_url_history,
} from "../../static/utilities.ts";

export const handler: Handlers<IHandlerData> = {
    async GET(req, ctx) {
        const civitai_url: URL = attach_url_search({
            search_url: req.url,
            url: "https://civitai.com/api/v1/images",
        });

        civitai_url.searchParams.set("limit", "200");

        if (
            civitai_url.searchParams.has("nsfw") &&
            civitai_url.searchParams.get("nsfw") === "All"
        ) {
            civitai_url.searchParams.delete("nsfw");
        }

        const handler_data: IHandlerData = await get_handler_data(
            civitai_url.toString(),
            req.url.toString(),
        );

        return await ctx.render(handler_data);
    },
};

export default function SearchImage(props: PageProps) {
    const { items, searched_url, next_cursor } = props.data;

    return (
        <div className="pdx-4 pdy-8">
            <NavFixedTop>
                <DefaultOpenedAccordion summary="Search Parameters">
                    <ImageSearchForm />
                </DefaultOpenedAccordion>
                <hr></hr>
                <NavPageButtons
                    searched_url={searched_url}
                    next_cursor={next_cursor}
                    url_history={image_url_history}
                />
            </NavFixedTop>
            <ImageCards items={items} />
        </div>
    );
}