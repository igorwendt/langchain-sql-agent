import { OpenAI } from "langchain/llms/openai";
import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";
import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { SQL_PREFIX, SQL_SUFFIX } from "./prompt";

dotenv.config();

export const run = async (prompt: string) => {
  const datasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
  });
  const toolkit = new SqlToolkit(db, model);

  const executor = createSqlAgent(model, toolkit, {
    topK: 10,
    prefix: SQL_PREFIX,
    suffix: SQL_SUFFIX,
  });

  try {
    const result = await executor.call({ input: prompt });
    console.log(`RESPONSE: ${result.output}`);
    // console.log(`Intermediate steps ${JSON.stringify(result, null, 2)}`);
    result.intermediateSteps.forEach((step: any) => {
      console.log(step.action.toolInput);
    });
  } catch (e) {
    console.log(e);
  }

  await datasource.destroy();
  console.log("Closed connection with database.");
};
