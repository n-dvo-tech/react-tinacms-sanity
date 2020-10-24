import { ERROR_PREFIX } from "../../constants";
const logger = {
  error: (...args: any): void => console.error(ERROR_PREFIX, ...args), //eslint-disable-line
};

export default logger;
