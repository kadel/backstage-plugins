import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const myPluginPlugin = createPlugin({
  id: 'my-plugin',
  routes: {
    root: rootRouteRef,
  },
});

export const MyPluginPage = myPluginPlugin.provide(
  createRoutableExtension({
    name: 'MyPluginPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

export const MyPluginEntityPage = myPluginPlugin.provide(
  createRoutableExtension({
    name: 'MyPluginEntityPage',
    component: () =>
      import('./components/CatalogEntity').then(m => m.MyPluginEntityContent),
    mountPoint: rootRouteRef,
  }),
);
