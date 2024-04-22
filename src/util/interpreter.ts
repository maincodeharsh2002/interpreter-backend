/* Interpreter will execute the AST nodes to perform the operations */

// src/interpreter.ts

import { Parser, AST, BinOp, Num, Var, Assign, NoOp } from "./parser";

class Interpreter {
  private globalScope: Record<string, number> = {};

  constructor(private parser: Parser) {}

  visit(node: AST): any {
    if (node instanceof Num) {
      return this.visitNum(node);
    } else if (node instanceof BinOp) {
      return this.visitBinOp(node);
    } else if (node instanceof Var) {
      return this.visitVar(node);
    } else if (node instanceof Assign) {
      return this.visitAssign(node);
    } else if (node instanceof NoOp) {
      return this.visitNoOp();
    }

    throw new Error("No visit method for node type");
  }

  visitNum(node: Num): number {
    return node.token.value;
  }

  visitBinOp(node: BinOp): number {
    if (node.token.type === "PLUS") {
      return this.visit(node.left) + this.visit(node.right);
    } else if (node.token.type === "MINUS") {
      return this.visit(node.left) - this.visit(node.right);
    } else if (node.token.type === "MULT") {
      return this.visit(node.left) * this.visit(node.right);
    } else if (node.token.type === "DIV") {
      return this.visit(node.left) / this.visit(node.right);
    }

    throw new Error("Invalid operation");
  }

  visitVar(node: Var): number {
    const varName = node.token.value;
    const value = this.globalScope[varName];
    if (value == null) {
      throw new Error(`Variable not found: ${varName}`);
    }
    return value;
  }

  visitAssign(node: Assign): number {
    const varName = node.left.token.value;
    const value = this.visit(node.right);
    this.globalScope[varName] = value;
    return value;
  }

  visitNoOp(): void {}

  interpret(): any {
    const tree = this.parser.parse();
    return this.visit(tree);
  }
}

export { Interpreter };
