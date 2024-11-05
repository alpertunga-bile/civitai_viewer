# Civitai Viewer

- A project to search for models, images and inspect local LoRA datasets.

## Usage

### 1. Optimize the Project (Optional)

- Run the below command to optimize the project:

```bash
deno task build
```

### 2. Run the Production build

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

- The user can browse through the results and can:
    - See the model name
    - Select model version
    - Browse through the images of the selected model version

#### Image

- The user can view images and their stats

### Datasets

- Showing informations from the link of the LoRA which is acquired from the provided local dataset.
- The user can:
    - Select model versions of the base model
    - See trained words
    - Go to source Civitai page with ```Follow Link``` button
    - Download the selected model version
    - Inspect provided images of the selected model version
  
## Technologies

[![Made with Fresh](https://fresh.deno.dev/fresh-badge-dark.svg)](https://fresh.deno.dev)

- Deno
- Cbor-x
- Pico CSS