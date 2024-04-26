import express,{ Request,Response } from "express";
import bodyParser from "body-parser";
import { Lexer } from "./util/lexer";
import { Parser } from "./util/parser";
import { Interpreter } from "./util/interpreter";
import cors from 'cors';

const app = express();
app.use(cors());

const PORT = 3001;

app.use(bodyParser.json());

function interprete(inputString:string): string {
  const lexer = new Lexer(inputString);
  const parser = new Parser(lexer);
  const interpreter = new Interpreter(parser);

  return interpreter.interpret();
}

// api endpoint to evaluate expression
app.post("/evaluate", (req:Request,res:Response) => {
  const { expression } = req.body;
  try {
    const result = interprete(expression);
    res.send({ result });   
  } catch (error:any) {
    res.status(400).send({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
