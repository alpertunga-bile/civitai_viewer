import { PicoStyle } from "./DefaultComponents.tsx";

export default function NavBreadcrumb(props: { crumbs: string[] }) {
  const last_part = props.crumbs.length === 0 ? "None" : props.crumbs.pop();

  return (
    <PicoStyle>
      <nav aria-label="breadcrumb">
        <ul>
          <li key={"Home"}>
            <a href={"/home"}>Home</a>
          </li>
          {props.crumbs.map((crumb) => (
            <li key={crumb}>
              {crumb}
            </li>
          ))}
          <li key={last_part}>
            <strong>
              {last_part}
            </strong>
          </li>
        </ul>
      </nav>
    </PicoStyle>
  );
}
