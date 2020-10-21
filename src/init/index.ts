import { ClientConfig } from '@sanity/client';
import superagent from 'superagent';
import rootQuery from '../queries/root';

const init: Init = async ({ dataset, projectId }) => {
  const url = `https://${projectId}.api.sanity.io/v1/graphql/${dataset}/default`;
  const res = await superagent.post(url).send(JSON.stringify({
    query: rootQuery
  }))
    .set('Content-Type', 'application/json')
  return res.body;
}

type Init = ({ dataset, projectId }: Partial<ClientConfig>) => Promise<Record<string, Object>>;
export default init;