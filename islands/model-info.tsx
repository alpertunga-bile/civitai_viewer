import { batch, computed, useSignal } from "@preact/signals";
import { decode } from "cbor-x";
import DropdownModelVersion from "./dropdown-model-version.tsx";
import DropdownModelSelect from "./dropdown-model-select.tsx";
import ImageOverlay from "./image-overlay.tsx";

import { PicoStyle } from "../components/DefaultComponents.tsx";
import TrainedWordCards from "../components/TrainedWordsCard.tsx";
import { JSX } from "preact/jsx-runtime";

export default function ModelInfo(
  props: { lora_keys: string[]; lora_values: Uint8Array[] },
) {
  const data = useSignal(decode(props.lora_values[0]));
  const model_data = useSignal(data.value.modelVersions[0]);

  const selected_lora = useSignal("");
  const selected_version = useSignal("");
  const trained_words = useSignal(["none"]);
  const image_link = useSignal("");
  const download_link = useSignal("/");
  const image_index = useSignal(0);

  const lora_link = computed(() =>
    `https://www.civitai.com/models/${data.value.id}`
  );
  const total_images = computed(() => model_data.value.images.length);
  const model_version_names = computed(() =>
    data.value.modelVersions.map((model) => model.name)
  );

  const dropdownOnChange: JSX.GenericEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const new_value = event.currentTarget.value;
    const value_index = props.lora_keys.indexOf(new_value);
    const lora_data = decode(props.lora_values[value_index]);

    batch(() => {
      selected_lora.value = new_value;

      data.value = lora_data;
      model_data.value = lora_data.modelVersions[0];

      image_index.value = 0;
      image_link.value = lora_data.modelVersions[0].images[0].url;
      download_link.value = lora_data.modelVersions[0].downloadUrl;
      trained_words.value = lora_data.modelVersions[0].trainedWords
        ? lora_data.modelVersions[0].trainedWords
        : ["none"];

      selected_version.value = model_version_names.value[0];
    });
  };

  const versionOnChange: JSX.GenericEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    model_data.value =
      data.value.modelVersions.filter((element) =>
        element.name === event.currentTarget.value
      )[0];

    batch(() => {
      selected_version.value = event.currentTarget.value;
      image_index.value = 0;
      image_link.value = model_data.value.images[0].url;
      download_link.value = model_data.value.downloadUrl;
      trained_words.value = model_data.value.trainedWords
        ? model_data.value.trainedWords
        : ["none"];
    });
  };

  const imageButtonNextOnClick: JSX.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();

    const new_image_index = total_images.value <= 1 ||
        image_index.value + 1 === total_images.value
      ? 0
      : image_index.value + 1;

    batch(() => {
      image_index.value = new_image_index;
      image_link.value = model_data.value.images[new_image_index].url;
    });
  };

  const imageButtonPrevOnClick: JSX.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.preventDefault();

    const new_image_index = image_index.value === 0
      ? total_images.value - 1
      : image_index.value - 1;

    batch(() => {
      image_index.value = new_image_index;
      image_link.value = model_data.value.images[new_image_index].url;
    });
  };

  return (
    <div className="flex flex-col justify-evenly items-stretch gap-2.5">
      <DropdownModelSelect
        lora_names={props.lora_keys}
        onChange={dropdownOnChange}
      />
      <div className="flex flex-row flex-grow justify-evenly gap-2.5">
        <div className="flex flex-col justify-evenly items-stretch gap-2.5">
          <div className="flex flex-col justify-evenly items-stretch gap-2.5">
            <DropdownModelVersion
              model_version_names={model_version_names}
              onChange={versionOnChange}
            />
          </div>
          <TrainedWordCards trained_words={trained_words} />
        </div>
        <ImageOverlay
          image_url={image_link}
          current_image_index={image_index}
          total_image_count={total_images}
          prevOnClick={imageButtonPrevOnClick}
          nextOnClick={imageButtonNextOnClick}
        />
      </div>
      <PicoStyle>
        <div className="flex flex-row flex-grow justify-evenly gap-2.5">
          <a className="contrast" href={lora_link}>
            <button
              data-tooltip={`Go to ${lora_link}`}
              data-placement="left"
              className="outline secondary"
            >
              Follow Link 🔗
            </button>
          </a>
          <a className="contrast" href={download_link}>
            <button
              data-tooltip={`Download ${selected_version} model`}
              data-placement="bottom"
              className="outline secondary"
            >
              Download Model
            </button>
          </a>
        </div>
      </PicoStyle>
    </div>
  );
}
