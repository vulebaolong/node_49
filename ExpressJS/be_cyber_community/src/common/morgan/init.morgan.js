import chalk from "chalk";
import morgan from "morgan";

const colorMethod = (method) => {
   if (method === "GET") return chalk.green(method);
   if (method === "POST") return chalk.yellow(method);
   if (method === "PUT") return chalk.blue(method);
   if (method === "PATCH") return chalk.purple(method);
   if (method === "DELETE") return chalk.red(method);
   return chalk.gray(method);
};
const colorCode = (code) => {
   if (code >= 400) return chalk.bgRed(code);
   if (code <= 399) return chalk.bgGreen(code);
   return chalk.bgGray(code);
};

const logApi = morgan(function (tokens, req, res) {
   return [
      chalk.gray(new Date().toLocaleString()),
      "\t",
      colorMethod(tokens.method(req, res)),
      colorCode(tokens.status(req, res)),
      tokens.url(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
   ].join(" ");
});

export default logApi;
