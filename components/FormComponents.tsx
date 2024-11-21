export function Searchbar(props: { placeholder: string; query_name: string }) {
    return (
        <>
            <input
                name={props.query_name}
                type="search"
                placeholder={props.placeholder}
                aria-label="Search"
            />
        </>
    );
}

export function DropdownRadioSelection(
    props: { summary: string; name: string; options: string[] },
) {
    const first_option = props.options[0];
    const other_options = props.options.slice(1);

    return (
        <details className="dropdown">
            <summary>{props.summary}</summary>
            <ul>
                <li
                    key={first_option}
                >
                    <label>
                        <input
                            type="radio"
                            name={props.name}
                            value={first_option}
                            checked
                        />
                        {first_option}
                    </label>
                </li>
                {other_options.map((option) => (
                    <li key={option}>
                        <label>
                            <input
                                type="radio"
                                name={props.name}
                                value={option}
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
        </details>
    );
}

export function DropdownCheckboxSelection(
    props: { summary: string; name: string; options: string[] },
) {
    return (
        <details className={"dropdown"}>
            <summary>{props.summary}</summary>
            <ul>
                {props.options.map((option) => (
                    <li key={option}>
                        <label>
                            <input
                                type={"checkbox"}
                                name={props.name}
                                value={option}
                            >
                                {option}
                            </input>
                        </label>
                    </li>
                ))}
            </ul>
        </details>
    );
}
