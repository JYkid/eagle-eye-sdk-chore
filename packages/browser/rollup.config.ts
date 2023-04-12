// TODO: 抽象 Rollup配置文件
import type { RollupOptions } from "rollup";
import ts from "rollup-plugin-typescript2";
// @ts-ignore
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
const config: RollupOptions = {
  input: ["src/index.ts"],
  output: [
    {
      name: `EagleEyeBrowser`,
      file: "./lib/index.umd.js",
      format: "umd",
    },
    {
      file: "./lib/index.esm.js",
      format: "esm",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    ts({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
  ],
  // core源码也打入包中
  external: [],
};

export default config;
