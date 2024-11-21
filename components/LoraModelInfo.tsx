import ModelInfo from "../islands/model-info.tsx";

export default function LoraModelInfo(
    props: { lora_map: Map<string, Uint8Array> },
) {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <ModelInfo
                lora_keys={props.lora_map.keys().toArray()}
                lora_values={props.lora_map.values().toArray()}
            >
            </ModelInfo>
        </div>
    );
}
