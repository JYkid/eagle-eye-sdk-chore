import type { IBuilder } from "@eagle-eye-sdk/core";
import Breadcrumb from "./breadcrumb";
// 实现面包
class BrowserBuilder implements IBuilder {
  breadcrumb: Breadcrumb;
  constructor() {
    this.breadcrumb = new Breadcrumb(0);
  }
  build(data: unknown): unknown {
    return this.breadcrumb.push(data);
  }
}

export default new BrowserBuilder();
