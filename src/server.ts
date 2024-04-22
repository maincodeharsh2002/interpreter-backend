console.log("Hello World");
// server/src/app.ts
import express from "express";
import bodyParser from "body-parser";
import { Lexer } from "./util/lexer";
import { Parser } from "./util/parser";
import { Interpreter } from "./util/interpreter";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.post("/evaluate", (req, res) => {
  const { expression } = req.body;
  try {
    const lexer = new Lexer(expression);
    const parser = new Parser(lexer);
    const interpreter = new Interpreter(parser);
    const result = interpreter.interpret();
    res.send({ result });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
