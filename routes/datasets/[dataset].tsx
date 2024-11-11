import { Handlers, PageProps } from "$fresh/server.ts";
import {
    isDatasetExists,
    prepareLoraMap,
} from "../../static/dataset_utility.ts";

export const handler: Handlers = {
    async GET(_req, ctx) {
        const { dataset } = ctx.params;
        reset_histories();

        if (!isDatasetExists(dataset)) {
            return ctx.renderNotFound();
        }

        const dataset_lora_map = await prepareLoraMap(dataset);

        return await ctx.render({ dataset_lora_map: dataset_lora_map });
    },
};

/*
 * Components
 */
import NavBreadcrumb from "../../components/NavBreadcrumb.tsx";
import LoraModelInfo from "../../components/LoraModelInfo.tsx";
import { capitalize, reset_histories } from "../../static/utilities.ts";
import { MainDiv } from "../../components/DefaultComponents.tsx";

export default function DatasetPage(props: PageProps) {
    const { dataset } = props.params;
    const { dataset_lora_map } = props.data;

    return (
        <MainDiv>
            <div className="px-4 pico">
                <NavBreadcrumb crumbs={["Datasets", capitalize(dataset)]} />
            </div>
            <LoraModelInfo lora_map={dataset_lora_map}></LoraModelInfo>
        </MainDiv>
    );
}
