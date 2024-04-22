/* Lexical Analyser : Converts the sequence of characters into sequence of tokens */

// src/lexer.ts

type TokenType =
  | "NUMBER"
  | "PLUS"
  | "MINUS"
  | "MULT"
  | "DIV"
  | "ASSIGN"
  | "IDENTIFIER"
  | "SEMICOLON"
  | "LPAREN"
  | "RPAREN"
  | "EOF";

interface Token {
  type: TokenType;
  value: any;
}

class Lexer {
  private pos: number = 0;
  private currentChar: string | null = null;

  constructor(private text: string) {
    this.currentChar = text[this.pos];
  }

  private advance(): void {
    this.pos++;
    this.currentChar = this.pos < this.text.length ? this.text[this.pos] : null;
  }

  private skipWhitespace(): void {
    while (this.currentChar !== null && /\s/.test(this.currentChar)) {
      this.advance();
    }
  }

  private integer(): number {
    let result = "";
    while (this.currentChar !== null && /\d/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    return parseInt(result);
  }

  private identifier(): string {
    let result = "";
    while (this.currentChar !== null && /[a-zA-Z_]/.test(this.currentChar)) {
      result += this.currentChar;
      this.advance();
    }
    return result;
  }

  getNextToken(): Token {
    while (this.currentChar !== null) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      if (/\d/.test(this.currentChar)) {
        return { type: "NUMBER", value: this.integer() };
      }

      if (this.currentChar === "+") {
        this.advance();
        return { type: "PLUS", value: "+" };
      }

      if (this.currentChar === "-") {
        this.advance();
        return { type: "MINUS", value: "-" };
      }

      if (this.currentChar === "*") {
        this.advance();
        return { type: "MULT", value: "*" };
      }

      if (this.currentChar === "/") {
        this.advance();
        return { type: "DIV", value: "/" };
      }

      if (this.currentChar === "=") {
        this.advance();
        return { type: "ASSIGN", value: "=" };
      }

      if (/[a-zA-Z_]/.test(this.currentChar)) {
        return { type: "IDENTIFIER", value: this.identifier() };
      }

      if (this.currentChar === ";") {
        this.advance();
        return { type: "SEMICOLON", value: ";" };
      }

      if (this.currentChar === "(") {
        this.advance();
        return { type: "LPAREN", value: "(" };
      }

      if (this.currentChar === ")") {
        this.advance();
        return { type: "RPAREN", value: ")" };
      }

      throw new Error(`Unknown character: ${this.currentChar}`);
    }

    return { type: "EOF", value: null };
  }
}

export { Lexer, Token, TokenType };
