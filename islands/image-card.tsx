import { decode } from "cbor-x";
import { useSignal } from "@preact/signals";
import { Ref, useRef } from "preact/hooks";
import OverflowModal from "./overflow-modal.tsx";

export default function ImageCard(
    props: { image_data: Uint8Array },
) {
    const data = decode(props.image_data);
    const model_name = data.baseModel === "" ? "undefined" : data.baseModel;
    let prompt = "none";

    if (data.meta && data.meta.prompt) {
        prompt = data.meta.prompt;
    }

    const info_ref: Ref<HTMLDivElement> = useRef(null);
    const img_ref: Ref<HTMLImageElement> = useRef(null);

    const is_img_blurred = useSignal(false);

    const imgOnClick = (event) => {
        if (is_img_blurred.value) {
            event.target.style.filter = "none";
            if (info_ref.current) {
                info_ref.current.style.display = "none";
            }
        } else {
            event.target.style.filter = "blur(4px) grayscale(90%)";
            if (info_ref.current) {
                info_ref.current.style.display = "grid";
            }
        }

        is_img_blurred.value = !is_img_blurred.value;
    };

    const modalOnClose = () => {
        if (is_img_blurred.value) {
            img_ref.current.style.filter = "none";
        }

        is_img_blurred.value = !is_img_blurred.value;
    };

    return (
        <div className="flex flex-col justify-around items-center content-center gap-4 bg-violet-800 border-violet-800 border-solid border-4 transition-colors hover:border-purple-600 hover:bg-purple-600">
            <img
                onClick={imgOnClick}
                ref={img_ref}
                className="flex justify-center align-center max-w-96 max-h-96 w-full h-auto object-cover transition-filter"
                src={data.url}
                loading={"lazy"}
            />
            <OverflowModal ref={info_ref} modalOnClose={modalOnClose}>
                <p
                    className={"p-2 border-solid border-2 border-purple-600"}
                >
                    <strong>Model</strong>: {model_name}
                </p>
                <p
                    className={"p-2 border-solid border-2 border-purple-600"}
                >
                    <strong>Prompt</strong>: {prompt}
                </p>
            </OverflowModal>
            <div className="flex flex-row flex-grow justify-around text-white gap-y-1 gap-x-1">
                <p>
                    {data.stats.laughCount} 😆
                </p>
                <p>
                    {data.stats.cryCount} 🤣
                </p>
                <p>
                    {data.stats.likeCount} 👍
                </p>
                <p>
                    {data.stats.heartCount} 💛
                </p>
                <a href={`https://civitai.com/images/${data.id}`}>🔗</a>
            </div>
        </div>
    );
}
