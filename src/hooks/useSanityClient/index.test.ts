import { /*act,*/ cleanup, renderHook } from "@testing-library/react-hooks";
import sanityClient, { SanityClient } from "@sanity/client";
import { mocked } from "ts-jest/utils";
import useSanityClient from "./";

jest.mock("@sanity/client");

const sanityOptions = {
  projectId: "test-id",
  dataset: "dataset",
  useCdn: false,
};
mocked(sanityClient).mockReturnValue(({
  auth: "value",
  project: "project",
} as unknown) as SanityClient);
describe("useSanityClient", () => {
  afterAll(cleanup);
  it("should", () => {
    const { result } = renderHook(() => useSanityClient(sanityOptions));
    expect(sanityClient).toHaveBeenCalledWith(sanityOptions);
    // Just make sure the same values from mock Sanity client come back as the return value
    expect(result.current).toHaveProperty("auth");
    expect(result.current).toHaveProperty("project");
  });
});
