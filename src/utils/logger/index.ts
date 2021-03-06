import { ERROR_PREFIX, WARN_PREFIX } from "../../constants";
const logger = {
  error: (...args: any): void => console.error(ERROR_PREFIX, ...args), //eslint-disable-line
  warn: (...args: any): void => console.warn(WARN_PREFIX, ...args), //eslint-disable-line
};

export default logger;
