import path from "path";

const [exampleName, ...args] = process.argv.slice(2);

console.log(exampleName, ...args);

let runExample;

try {
  // eslint-disable-next-line import/no-dynamic-require
  ({ run: runExample } = require(path.join(__dirname, exampleName)));
} catch {
  throw new Error(`Could not load example ${exampleName}`);
}

runExample(args[0]);
