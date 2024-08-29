import {defineConfig, UserConfigExport} from 'vite';
import {rmSync} from 'fs';
import dts from 'vite-plugin-dts';

export default defineConfig(() => {
  rmSync('./dist/types', {recursive: true, force: true});
  return {
    build: {
      outDir: `dist`,
      // name: 'paywithcoin-sdk',
      lib: {
        fileName: 'paywithcoin-sdk',
        entry: ['src/paywithcoin-sdk.ts'],
        formats: ['es'],
      },
    },
    // plugins: [dts()],
    // plugins: [
    //   // @ts-ignore
    //   dts({
    //     tsConfigFilePath: '../../tsconfig.json',
    //     outputDir: './dist/types',
    //   }),
    // ],
  } satisfies UserConfigExport;
});
