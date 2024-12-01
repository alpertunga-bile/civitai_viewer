import { JSX } from "preact/jsx-runtime";
import { PicoStyle } from "../components/DefaultComponents.tsx";

export default function DropdownModelSelect(
  props: {
    lora_names: string[];
    onChange: JSX.GenericEventHandler<HTMLSelectElement>;
  },
) {
  return (
    <PicoStyle>
      <select className="overflow-auto" onChange={props.onChange}>
        <option key={"Lora Default"} selected disabled value="">
          Select a LoRA model
        </option>
        {props.lora_names.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </PicoStyle>
  );
}
