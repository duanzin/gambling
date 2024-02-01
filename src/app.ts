import express, { Express } from "express";
import cors from "cors";
import { connectDb, disconnectDB } from "./config/database";
import routes from "./routes/index";
import { handleApplicationErrors } from "./middleware/errorHandlingMiddleware";

const app = express();
app
  .use(cors())
  .options("*", cors())
  .use(express.json())
  .use(routes)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
