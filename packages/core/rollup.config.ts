import type { RollupOptions } from "rollup";
import ts from "rollup-plugin-typescript2";
import path from "path";

const packageDir = path.resolve(__dirname);
const name = path.basename(packageDir);
const config: RollupOptions = {
  // TODO: ESM 供自己使用
  input: ["src/index.ts"],
  output: {
    name: `EAGLE_EYE_${name.toLocaleUpperCase()}`,
    dir: "./lib",
    format: "umd",
  },
  plugins: [
    ts({
      tsconfig: "./tsconfig.json",
    }),
  ],
};

export default config;
