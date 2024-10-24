import { Handlers, PageProps } from "$fresh/server.ts";
import {
    isDatasetExists,
    prepareLoraMap,
} from "../../static/dataset_utility.ts";

export const handler: Handlers = {
    async GET(_req, ctx) {
        const { dataset } = ctx.params;

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
import NavDatasets from "../../components/NavDataset.tsx";
import LoraModelInfo from "../../components/LoraModelInfo.tsx";

export default function DatasetPage(props: PageProps) {
    const { dataset } = props.params;
    const { dataset_lora_map } = props.data;

    return (
        <div>
            <div className="pdx-4">
                <NavDatasets datasetName={dataset} />
            </div>
            <LoraModelInfo lora_map={dataset_lora_map}></LoraModelInfo>
        </div>
    );
}
