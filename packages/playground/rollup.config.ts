import ts from "rollup-plugin-typescript2"; // 用于编译TypeScript
import serve from "rollup-plugin-serve"; // 用于将打包后的js文件插入到html页面中
import livereload from "rollup-plugin-livereload"; // 用于本地服务和热更新
import html from "@rollup/plugin-html";
import template from "./template";
// @ts-ignore
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.ts", // 入口文件路径
  output: {
    file: "dist/playground.js", // 输出文件路径
    format: "iife",
    name: "playground",
  },
  plugins: [
    ts({
      tsconfig: "./tsconfig.json",
    }),
    resolve(),
    commonjs(),
    html({
      title: "playground",
      publicPath: "./",
      fileName: "index.html",
      template: template,
    }),
    serve({
      open: false,
      contentBase: ["dist"],
    }),
    livereload(),
  ],
};
