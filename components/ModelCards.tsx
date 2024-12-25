import ModelCard from "../islands/model-card.tsx";

export default function ModelCards(data: { items: Uint8Array[] }) {
  return (
    <div className="flex flex-row flex-wrap justify-evenly items-baseline content-around gap-x-2.5 gap-y-2.5">
      {data.items.map((item) => <ModelCard model_data={item} />)}
    </div>
  );
}
