export default function DropdownRadioSelection(
    props: { summary: string; name: string; options: string[] },
) {
    const first_option = props.options[0];
    const other_options = props.options.slice(1);

    return (
        <details className="dropdown">
            <summary>{props.summary}</summary>
            <ul>
                <li>
                    <label>
                        <input
                            type="radio"
                            name={props.name}
                            value={first_option}
                            selected
                        />
                        {first_option}
                    </label>
                </li>
                {other_options.map((option) => (
                    <li>
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
