import React, { createContext, useContext, useEffect, useState } from 'react';
import sanityClient, { SanityClient, ClientConfig } from '@sanity/client';
import init from '../init';

let SanityContext: React.Context<SanityConsumerProps> | React.Context<{}>;
SanityContext = createContext({});
SanityContext.displayName = 'SanityContext';

export const useSanityContext = () => useContext(SanityContext as React.Context<SanityConsumerProps>);

export const withSanityContext = (Component: React.ComponentType<SanityConsumerProps>) => {

    if ("config" in SanityContext.Consumer) {
        const Consumer = SanityContext.Consumer as React.Consumer<SanityClient | any>;

        return (<Consumer>
            {({ client, rootSchema, ...props }) => <Component client={client} rootSchema={rootSchema} {...props} />}
        </Consumer>)
    }
}

const SanityProvider: React.FunctionComponent<ClientConfig> = ({ children, ...options }) => {

    const [rootSchema, setRootSchema] = useState<Record<string, Object>>({});
    const client = sanityClient(options);
    useEffect(() => {
        const loadRootSchema = async () => {
            const rootSchema = await init({ dataset: options.dataset, projectId: options.projectId });
            setRootSchema(rootSchema)
            console.log(rootSchema);
        }
        loadRootSchema();

    }, [])

    return <SanityContext.Provider value={{ client, rootSchema }} >{children}</SanityContext.Provider>
}

type SanityConsumerProps = {
    client: SanityClient;
    rootSchema: Record<string, Object>;
}
export default SanityProvider;