import Provider, { withSanityContext } from "./";
import { cleanup, render, screen } from "@testing-library/react";
import { CMS } from "@tinacms/core";
import React from "react";
import { SanityClient } from "@sanity/client";
import { logger } from "../utils";
import { mocked } from "ts-jest/utils";
import { useCMS } from "@tinacms/react-core";
import useSanityClient from "../hooks/useSanityClient";
import useSanityRootSchema from "../hooks/useSanityRootSchema";

jest.mock("@tinacms/react-core", () => ({
  __esModule: true,
  useCMS: jest.fn(() => ({ registerApi: jest.fn() })),
  default: {},
}));
jest.mock("@sanity/client");
jest.mock("../hooks/useSanityClient");
jest.mock("../hooks/useSanityRootSchema");
jest.mock("../utils", () => ({
  __esModule: true,
  logger: {
    warn: jest.fn(() => {
      console.log("WARNING");
    }),
  },
}));
const mockCMS = ({
  registerApi: jest.fn(),
} as unknown) as CMS;
const mockSanityClient = ({} as unknown) as SanityClient;
const mockSanityRootSchema = {};
const mockedUseCMS = mocked(useCMS);
const mockedUseSanityClient = mocked(useSanityClient);
const mockedUseSanityRootSchema = mocked(useSanityRootSchema);
describe("SanityProvider", () => {
  beforeEach(() => {
    mockedUseCMS.mockClear();
    mockedUseCMS.mockReturnValue(mockCMS);

    mockedUseSanityClient.mockClear();
    mockedUseSanityClient.mockReturnValue({} as SanityClient);

    mockedUseSanityRootSchema.mockClear();
    mockedUseSanityRootSchema.mockReturnValue(mockSanityRootSchema);
  });

  afterEach(cleanup);

  it("should return provider context ", () => {});

  it("should get Sanity Client & rootSchema and", () => {
    const mockInnerHTML = "Provider Test";
    const testid = "provider-test";
    const options = {
      projectId: "projectId",
      dataset: "dataset",
    };
    const ChildComp = () => {
      return <div data-testid={testid}>{mockInnerHTML}</div>;
    };

    render(
      <Provider {...options}>
        <ChildComp></ChildComp>
      </Provider>
    );
    const childElem = screen.getByTestId(testid);

    expect(mockedUseCMS).toHaveBeenCalled();
    expect(mockedUseSanityClient).toHaveBeenCalledWith(options);
    expect(mockedUseSanityRootSchema).toHaveBeenCalledWith(
      mockCMS,
      mockSanityClient,
      options
    );
    expect(childElem.innerHTML).toEqual(mockInnerHTML);
  });
});

describe("withSanityContext", () => {
  beforeEach(() => {
    // logger.warn = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  it("should wrap in Sanity Context", () => {
    mockedUseCMS.mockReturnValue(mockCMS);
    mockedUseSanityClient.mockReturnValue({} as SanityClient);
    mockedUseSanityRootSchema.mockReturnValue(mockSanityRootSchema);
    const options = {
      projectId: "projectId",
      dataset: "dataset",
    };
    const Component = (props: any) => {
      expect(props.client).toBeDefined();
      expect(props.rootSchema).toBeDefined();
      return <div></div>;
    };
    const HOC = withSanityContext(Component);
    render(<Provider {...options}>{HOC}</Provider>);
  });

  it("should warn if no config", () => {
    mockedUseCMS.mockReturnValue(mockCMS);
    mockedUseSanityClient.mockReturnValue(null as any);
    mockedUseSanityRootSchema.mockReturnValue(null as any);
    const AnyProvider = Provider as any;
    const Component = (props: any) => {
      expect(props.client).not.toBeDefined();
      expect(props.rootSchema).not.toBeDefined();
      expect(logger.warn).toHaveBeenCalled();
      return <div></div>;
    };
    const Wrapper = () => <Component />;
    const ContextHOC = withSanityContext(Wrapper);
    render(<AnyProvider>{ContextHOC}</AnyProvider>);
  });
});
