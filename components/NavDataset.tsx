import { capitalize } from "../static/utilities.ts";

export default function NavDatasets(props: { datasetName: string }) {
    const captalizedName = capitalize(props.datasetName);

    return (
        <nav aria-label="breadcrumb">
            <ul>
                <li>
                    <a href={"/"}>Home</a>
                </li>
                <li>
                    Datasets
                </li>
                <li>
                    <strong>
                        {captalizedName}
                    </strong>
                </li>
            </ul>
        </nav>
    );
}
