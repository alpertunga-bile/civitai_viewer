import { type PageProps } from "$fresh/server.ts";

// <script src="https://cdn.tailwindcss.com"></script>

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh_lora_viewer</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/model_card_styles.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        >
        </link>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
