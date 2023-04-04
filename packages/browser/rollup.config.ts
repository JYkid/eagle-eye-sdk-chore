// TODO: 抽象 Rollup配置文件
import type { RollupOptions } from "rollup";
import ts from "rollup-plugin-typescript2";
import nodeResolve from "@rollup/plugin-node-resolve";
const config: RollupOptions = {
  input: ["src/index.ts"],
  output: [
    {
      name: `EagleEyeBrowser`,
      file: "./lib/index.umd.js",
      format: "umd",
    },
  ],
  plugins: [
    nodeResolve(),
    ts({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
  ],
};

export default config;
