export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function attach_url_search(
    data: { search_url: string; url: string },
): URL {
    const search_url = new URL(data.search_url);
    const url = new URL(data.url);

    search_url.searchParams.forEach((value, key) => {
        let val = value;

        if (key === "nsfw") {
            val = value === "disabled" ? "false" : "true";
        }

        if (val !== "") {
            url.searchParams.append(key, val);
        }
    });

    return url;
}
