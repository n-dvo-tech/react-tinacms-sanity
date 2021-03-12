import { ClientConfig } from "@sanity/client";
import { logger } from "../utils";
import rootQuery from "../queries/root";
import superagent from "superagent";

type Init = ({
  dataset,
  projectId,
}: Partial<ClientConfig>) => Promise<Record<string, Object>>;

const init: Init = async ({ dataset, projectId, useCdn }) => {
  const cdn = useCdn ? "cdn" : "";
  const url = `https://${projectId}.api${cdn}.sanity.io/v1/graphql/${dataset}/default`;
  let results = {};
  try {
    const res = await superagent
      .post(url)
      .send(
        JSON.stringify({
          query: rootQuery,
        })
      )
      .set("Content-Type", "application/json");
    results = res.body;
  } catch (error) {
    logger.error(error);
    return {};
  }

  return results;
};

export default init;
