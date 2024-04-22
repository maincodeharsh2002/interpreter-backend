/* Parser : It will construct aN AST:Abstract Syntax Tree from the tokens produced by lexer */

import { Lexer, Token, TokenType } from "./lexer";

class AST {}

class BinOp extends AST {
  constructor(
    public left: AST,
    public token: Token,
    public right: AST,
  ) {
    super();
  }
}

class Num extends AST {
  constructor(public token: Token) {
    super();
  }
}

class Var extends AST {
  constructor(public token: Token) {
    super();
  }
}

class Assign extends AST {
  constructor(
    public left: Var,
    public token: Token,
    public right: AST,
  ) {
    super();
  }
}

class NoOp extends AST {
  constructor() {
    super();
  }
}

class Parser {
  private currentToken: Token;

  constructor(private lexer: Lexer) {
    this.currentToken = this.lexer.getNextToken();
  }

  private eat(tokenType: TokenType): void {
    if (this.currentToken.type === tokenType) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw new Error(
        `Token type mismatch: expected ${tokenType}, got ${this.currentToken.type}`,
      );
    }
  }

  private factor(): AST {
    const token = this.currentToken;
    if (token.type === "NUMBER") {
      this.eat("NUMBER");
      return new Num(token);
    } else if (token.type === "IDENTIFIER") {
      this.eat("IDENTIFIER");
      return new Var(token);
    }

    throw new Error("Syntax error in factor");
  }

  private term(): AST {
    let node = this.factor();
    while (
      this.currentToken.type === "MULT" ||
      this.currentToken.type === "DIV"
    ) {
      const token = this.currentToken;
      if (token.type === "MULT") {
        this.eat("MULT");
      } else if (token.type === "DIV") {
        this.eat("DIV");
      }

      node = new BinOp(node, token, this.factor());
    }
    return node;
  }

  private expression(): AST {
    let node = this.term();

    while (
      this.currentToken.type === "PLUS" ||
      this.currentToken.type === "MINUS"
    ) {
      const token = this.currentToken;
      if (token.type === "PLUS") {
        this.eat("PLUS");
      } else if (token.type === "MINUS") {
        this.eat("MINUS");
      }

      node = new BinOp(node, token, this.term());
    }

    if (this.currentToken.type === "ASSIGN") {
      const token = this.currentToken;
      this.eat("ASSIGN");
      node = new Assign(node as Var, token, this.expression());
    }

    return node;
  }

  parse(): AST {
    let node = this.expression();
    if (this.currentToken.type !== "EOF") {
      throw new Error("Unexpected token after expression");
    }
    return node;
  }
}

export { Parser, AST, BinOp, Num, Var, Assign, NoOp };
