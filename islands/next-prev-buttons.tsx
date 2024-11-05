export default function NextPrevButtons(
    props: {
        prev_url: string;
        next_url: string;
    },
) {
    return (
        <>
            <a
                className="prev-page"
                href={props.prev_url}
            >
                {"< Prev Page"}
            </a>
            <a
                className="next-page"
                href={props.next_url}
            >
                {"Next Page >"}
            </a>
        </>
    );
}
