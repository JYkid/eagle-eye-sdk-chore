class Breadcrumb {
  max: number;
  stack: unknown[];
  constructor(max: number) {
    this.max = max;
    this.stack = [];
  }
  push(data: unknown) {
    if (this.stack.length < this.max) {
      this.stack.push(data);
      return null;
    } else {
      this.stack.shift();
      this.stack.push(data);
      return this.stack;
    }
  }
  clear() {
    this.stack = [];
  }
}

export default Breadcrumb;
