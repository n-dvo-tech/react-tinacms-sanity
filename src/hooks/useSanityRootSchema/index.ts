import { ClientConfig, SanityClient } from "@sanity/client";
import { useEffect, useState } from "react";
import { CMS } from "@tinacms/core";
import init from "../../init";

const useSanityRootSchema = (
  cms: CMS,
  client: SanityClient,
  options: ClientConfig
): any => {
  const [rootSchema, setRootSchema] = useState<Record<string, Object>>({});
  // Destructure to use in useEffect dependencies
  const { dataset, projectId, useCdn } = options;
  useEffect(() => {
    const loadRootSchema = async () => {
      const rootSchema = await init({
        dataset: options.dataset,
        projectId: options.projectId,
        useCdn: options.useCdn,
      });
      setRootSchema(rootSchema);
    };
    loadRootSchema();
    cms.registerApi("sanityClient", client);
  }, [dataset, projectId, useCdn]);

  return rootSchema;
};

export default useSanityRootSchema;
