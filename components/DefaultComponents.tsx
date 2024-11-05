import { ComponentChildren } from "preact";

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
        <div className="fixed-top-search-bar">
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
        <div className={"elem-div-row"}>
            {props.children}
        </div>
    );
}
