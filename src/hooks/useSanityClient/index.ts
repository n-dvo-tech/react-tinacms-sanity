import sanityClient, { ClientConfig, SanityClient } from "@sanity/client";
import { useEffect, useState } from "react";

const useSanityClient = (options: ClientConfig): SanityClient => {
  const [client, setClient] = useState<SanityClient>(() =>
    sanityClient(options)
  );
  const { dataset, projectId, useCdn } = options;
  useEffect(() => {
    if (options) {
      const newClient = sanityClient(options);
      setClient(newClient);
    }
  }, [dataset, projectId, useCdn]);
  return client;
};

export default useSanityClient;
