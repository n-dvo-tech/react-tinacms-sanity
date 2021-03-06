import logger from "./";
import { mocked } from "ts-jest/utils";

const mockedConsole = mocked(global.console, true);
describe("logger", () => {
  it("should call console.error with prefix", () => {
    mockedConsole.error = jest.fn();
    logger.error("log it");

    expect(mockedConsole.error).toHaveBeenCalled();
  });

  it("should call console.warn with prefix", () => {
    mockedConsole.warn = jest.fn();
    logger.warn("log it");

    expect(mockedConsole.warn).toHaveBeenCalled();
  });
});
