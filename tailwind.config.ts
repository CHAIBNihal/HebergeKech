import type { Config } from "tailwindcss";
const {fontFamily} = require("tailwindcss/defaultTheme")

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : "#038C7F",
        second : "#F2C641",
        hoverColor : ""
      },
      fontFamily:{
        poppins: ['var(--font-poppins)', ...fontFamily.sans]
      }
    },
  },
  plugins: [],
};
export default config;
