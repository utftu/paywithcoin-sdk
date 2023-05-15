import { build } from 'vite';
import dts from 'vite-plugin-dts';
import * as fs from 'node:fs';

fs.rmSync('./dist/types', { recursive: true, force: true });
await build({
	build: {
		outDir: `dist`,
		name: 'paywithcoin-sdk',
		lib: {
			fileName: 'paywithcoin-sdk',
			entry: ['src/paywithcoin-sdk.ts'],
			formats: ['es', 'cjs']
		}
	},
	plugins: [
		dts({
			tsConfigFilePath: './tsconfig.json',
			outputDir: './dist/types'
		})
	]
});
