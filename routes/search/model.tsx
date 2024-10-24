import type { Handlers, PageProps } from "$fresh/server.ts";
import { encode } from "cbor-x";
import ModelCards from "../../components/ModelCards.tsx";
import ModelSearchForm from "../../components/ModelSearchForm.tsx";
import { attach_url_search } from "../../static/utilities.ts";

interface IHandlerData {
    items: Uint8Array[];
    url: string;
    next_cursor: string;
}

export const handler: Handlers<IHandlerData> = {
    async GET(req, ctx) {
        const civitai_url = attach_url_search({
            search_url: req.url,
            url: "https://civitai.com/api/v1/models",
        });

        civitai_url.searchParams.set("limit", "10");

        const civitai_data = await fetch(civitai_url.toString()).then((res) =>
            res.json()
        );

        if (!civitai_data.items) {
            return ctx.render({
                items: [],
                url: req.url,
                next_cursor: "",
            });
        }

        const next_cursor = civitai_data.metadata.nextCursor || "";

        const items = civitai_data.items.map((item) =>
            new Uint8Array(encode(item))
        );

        return await ctx.render({
            items: items,
            url: req.url,
            next_cursor: next_cursor,
        });
    },
};

export default function SearchModel(props: PageProps) {
    const { items, url, next_cursor } = props.data;

    let next_url: string = "";
    let prev_url: string = "";

    if (url) {
        prev_url = url;
        if (next_cursor) {
            const temp_url = new URL(url);
            temp_url.searchParams.set("page", next_cursor);
            next_url = temp_url.toString();
        }
    }

    return (
        <div className="pdx-4 pdy-8">
            <ModelSearchForm />
            <hr></hr>
            <div>
                <ModelCards items={items} />
            </div>
        </div>
    );
}
