import { decode } from "cbor-x";
import { batch, computed, useSignal } from "@preact/signals";
import ImageButtonOverlay from "./image-button-overlay.tsx";

export default function ModelCard(props: { model_data: Uint8Array }) {
    const data = decode(props.model_data);
    const model_url = `https://civitai.com/models/${data.id}`;

    const model_version_names = data.modelVersions.map((version) =>
        version.name
    );

    const image_url = useSignal(
        data.modelVersions[0].images[0]
            ? data.modelVersions[0].images[0].url
            : "/no_image_available_sign.png",
    );
    const image_index = useSignal(0);
    const version_data = useSignal(data.modelVersions[0]);

    const total_images = computed(() => version_data.value.images.length);
    const download_url = computed(() =>
        version_data.value.files[0].downloadUrl
    );

    const versionOnChange = (event) => {
        version_data.value =
            data.modelVersions.filter((model_version) =>
                model_version.name === event.target.value
            )[0];

        image_url.value = version_data.value.images[0]
            ? version_data.value.images[0].url
            : "/no_image_available_sign.png";
    };

    const imageButtonNextOnClick = (event) => {
        event.preventDefault();

        const new_image_index = image_index.value === total_images.value - 1
            ? 0
            : image_index.value + 1;

        batch(() => {
            image_index.value = new_image_index;
            image_url.value = version_data.value.images[new_image_index]
                ? version_data.value.images[new_image_index].url
                : "/no_image_available_sign.png";
        });
    };

    const imageButtonPrevOnClick = (event) => {
        event.preventDefault();

        const new_image_index = image_index.value === 0
            ? total_images.value - 1
            : image_index.value - 1;

        batch(() => {
            image_index.value = new_image_index;
            image_url.value = version_data.value.images[new_image_index]
                ? version_data.value.images[new_image_index].url
                : "/no_image_available_sign.png";
        });
    };

    return (
        <div className="model-card-div-elem">
            <a href={model_url}>
                <strong data-tooltip={data.name}>
                    {data.name.slice(0, 21)}
                </strong>
            </a>
            <select className="overflow-auto" onChange={versionOnChange}>
                {model_version_names.map((name) => (
                    <option value={name}>{name}</option>
                ))}
            </select>
            <ImageButtonOverlay
                image_url={image_url}
                current_image_index={image_index}
                total_image_count={total_images}
                nextOnClick={imageButtonNextOnClick}
                prevOnClick={imageButtonPrevOnClick}
            />
            <a className="contrast" href={download_url}>
                <button
                    data-tooltip={`Download ${version_data.value.name} model`}
                    data-placement="bottom"
                    className="outline secondary"
                >
                    Download
                </button>
            </a>
        </div>
    );
}
