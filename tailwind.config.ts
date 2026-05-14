import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: ['./client/index.html', './client/src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						height: '0',
					},
				},
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0',
					},
					to: {
						height: 'var(--radix-accordion-content-height)',
					},
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)',
					},
					to: {
						height: '0',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			fontSize: {
				// Responsive text sizes
				xs: ['clamp(0.625rem, 1.2vw, 0.75rem)', { lineHeight: '1' }],
				sm: ['clamp(0.75rem, 1.5vw, 0.875rem)', { lineHeight: '1.2' }],
				base: ['clamp(0.875rem, 2vw, 1rem)', { lineHeight: '1.5' }],
				lg: ['clamp(1rem, 2.5vw, 1.125rem)', { lineHeight: '1.5' }],
				xl: ['clamp(1.25rem, 3vw, 1.5rem)', { lineHeight: '1.5' }],
				'2xl': ['clamp(1.5rem, 4vw, 2rem)', { lineHeight: '1.4' }],
				'3xl': ['clamp(1.875rem, 5vw, 2.5rem)', { lineHeight: '1.3' }],
				'4xl': ['clamp(2.25rem, 6vw, 3rem)', { lineHeight: '1.2' }],
			},
			spacing: {
				// Responsive spacing
				mobile: 'clamp(0.5rem, 2vw, 0.75rem)',
				'mobile-md': 'clamp(0.75rem, 3vw, 1rem)',
				'mobile-lg': 'clamp(1rem, 4vw, 1.5rem)',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
