import ImageCard from "../islands/image-card.tsx";

export default function ImageCards(props: { items: Uint8Array[] }) {
    return (
        <div className="flex flex-row flex-wrap justify-evenly items-baseline content-around gap-x-5 gap-y-5">
            {props.items.map((item, index) => (
                <ImageCard key={`image_card_${index}`} image_data={item} />
            ))}
        </div>
    );
}
