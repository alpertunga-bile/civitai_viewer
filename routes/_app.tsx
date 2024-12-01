import { type PageProps } from "$fresh/server.ts";

// <script src="https://cdn.tailwindcss.com"></script>

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lora Dataset Viewer</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="stylesheet"
          href="/pico.classless.conditional.fuchsia.min.css"
        >
        </link>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
