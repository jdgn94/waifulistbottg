import { Logger } from "./src/config/winston";

declare global {
  namespace NodeJS {
    interface Global {
      logger: Logger;
    }
  }
}
