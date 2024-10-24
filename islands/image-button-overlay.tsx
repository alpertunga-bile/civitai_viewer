import { Signal } from "@preact/signals-core";

export default function ImageButtonOverlay(
    props: { image_url: Signal<string>; nextOnClick; prevOnClick },
) {
    return (
        <div className="button-overlay">
            <img className="dataset-img" src={props.image_url}></img>
            <button
                className="button-overlay previous-image-button transition-colors transition-size"
                onClick={props.prevOnClick}
            >
                {"<"}
            </button>
            <button
                className="button-overlay next-image-button transition-colors transition-size"
                onClick={props.nextOnClick}
            >
                {">"}
            </button>
        </div>
    );
}
