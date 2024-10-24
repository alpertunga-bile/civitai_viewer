import DropdownRadioSelection from "./DropdownRadioSelection.tsx";

export default function ModelSearchForm() {
    return (
        <form>
            <div className="elem-div-row">
                <input
                    name="q"
                    type="search"
                    placeholder="Search model with name"
                    aria-label="Search"
                >
                </input>
                <input
                    name="tag"
                    type="search"
                    placeholder="Search model with tag"
                    aria-label="Search"
                >
                </input>
            </div>
            <details>
                <summary>Advanced Options</summary>
                <div className="grid">
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
                </div>
            </details>
            <button type="submit">Search</button>
        </form>
    );
}
