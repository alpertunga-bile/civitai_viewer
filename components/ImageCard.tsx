import { decode } from "cbor-x";

export default function ImageCard(
  props: { image_data: Uint8Array },
) {
  const data = decode(props.image_data);
  const model_name = data.baseModel === "" ? "undefined" : data.baseModel;
  let prompt = "none";

  if (data.meta && data.meta.prompt) {
    prompt = data.meta.prompt;
  }

  return (
    <div className="image-card">
      <div
        className={"image-card-face image-card-face-front object-cover"}
      >
        <img
          src={data.url}
        />
      </div>
      <div
        className={"image-card-face image-card-face-back py-2 overflow-auto"}
      >
        <p
          className={"p-2 border-solid border-2 border-purple-600"}
        >
          <strong>Model</strong>: {model_name}
        </p>
        <p
          className={"p-2 border-solid border-2 border-purple-600"}
        >
          <strong>Prompt</strong>: {prompt}
        </p>
        <div className="flex flex-row flex-grow justify-around text-white gap-1 p-2 border-solid border-2 border-purple-800">
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
          <a href={`https://civitai.com/images/${data.id}`}>🔗</a>
        </div>
      </div>
    </div>
  );
}
