import { ComponentChildren } from "preact";
import { ForwardedRef, forwardRef } from "preact/compat";

const OverflowModal = (
    props: { children: ComponentChildren; modalOnClose: (event) => void },
    ref: ForwardedRef<HTMLDivElement>,
) => {
    const modalOnClick = (event) => {
        event.preventDefault();

        if (ref && ref.current) {
            ref.current.style.display = "none";
        }

        props.modalOnClose(event);
    };

    return (
        <div
            ref={ref}
            className={"gap-4 hidden absolute max-w-96 max-h-96 w-full h-auto p-2.5 bg-fuchsia-950 text-white break-words overflow-auto"}
        >
            {props.children}
            <button
                className={"transition-colors border-solid border-2 border-neutral-100 hover:border-pink-600"}
                onClick={modalOnClick}
            >
                Close
            </button>
        </div>
    );
};

export default forwardRef(OverflowModal);
