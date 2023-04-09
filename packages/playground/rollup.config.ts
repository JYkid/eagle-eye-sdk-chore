import ts from "rollup-plugin-typescript2"; // 用于编译TypeScript
import serve from "rollup-plugin-serve"; // 用于将打包后的js文件插入到html页面中
import livereload from "rollup-plugin-livereload"; // 用于本地服务和热更新

export default {
  input: "src/index.ts", // 入口文件路径
  output: {
    file: "dist/bundle.js", // 输出文件路径
    format: "iife",
  },
  plugins: [
    ts({
      tsconfig: "./tsconfig.json",
    }),
    serve({
      open: false,
      contentBase: ["dist"],
    }),
    livereload(),
  ],
};
