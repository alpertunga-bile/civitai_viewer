import { Signal } from "@preact/signals-core";

export default function TrainedWordCards(
    props: { trained_words: Signal<string[]> },
) {
    return (
        <article className={"pico"}>
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
    );
}
