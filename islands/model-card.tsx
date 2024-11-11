import { decode } from "cbor-x";
import { batch, computed, useSignal } from "@preact/signals";
import ImageOverlay from "./image-overlay.tsx";

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

        const new_image_index = total_images.value <= 1 ||
                image_index.value === total_images.value - 1
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
        <div className="flex flex-col justify-around items-center content-around gap-1.5">
            <strong
                className={"text-center w-48 h-auto truncate ..."}
                data-tooltip={data.name}
                data-placement={"bottom"}
            >
                {data.name}
            </strong>
            <select className="overflow-auto" onChange={versionOnChange}>
                {model_version_names.map((name) => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
            <ImageOverlay
                image_url={image_url}
                current_image_index={image_index}
                total_image_count={total_images}
                nextOnClick={imageButtonNextOnClick}
                prevOnClick={imageButtonPrevOnClick}
            />
        </div>
    );
}
