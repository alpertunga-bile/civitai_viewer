import { decode } from "cbor-x";

export default function ImageCard(props: { image_data: Uint8Array }) {
    const data = decode(props.image_data);

    return (
        <div className="image-card-div-elem">
            <img className="image-card-image" src={data.url} />
            <div className="elem-div-row">
                <p>
                    {data.stats.laughCount} 😆
                </p>
                <p>
                    {data.stats.cryCount} 🤣
                </p>
                <p>
                    {data.stats.likeCount} 👍
                </p>
                <p>
                    {data.stats.heartCount} 💛
                </p>
            </div>
        </div>
    );
}
