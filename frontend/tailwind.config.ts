import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#070A12",
        panel: "#0D1322",
        border: "rgba(148, 163, 184, 0.2)",
        accent: {
          blue: "#38BDF8",
          purple: "#A78BFA",
          cyan: "#22D3EE",
          emerald: "#34D399"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(56, 189, 248, 0.18)"
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", [".light &", "&.light"]);
    })
  ]
} satisfies Config;
