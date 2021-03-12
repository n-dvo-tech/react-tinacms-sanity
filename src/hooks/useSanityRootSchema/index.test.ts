import { ClientConfig, SanityClient } from "@sanity/client";
import { renderHook } from "@testing-library/react-hooks";
import { CMS } from "@tinacms/core";
import init from "../../init";
import { mocked } from "ts-jest/utils";

import useSanityRootSchema from "./";
import {} from "@testing-library/react";

jest.mock("../../init");

const MOCK_CMS = ({
  registerApi: jest.fn(),
} as unknown) as CMS;

const MOCK_CLIENT = ({} as unknown) as SanityClient;
const MOCK_SANITY_OPTIONS = ({
  projectId: "project-id",
  dataset: "dataset",
  useCdn: false,
} as unknown) as ClientConfig;
const MOCK_ROOT_SCHEMA = { mock: "data" } as Record<string, Object>;
describe("useSanityRootSchema", () => {
  beforeEach(() => {
    mocked(init, true).mockReturnValue(Promise.resolve(MOCK_ROOT_SCHEMA));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return root schema", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSanityRootSchema(MOCK_CMS, MOCK_CLIENT, MOCK_SANITY_OPTIONS)
    );

    expect(MOCK_CMS.registerApi).toHaveBeenCalledWith(
      "sanityClient",
      MOCK_CLIENT
    );

    await waitForNextUpdate();

    expect(result.current).toEqual(MOCK_ROOT_SCHEMA);
  });
});
