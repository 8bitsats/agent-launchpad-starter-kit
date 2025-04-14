import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        colors: {
            background: "hsl(var(--color-background) / <alpha-value>)",
            foreground: "hsl(var(--color-foreground) / <alpha-value>)",
            card: "hsl(var(--color-card) / <alpha-value>)",
            "card-foreground": "hsl(var(--color-card-foreground) / <alpha-value>)",
            popover: "hsl(var(--color-popover) / <alpha-value>)",
            "popover-foreground": "hsl(var(--color-popover-foreground) / <alpha-value>)",
            primary: "hsl(var(--color-primary) / <alpha-value>)",
            "primary-foreground": "hsl(var(--color-primary-foreground) / <alpha-value>)",
            secondary: "hsl(var(--color-secondary) / <alpha-value>)",
            "secondary-foreground": "hsl(var(--color-secondary-foreground) / <alpha-value>)",
            muted: "hsl(var(--color-muted) / <alpha-value>)",
            "muted-foreground": "hsl(var(--color-muted-foreground) / <alpha-value>)",
            accent: "hsl(var(--color-accent) / <alpha-value>)",
            "accent-foreground": "hsl(var(--color-accent-foreground) / <alpha-value>)",
            destructive: "hsl(var(--color-destructive) / <alpha-value>)",
            "destructive-foreground": "hsl(var(--color-destructive-foreground) / <alpha-value>)",
            border: "hsl(var(--color-border) / <alpha-value>)",
            input: "hsl(var(--color-input) / <alpha-value>)",
            ring: "hsl(var(--color-ring) / <alpha-value>)",
            "chart-1": "hsl(var(--color-chart-1) / <alpha-value>)",
            skeleton: "hsl(var(--color-skeleton) / <alpha-value>)",
            green: {
                500: "#22c55e"
            },
            yellow: {
                500: "#eab308"
            }
        },
        fontFamily: {
            body: ["var(--font-inter)", ...fontFamily.sans],
        },
        boxShadow: {
            light: "var(--shadow-light)",
            heavy: "var(--shadow-heavy)",
            dropdown: "var(--shadow-dropdown)",
            primary: "0 1px 2px 0 #1B2C60",
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(1rem)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-1rem)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(1rem)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideRight: {
                    '0%': { transform: 'translateX(-1rem)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                ripple: {
                    '0%': { transform: 'scale(0.8)', opacity: '1' },
                    '50%': { transform: 'scale(1.05)', opacity: '0.8' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                pulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.5s ease-in-out forwards',
                slideUp: 'slideUp 0.5s ease-in-out forwards',
                slideDown: 'slideDown 0.5s ease-in-out forwards',
                slideLeft: 'slideLeft 0.5s ease-in-out forwards',
                slideRight: 'slideRight 0.5s ease-in-out forwards',
                ripple: 'ripple 0.3s ease-in-out',
                pulse: 'pulse 0.5s ease-in-out',
                shimmer: 'shimmer 2s infinite linear',
            },
        },
    },
    plugins: [],
};
export default config;
