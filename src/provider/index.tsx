import { ClientConfig, SanityClient } from "@sanity/client";
import React, {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { logger } from "../utils";
import { useCMS } from "@tinacms/react-core";
import useSanityClient from "../hooks/useSanityClient";
import useSanityRootSchema from "../hooks/useSanityRootSchema";

let SanityContext:
  | React.Context<SanityConsumerProps>
  | React.Context<{}> = createContext({}); // eslint-disable-line prefer-const
SanityContext = createContext({});
SanityContext.displayName = "SanityContext";

export const useSanityContext = (): SanityConsumerProps =>
  useContext(SanityContext as React.Context<SanityConsumerProps>);

export const withSanityContext = (
  Component: React.ComponentType<SanityConsumerProps>
): ReactElement => {
  const Consumer = SanityContext.Consumer as React.Consumer<SanityClient | any>;

  return (
    <Consumer>
      {({ client, rootSchema, ...rest }) => {
        if (!client) {
          logger.warn(
            "Sanity Provider does not contain proper config... client missing"
          );
        }

        if (!rootSchema) {
          logger.warn(
            "Sanity Provider does not contain proper config... rootSchema missing"
          );
        }

        return <Component client={client} rootSchema={rootSchema} {...rest} />;
      }}
    </Consumer>
  );
};
const SanityProvider: React.FunctionComponent<ClientConfig> = ({
  children,
  ..._options
}) => {
  const cms = useCMS();
  const [options, setOptions] = useState<ClientConfig>(_options);
  const client = useSanityClient(_options);
  const rootSchema = useSanityRootSchema(cms, client, _options);

  useEffect(() => {
    setOptions(options);
  }, [_options]);
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
