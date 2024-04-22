/* This file goes in version control system 
   Use this file as a templeate for creating test files : To test the output of each part
*/ 

/* All the helper functions goes here */
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

// Example test for Lexer
import { Lexer } from "../util/lexer";
import { Assign, BinOp, Num, Parser, Var } from "../util/parser";

function test_Lexer(input: string) {
  const lexer = new Lexer(input);
  let token = lexer.getNextToken();

  while (token.type !== "EOF") {
    console.log(token);
    token = lexer.getNextToken();
  }
  console.log(token);
}

// Example test for parser 
 function test_Parser(input: string) {
   const lexer = new Lexer(input);
   const parser = new Parser(lexer);
   const ast = parser.parse();
   console.log(`AST for: "${input}"`);
   printAST(ast);
 }