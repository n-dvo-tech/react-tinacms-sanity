import init from "./";
import { logger } from "../utils";
import nock from "nock";
import rootQuery from "../queries/root";

jest.mock("../utils");

describe("init", () => {
  it("should initialize sanity api", async () => {
    const projectId = "test";
    const dataset = "test-data";
    const returnValue = { data: "value" };

    nock(`https://${projectId}.api.sanity.io`)
      .post(`/v1/graphql/${dataset}/default`, (body) => {
        expect(body.query).toEqual(rootQuery);
        return true;
      })
      .reply(200, returnValue);

    const res = await init({ projectId, dataset });
    expect(res).toEqual(returnValue);
  });

  it("should initialize sanity api (useCdn)", async () => {
    const projectId = "test";
    const dataset = "test-data";
    const useCdn = true;
    const returnValue = { data: "value" };

    nock(`https://${projectId}.apicdn.sanity.io`)
      .post(`/v1/graphql/${dataset}/default`, (body) => {
        expect(body.query).toEqual(rootQuery);
        return true;
      })
      .reply(200, returnValue);

    const res = await init({ projectId, dataset, useCdn });
    expect(res).toEqual(returnValue);
  });

  it("should log except and return empty object upon error", async () => {
    const projectId = "test";
    const dataset = "test-data";
    const returnValue = { data: "value" };

    nock(`https://${projectId}.api.sanity.io`)
      .post(`/v1/graphql/${dataset}/default`, (body) => {
        expect(body.query).toEqual(rootQuery);
        return true;
      })
      .reply(400, returnValue);

    const res = await init({ projectId, dataset });

    expect(logger.error).toHaveBeenCalled();
    expect(res).toEqual({});
  });

  it("should catch exception", () => {});
});
