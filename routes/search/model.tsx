import type { Handlers, PageProps } from "$fresh/server.ts";
import { encode } from "cbor-x";
import ModelCards from "../../components/ModelCards.tsx";
import ModelSearchForm from "../../components/ModelSearchForm.tsx";
import { attach_url_search } from "../../static/utilities.ts";

interface IHandlerData {
    items: Uint8Array[];
}

export const handler: Handlers<IHandlerData> = {
    async GET(req, ctx) {
        const civitai_url = attach_url_search({
            search_url: req.url,
            url: "https://civitai.com/api/v1/models",
        });

        const civitai_data = await fetch(civitai_url.toString()).then((res) =>
            res.json()
        );

        if (!civitai_data.items) {
            return ctx.render({
                items: [],
            });
        }

        const items = civitai_data.items.map((item) =>
            new Uint8Array(encode(item))
        );

        return await ctx.render({
            items: items,
        });
    },
};

export default function SearchModel(props: PageProps) {
    const { items } = props.data;

    return (
        <div className="pdx-4 pdy-8">
            <details open className="fixed-top-search-bar">
                <summary>Search Parameters</summary>
                <ModelSearchForm />
            </details>
            <div>
                <ModelCards items={items} />
            </div>
        </div>
    );
}
