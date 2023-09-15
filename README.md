## What is Langchain?

In simple terms, langchain is a framework and library of useful templates and tools that make it easier to build large language model applications that use custom data and external tools.

Essentially, langchain makes it easier to build chatbots for your own data and "personal assistant" bots that respond to natural language.

## Quick install

After you clone the repo, follow these instructions:

1. Install packages
   `npm install`

2. Add OpenAI key and data base connection as environment variables

- create a `.env` file in the root of the folder
- copy the environmental variables from `.env.example` into `.env` and replace with your keys
  - [openAI](https://platform.openai.com/account/api-keys).

3. If you don't have a database, you can use the template on `db.sql` file
  

## Usage

To run simply run the bash script below and replace "examplePath" with the relative path from src/index.ts and "prompt" with your request:

`npm run start {examplePath} '{prompt}'`

For example:

`npm run start ./agents/sql_db_prompt.ts 'How many employees do we have'`

## Requirements

- NodeJs v18
