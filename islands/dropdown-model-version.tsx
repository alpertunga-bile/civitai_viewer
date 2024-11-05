import { Signal } from "@preact/signals-core";

export default function DropdownModelVersion(
    props: { model_version_names: Signal<string[]>; onChange },
) {
    return (
        <select className="overflow-auto" onChange={props.onChange}>
            {props.model_version_names.value.map((name) => (
                <option key={name} value={name}>{name}</option>
            ))}
        </select>
    );
}
