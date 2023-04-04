import type { RollupOptions } from "rollup";
import ts from "rollup-plugin-typescript2";
import path from "path";

const packageDir = path.resolve(__dirname);
const name = path.basename(packageDir);
const config: RollupOptions = {
  // TODO: ESM 供自己使用
  input: ["src/index.ts"],
  output: [
    {
      name: `EagleEyeCore`,
      file: "./lib/index.umd.js",
      format: "umd",
    },
    {
      file: "./lib/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    ts({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
  ],
};

export default config;
