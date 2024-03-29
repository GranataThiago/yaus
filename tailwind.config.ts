import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        xs: '480px' 
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        'primary': '#EAEAEA',
        'secondary': '#DDDDDD'
      }
    },
  },
  plugins: [],
} satisfies Config;
