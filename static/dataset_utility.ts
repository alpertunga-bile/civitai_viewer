import { existsSync } from "$std/fs/mod.ts";
import { parse } from "$std/csv/parse.ts";
import { encode } from "cbor-x";

export function getDatasetNameFromUrl(url: string): string {
    const dataset_name = url.split("/").pop();

    if (!dataset_name) {
        return "";
    }

    return dataset_name;
}

function getDatasetPath(dataset_name: string): string {
    return `datasets/${dataset_name}.csv`;
}

export function extractCivitaiIdFromUrl(
    url: string,
): { model_id: string; model_version_id: string } {
    const numbers = url.split("/")[4].match(/\d+/g);
    let model_id = "";
    let model_version_id = "";

    if (!numbers) {
        return { model_id, model_version_id };
    }

    model_id = numbers[0];

    if (numbers.length == 2) {
        model_version_id = numbers[1];
    }

    return { model_id, model_version_id };
}

export function isDatasetExists(dataset_name: string): boolean {
    const dataset_path = getDatasetPath(dataset_name);

    if (existsSync(dataset_path)) {
        return true;
    } else {
        return false;
    }
}

export async function prepareLoraMap(
    dataset_name: string,
): Promise<Map<string, Uint8Array>> {
    const dataset_lora_map = new Map<string, Uint8Array>();

    const dataset_path = getDatasetPath(dataset_name);
    const csv_text = Deno.readTextFileSync(dataset_path);
    const csv_data = parse(csv_text, { skipFirstRow: true, strip: true });

    const promises: Promise<any>[] = [];

    csv_data.forEach((data) => {
        if (data.Lora) {
            const { model_id } = extractCivitaiIdFromUrl(data.Lora);
            promises.push(
                fetch(`https://civitai.com/api/v1/models/${model_id}`).then(
                    (response) => response.json(),
                ),
            );
        }
    });

    const json_data = await Promise.all(promises);

    json_data.forEach((data) =>
        dataset_lora_map.set(data.name, new Uint8Array(encode(data)))
    );

    return dataset_lora_map;
}
