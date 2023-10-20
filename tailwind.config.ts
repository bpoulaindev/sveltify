import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
// @ts-ignore
import plugin from 'tailwindcss/plugin';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				cream: '#FFFAF5',
				mint: '#68969C'
			},
			fontFamily: {
				supreme: ['Supreme', 'serif']
			},
			screens: {
				xs: '400px',
				over500: '500px',
				nmh: { raw: '(min-height: 640px)' }
			},
			transitionProperty: {
				width: 'width',
				height: 'height'
			},
			animation: {
				'spin-1': 'spin 1s linear infinite',
				'spin-2': 'spin 1.5s linear infinite',
				'spin-3': 'spin 2s linear infinite',
				'pulse-1': 'pulse 1s linear infinite',
				'pulse-2': 'pulse 1.5s linear infinite',
				'pulse-3': 'pulse 2s linear infinite'
			},
			fontSize: {
				'2xs': '0.625rem'
			}
		},
		spacing: {
			0: '0px',
			0.25: '2px',
			'1/2': '4px',
			0.5: '4px',
			0.75: '6px',
			1: '8px',
			1.5: '12px',
			2: '16px',
			2.5: '20px',
			3: '24px',
			3.5: '28px',
			4: '32px',
			5: '40px',
			6: '48px',
			'6.5': '52px',
			7: '56px',
			8: '64px',
			9: '72px',
			10: '80px',
			12: '96px',
			13: '104px',
			14: '112px',
			16: '128px',
			18: '144px',
			20: '160px',
			22: '176px',
			24: '192px',
			28: '224px',
			30: '240px',
			32: '256px',
			36: '288px',
			40: '320px',
			60: '480px',
			70: '560px',
			80: '640px',
			120: '960px'
		},
		typography: (theme: any) => ({
			DEFAULT: {
				css: {
					code: {
						position: 'relative',
						borderRadius: theme('borderRadius.md')
					}
				}
			}
		})
	},
	plugins: [
		require('@tailwindcss/forms'),
		typography,
		// @ts-ignore
		plugin(function ({ addVariant, matchUtilities, theme }) {
			addVariant('hocus', ['&:hover', '&:focus']);
			// Square utility
			matchUtilities(
				{
					square: (value: never) => ({
						width: value,
						height: value
					})
				},
				{ values: theme('spacing') }
			);
		})
	]
} satisfies Config;
