import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";
import { DataSource, DataSourceOptions } from "typeorm";
import { configuration } from "@/config/env.config";

dotenv.config();
const orm = async (): Promise<DataSource> => {
  const config = <{ db: DataSourceOptions }>await configuration();

  const dbSchema = await schemas();

  const dbConfig = {
    ...config.db,
    entities: dbSchema.entities,
    seeds: dbSchema.seeds,
  };

  return new DataSource(dbConfig);
};

export default orm();

export const schemas = async (): Promise<{
  entities: any[];
  seeds: any[];
}> => {
  let entities = [];
  let seeds = [];

  async function readFilesRecursively(directoryPath: string): Promise<void> {
    try {
      const entries: fs.Dirent[] = fs.readdirSync(directoryPath, {
        withFileTypes: true,
      });

      for (const entry of entries) {
        const entryPath = path.join(directoryPath, entry.name);

        if (entry.isDirectory()) {
          await readFilesRecursively(entryPath);
        }

        const file = entry.name.split(".");
        const fileType = file.slice(-2, -1)[0];

        if (
          entry.isFile() &&
          file.length > 2 &&
          ["entity", "seeder"].includes(fileType)
        ) {
          const module = await import(entryPath);
          const moduleExports = Object.values(module);
          switch (fileType) {
            case "seeder":
              seeds = [...seeds, ...moduleExports];
              break;
            case "entity":
              entities = [...entities, ...moduleExports];
              break;
            default:
              break;
          }
        }
      }
    } catch (error) {
      console.error(`Error reading files in directory: ${error.message}`);
    }
  }

  await readFilesRecursively(path.join(__dirname, "../"));

  return { entities, seeds };
};
