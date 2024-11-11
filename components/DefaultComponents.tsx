import { ComponentChildren } from "preact";

export function MainDiv(props: { children: ComponentChildren }) {
    return (
        <div className={"bg-neutral-900"}>
            {props.children}
        </div>
    );
}

export function DefaultOpenedAccordion(
    props: { children: ComponentChildren; summary: string },
) {
    return (
        <details open>
            <summary>{props.summary}</summary>
            {props.children}
        </details>
    );
}

export function DefaultClosedAccordion(
    props: { children: ComponentChildren; summary: string },
) {
    return (
        <details>
            <summary>{props.summary}</summary>
            {props.children}
        </details>
    );
}

export function NavFixedTop(props: { children: ComponentChildren }) {
    return (
        <div className="sticky top-1 z-10 bg-neutral-800 p-6 pico">
            {props.children}
        </div>
    );
}

export function Grid(props: { children: ComponentChildren }) {
    return (
        <div className="grid">
            {props.children}
        </div>
    );
}

export function ElemRow(props: { children: ComponentChildren }) {
    return (
        <div className={"flex flex-row flex-grow justify-evenly gap-2.5"}>
            {props.children}
        </div>
    );
}

export function ElemCol(props: { children: ComponentChildren }) {
    return (
        <div
            className={"flex flex-col justify-around items-center content-around gap-1.5"}
        >
            {props.children}
        </div>
    );
}
