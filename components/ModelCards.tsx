import ModelCard from "../islands/model-card.tsx";

export default function ModelCards(data: { items: Uint8Array[] }) {
    return (
        <div className="model-card-row">
            {data.items.map((item) => <ModelCard model_data={item} />)}
        </div>
    );
}
