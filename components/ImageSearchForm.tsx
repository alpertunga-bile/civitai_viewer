import { Grid } from "./DefaultComponents.tsx";
import { DropdownRadioSelection } from "./FormComponents.tsx";

export default function ImageSearchForm() {
    return (
        <form>
            <Grid>
                <DropdownRadioSelection
                    summary="NSFW"
                    name="nsfw"
                    options={["None", "Soft", "Mature", "X", "All"]}
                />
                <DropdownRadioSelection
                    summary="Sort"
                    name="sort"
                    options={[
                        "Most Reactions",
                        "Most Comments",
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
            </Grid>
            <button type="submit">Search</button>
        </form>
    );
}
