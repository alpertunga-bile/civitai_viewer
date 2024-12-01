import { computed, Signal } from "@preact/signals-core";
import { JSX } from "preact/jsx-runtime";

export default function ImageOverlay(
  props: {
    image_url: Signal<string>;
    current_image_index: Signal<number>;
    total_image_count: Signal<number>;
    nextOnClick: JSX.MouseEventHandler<HTMLButtonElement>;
    prevOnClick: JSX.MouseEventHandler<HTMLButtonElement>;
  },
) {
  const plus_one_index = computed(() => props.current_image_index.value + 1);

  return (
    <div className="relative">
      <img
        className="max-w-60 max-h-80"
        src={props.image_url}
        loading={"lazy"}
      >
      </img>
      <button
        className="previous-image-button transition-colors transition-size"
        onClick={props.prevOnClick}
      >
        {"<"}
      </button>
      <button
        className="next-image-button transition-colors transition-size"
        onClick={props.nextOnClick}
      >
        {">"}
      </button>
      <strong className="image-index-counter">
        {plus_one_index} / {props.total_image_count}
      </strong>
    </div>
  );
}
