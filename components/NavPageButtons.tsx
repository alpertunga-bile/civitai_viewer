import { URLHistory } from "../static/utilities.ts";
import NextPrevButtons from "./NextPrevButtons.tsx";

export default function NavPageButtons(
  props: {
    searched_url: string;
    next_cursor: string;
    url_history: URLHistory;
  },
) {
  const url = new URL(props.searched_url);

  url.searchParams.set("cursor", props.next_cursor);
  const next_url = url.toString();

  props.url_history.add_url(next_url);

  const prev_url = props.url_history.get_prev_url(next_url);

  return (
    <>
      <NextPrevButtons
        prev_url={prev_url}
        next_url={next_url}
      />
    </>
  );
}
