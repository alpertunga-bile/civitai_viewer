import { decode } from "cbor-x";
import { batch, computed, useSignal } from "@preact/signals";

export default function ModelCard(props: { model_data: Uint8Array }) {
    const data = decode(props.model_data);
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
            <strong data-tooltip={data.name}>{data.name.slice(0, 21)}</strong>
            <select className="overflow-auto" onChange={versionOnChange}>
                {model_version_names.map((name) => (
                    <option value={name}>{name}</option>
                ))}
            </select>
            <div className="model-card-button-overlay">
                <img className="model-card-img" src={image_url}></img>
                <button
                    onClick={imageButtonPrevOnClick}
                    className="model-card-button-overlay model-card-previous-image-button transition-colors transition-size"
                >
                    {"<"}
                </button>
                <button
                    onClick={imageButtonNextOnClick}
                    className="model-card-button-overlay model-card-next-image-button transition-colors transition-size"
                >
                    {">"}
                </button>
                <strong className="model-card-bottom-text-overlay">
                    1 / 100
                </strong>
            </div>
        </div>
    );
}
