import { Signal } from "@preact/signals-core";
import { PicoStyle } from "./DefaultComponents.tsx";

export default function TrainedWordCards(
  props: { trained_words: Signal<string[]> },
) {
  return (
    <PicoStyle>
      <article>
        <header>Trained Words</header>
        <body>
          {props.trained_words.value.join(", ")}
        </body>
        <footer>
          <button
            className="outline primary"
            data-tooltip="Copy Trained Words"
            data-placement="left"
          >
            Copy
          </button>
        </footer>
      </article>
    </PicoStyle>
  );
}
