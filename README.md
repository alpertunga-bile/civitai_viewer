# Civitai Viewer 

A project to search for models, images and inspect local LoRA datasets.

- [Civitai Viewer](#civitai-viewer)
  - [Usage](#usage)
    - [1. Optimize the Project (Optional)](#1-optimize-the-project-optional)
    - [2. Run with Production Build](#2-run-with-production-build)
  - [Routes](#routes)
    - [Homepage](#homepage)
    - [Search](#search)
      - [Model](#model)
    - [Datasets](#datasets)
  - [Technologies](#technologies)

## Usage

### 1. Optimize the Project (Optional)

- Run the below command to optimize the project:

```bash
deno task build
```

### 2. Run with Production Build

- Run the production build with below command:

```bash
deno task preview
```

## Routes

### Homepage

- In the homepage, user can select the dataset from under the ```Datasets``` text. The dataset names are taken from the filenames and currently only CSV files are supported.
- [x] The dataset must have Lora column.

### Search

#### Model
- The user can search the model with below parameter:
    - Query
    - Tag
    - NSFW (Affect the images of the models)
    - Sort
    - Period
- The user can browse through the results and can:
    - See the model name
    - Select model version
    - Browse through the images of the selected model version

### Datasets

- Showing informations about from the link of the LoRA which get from the provided local dataset.
- Currently the user can:
    - Select model versions of the base model
    - See trained words
    - Go to source Civitai page with ```Follow Link``` button
    - Download the selected model version
    - Inspect provided images of the selected model version

## Technologies

- Deno
- Fresh Web Framework
- Preact Signals
- Pico CSS