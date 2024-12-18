import { capitalize } from "../static/utilities.ts";

export default function ListElementLinkDataset(props: { datasetName: string }) {
    const capitalizedName = capitalize(props.datasetName);

    return (
        <li key={props.datasetName}>
            <a href={`/datasets/${props.datasetName}`}>{capitalizedName}</a>
        </li>
    );
}
