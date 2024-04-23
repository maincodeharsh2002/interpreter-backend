/* This file goes in version control system 
   Use this file as a templeate for creating test files : To test the output of each part
*/

// Example test for Lexer
import { Lexer } from "../util/lexer";
import { AST, Assign, BinOp, Num, Parser, Var } from "../util/parser";

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
function printAST(ast: AST) {
  throw new Error("Function not implemented.");
}

