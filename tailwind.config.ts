import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        h1: [
          '24px',
          {
            lineHeight: '1.5',
            letterSpacing: '0.05em',
            fontWeight: 700,
          },
        ],
        h2: [
          '20px',
          {
            lineHeight: '1.5',
            letterSpacing: '0.025em',
            fontWeight: 700,
          },
        ],
        h3: [
          '18px',
          {
            lineHeight: '1.5',
            letterSpacing: '0.025em',
            fontWeight: 500,
          },
        ],
      },
    },
  },
  plugins: [
    require('daisyui'),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
    require('tailwindcss-scoped-groups')({
      groups: ['parent'],
    }),
  ],
};
export default config;
