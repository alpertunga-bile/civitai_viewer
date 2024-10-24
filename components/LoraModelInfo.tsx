import ModelInfo from "../islands/model-info.tsx";

export default function LoraModelInfo(
    props: { lora_map: Map<string, Uint8Array> },
) {
    return (
        <div className="div-center">
            <ModelInfo
                lora_keys={props.lora_map.keys().toArray()}
                lora_values={props.lora_map.values().toArray()}
            >
            </ModelInfo>
        </div>
    );
}
