import { capitalize } from "../static/utilities.ts";

export default function NavDatasets(props: { datasetName: string }) {
    const captalizedName = capitalize(props.datasetName);

    return (
        <nav aria-label="breadcrumb">
            <ul>
                <li key={"Home"}>
                    <a href={"/"}>Home</a>
                </li>
                <li key={"Datasets"}>
                    Datasets
                </li>
                <li key={captalizedName}>
                    <strong>
                        {captalizedName}
                    </strong>
                </li>
            </ul>
        </nav>
    );
}
