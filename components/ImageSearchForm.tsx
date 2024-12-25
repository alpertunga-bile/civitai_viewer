import { Grid, PicoStyle } from "./DefaultComponents.tsx";
import { DropdownRadioSelection } from "./FormComponents.tsx";

export default function ImageSearchForm() {
  return (
    <form>
      <PicoStyle>
        <div className={"grid grid-cols-3 gap-8"}>
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
        </div>
      </PicoStyle>
      <button type="submit">Search</button>
    </form>
  );
}
