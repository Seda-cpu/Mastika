import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atlasio Mastika",
    short_name: "Atlasio",
    description: "Turkiye zirvelerini ac, rozet ve XP kazan.",
    start_url: "/",
    display: "standalone",
    background_color: "#11100d",
    theme_color: "#c8a85a",
    orientation: "portrait",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
