import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#02040A",
        panel: "rgba(10, 15, 28, 0.65)",
        border: "rgba(255, 255, 255, 0.08)",
        accent: {
          blue: "#3B82F6",
          cyan: "#22D3EE",
          violet: "#8B5CF6",
          fuchsia: "#D946EF",
          emerald: "#10B981"
        }
      },
      fontFamily: {
        sans: ["Outfit", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 45px rgba(139, 92, 246, 0.15), 0 0 20px rgba(34, 211, 238, 0.1)",
        "glow-hover": "0 0 60px rgba(139, 92, 246, 0.25), 0 0 30px rgba(34, 211, 238, 0.2)"
      },
      animation: {
        "text-gradient": "text-gradient 8s linear infinite",
        "slow-spin": "spin 12s linear infinite",
      },
      keyframes: {
        "text-gradient": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        }
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", [".light &", "&.light"]);
    }),
    typography
  ]
} satisfies Config;
