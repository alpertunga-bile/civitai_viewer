import { DefaultClosedAccordion, ElemRow, Grid } from "./DefaultComponents.tsx";
import {
    DropdownCheckboxSelection,
    DropdownRadioSelection,
    Searchbar,
} from "./FormComponents.tsx";

export default function ModelSearchForm() {
    return (
        <form>
            <ElemRow>
                <Searchbar
                    query_name="query"
                    placeholder="Search model with name"
                />
                <Searchbar
                    query_name="tag"
                    placeholder="Search model with tag"
                />
            </ElemRow>
            <DefaultClosedAccordion summary="Advanced Options">
                <Grid>
                    <DropdownRadioSelection
                        summary="NSFW"
                        name="nsfw"
                        options={["disabled", "enabled"]}
                    />
                    <DropdownRadioSelection
                        summary="Sort"
                        name="sort"
                        options={[
                            "Highest Rated",
                            "Most Downloaded",
                            "Newest",
                        ]}
                    />
                    <DropdownRadioSelection
                        summary="Period"
                        name="period"
                        options={[
                            "AllTime",
                            "Year",
                            "Month",
                            "Week",
                            "Day",
                        ]}
                    />
                    <DropdownCheckboxSelection
                        summary="Model Types"
                        name="types"
                        options={[
                            "Checkpoint",
                            "TextualInversion",
                            "Hypernetwork",
                            "AestheticGradient",
                            "LORA",
                            "Controlnet",
                            "Poses",
                        ]}
                    />
                </Grid>
            </DefaultClosedAccordion>
            <button type="submit">Search</button>
        </form>
    );
}
