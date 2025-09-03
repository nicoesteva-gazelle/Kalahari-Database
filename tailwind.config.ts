﻿import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        khaki: "#F0E68C",
        forest: "#0B3D2E",
        sand: "#E7DFCF",
        ink: "#0F172A",
      },
    },
  },
  plugins: [],
};
export default config;
