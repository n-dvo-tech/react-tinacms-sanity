import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import sanityClient, { SanityClient, ClientConfig } from "@sanity/client";
import { useCMS } from "@tinacms/react-core";
import init from "../init";

let SanityContext:
  | React.Context<SanityConsumerProps>
  | React.Context<{}> = createContext({}); // eslint-disable-line prefer-const
SanityContext = createContext({});
SanityContext.displayName = "SanityContext";

export const useSanityContext = (): SanityConsumerProps =>
  useContext(SanityContext as React.Context<SanityConsumerProps>);

export const withSanityContext = (
  Component: React.ComponentType<SanityConsumerProps>
): React.ReactNode => {
  if ("config" in SanityContext.Consumer) {
    const Consumer = SanityContext.Consumer as React.Consumer<
      SanityClient | any
    >;

    return (
      <Consumer>
        {({ client, rootSchema, ...props }) => (
          <Component client={client} rootSchema={rootSchema} {...props} />
        )}
      </Consumer>
    );
  }
};

const SanityProvider: React.FunctionComponent<ClientConfig> = ({
  children,
  ...options
}) => {
  const cms = useCMS();
  const [rootSchema, setRootSchema] = useState<Record<string, Object>>({});
  const client = useMemo(() => sanityClient(options), [options]);
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
  }, []);

  return (
    <SanityContext.Provider value={{ client, rootSchema }}>
      {children}
    </SanityContext.Provider>
  );
};

type SanityConsumerProps = {
  client: SanityClient;
  rootSchema: Record<string, Object>;
};

export default SanityProvider;
