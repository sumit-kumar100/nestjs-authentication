import type { config as base } from "./env/default";
import type { config as production } from "./env/production";

type Objectype = Record<string, unknown>;
type Default = typeof base;
type Production = typeof production;
type Config = Default & Production;

const util = {
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  },
  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }

    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  const { config } = <{ config: Default }>(
    await import(`${__dirname}/env/default`)
  );
  const { config: environment } = <{ config: Production }>(
    await import(`${__dirname}/env/${process.env.NODE_ENV || "development"}`)
  );
  return util.merge(config, environment);
};
