// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $datasets_dataset_ from "./routes/datasets/[dataset].tsx";
import * as $index from "./routes/index.tsx";
import * as $search_model from "./routes/search/model.tsx";
import * as $dropdown_model_select from "./islands/dropdown-model-select.tsx";
import * as $dropdown_model_version from "./islands/dropdown-model-version.tsx";
import * as $image_button_overlay from "./islands/image-button-overlay.tsx";
import * as $model_card from "./islands/model-card.tsx";
import * as $model_info from "./islands/model-info.tsx";
import * as $trained_words_card from "./islands/trained-words-card.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/datasets/[dataset].tsx": $datasets_dataset_,
    "./routes/index.tsx": $index,
    "./routes/search/model.tsx": $search_model,
  },
  islands: {
    "./islands/dropdown-model-select.tsx": $dropdown_model_select,
    "./islands/dropdown-model-version.tsx": $dropdown_model_version,
    "./islands/image-button-overlay.tsx": $image_button_overlay,
    "./islands/model-card.tsx": $model_card,
    "./islands/model-info.tsx": $model_info,
    "./islands/trained-words-card.tsx": $trained_words_card,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
