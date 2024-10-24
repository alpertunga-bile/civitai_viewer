import { Signal } from "@preact/signals-core";

export default function DropdownModelSelect(
    props: { lora_names: string[]; onChange },
) {
    return (
        <select className="overflow-auto" onChange={props.onChange}>
            <option selected disabled value="">Select a LoRA model</option>
            {props.lora_names.map((name) => <option value={name}>{name}
            </option>)}
        </select>
    );
}
