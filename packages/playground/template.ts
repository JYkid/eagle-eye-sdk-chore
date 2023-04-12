import type { RollupHtmlTemplateOptions } from "@rollup/plugin-html";

const template = (templateoptions?: RollupHtmlTemplateOptions): string => {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <title>playground</title>
        <script src="./playground.js"></script>
      </head>
      <body>
      </body>
    </html>
  `;
};

export default template;
