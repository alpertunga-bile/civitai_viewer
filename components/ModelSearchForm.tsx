import SuggestedSearchbar from "../islands/suggested-searchbar.tsx";
import {
  DefaultClosedAccordion,
  ElemRow,
  Grid,
  PicoStyle,
} from "./DefaultComponents.tsx";
import {
  DropdownCheckboxSelection,
  DropdownRadioSelection,
  Searchbar,
} from "./FormComponents.tsx";

export default function ModelSearchForm(props: { tags: Array<Array<string>> }) {
  return (
    <form>
      <div className={"grid grid-cols-2 gap-8"}>
        <Searchbar
          query_name="query"
          placeholder="Search model with name"
        />
        <SuggestedSearchbar suggestions={props.tags} />
      </div>
      <DefaultClosedAccordion summary="Advanced Options">
        <div className={"grid grid-cols-4 gap-4"}>
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
        </div>
      </DefaultClosedAccordion>
      <button type="submit">Search</button>
    </form>
  );
}
