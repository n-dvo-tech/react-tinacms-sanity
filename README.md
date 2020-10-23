# react-tinacms-sanity

Provides intitialization and integration of the [@sanity/client](https://www.npmjs.com/package/@sanity/client) within the [TinaCMS](https://www.npmjs.com/package/tinacms)

## Requirements

The Sanity Provider must be wrapped inside the context of a TinaCMS Provider.

## Installation

```bash

npm install --save react-tinacms-sanity

```

## Getting Started

```js
import TinaCMS from 'tinacms';
import SanityProvider from 'react-tinacms-sanity'

export default function MyApp({ Component, pageProps }) {
  const cms = useMemo(
    () =>
      new TinaCMS({...}),
    []
  );
  return (
    <TinaProvider cms={cms}>
      <SanityProvider dataSet={dataset} projectId={projectId} token={token}>
        <Component {...pageProps} />
      </SanityProvider>
    </TinaProvider>
  );
}

const RootComponent = () => {
    // Use the sanity client and a root document schema from Sanity.
    const { sanityClient, rootSchema } = useSanityContext();
    ...
}
```

```js
import { useCMS } from "tinacms";

// Or just use the api from tina cms
const RootComponent = () => {
  const cms = useCMS();

  useEffect(() => {
    cms.api.sanityClient.fetch(query, params).then((bikes) => {
      console.log("Bikes with more than one seat:");
      bikes.forEach((bike) => {
        console.log(`${bike.name} (${bike.seats} seats)`);
      });
    });
  }, []);
};
```
