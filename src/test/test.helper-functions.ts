/*  This File contians all the All the helper functions  */

import { BinOp, Assign, Var, Num } from "../util/parser";

function printAST(node: any, indent = "") {
  if (!node) return;
  console.log(`${indent}Node type: ${node.constructor.name}`);

  if (node.token) {
    console.log(
      `${indent}Token type: ${node.token.type}, value: ${node.token.value}`,
    );
  }

  if (node instanceof BinOp) {
    printAST(node.left, indent + "  ");
    printAST(node.right, indent + "  ");
  } else if (node instanceof Assign) {
    printAST(node.left, indent + "  ");
    printAST(node.right, indent + "  ");
  } else if (node instanceof Var || node instanceof Num) {
    // Leaf nodes
    console.log(`${indent}Leaf: ${node.token.type} - ${node.token.value}`);
  }
}
