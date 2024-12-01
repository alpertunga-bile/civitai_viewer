import { Signal } from "@preact/signals-core";
import { PicoStyle } from "../components/DefaultComponents.tsx";
import { JSX } from "preact/jsx-runtime";

export default function DropdownModelVersion(
  props: {
    model_version_names: Signal<string[]>;
    onChange: JSX.GenericEventHandler<HTMLSelectElement>;
  },
) {
  return (
    <PicoStyle>
      <select className="overflow-auto" onChange={props.onChange}>
        {props.model_version_names.value.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </PicoStyle>
  );
}
