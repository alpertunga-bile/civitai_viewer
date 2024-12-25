import ImageCard from "./ImageCard.tsx";

export default function ImageCards(props: { items: Uint8Array[] }) {
  return (
    <div className="flex flex-row flex-wrap justify-evenly content-around gap-x-4 gap-y-9">
      {props.items.map((item, index) => (
        <ImageCard key={`image_card_${index}`} image_data={item} />
      ))}
    </div>
  );
}
