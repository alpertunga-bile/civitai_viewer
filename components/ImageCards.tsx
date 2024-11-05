import ImageCard from "../islands/image-card.tsx";

export default function ImageCards(props: { items: Uint8Array[] }) {
    return (
        <div className="image-card-row">
            {props.items.map((item) => <ImageCard image_data={item} />)}
        </div>
    );
}
