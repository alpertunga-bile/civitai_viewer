import { capitalize } from "../static/utilities.ts";

export interface INavObject {
  href: string;
  text: string;
}

export function NavRouteColumns(
  props: { category_name: string; list_elements: INavObject[] },
) {
  return (
    <div className="flex flex-col justify-start items-stretch">
      <strong>{props.category_name}</strong>
      <ul>
        {props.list_elements.map((element) => (
          <li key={element.text}>
            <a href={element.href}>
              {capitalize(element.text)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
