# my-plugin

Welcome to the my-plugin plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/my-plugin](http://localhost:3000/my-plugin).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

```diff
diff --git a/packages/app/src/App.tsx b/packages/app/src/App.tsx
index 335a1c7e..f596e7ae 100644
--- a/packages/app/src/App.tsx
+++ b/packages/app/src/App.tsx
@@ -26,6 +26,8 @@ import { searchPage } from './components/search/SearchPage';
 import DynamicRoot from './DynamicRoot';
 import DynamicRootContext from './DynamicRoot/DynamicRootContext';

+import { MyPluginPage } from '@janus-idp/backstage-plugin-my-plugin';
+
 export const AppBase = () => {
   const { AppProvider, AppRouter, dynamicRoutes } =
     useContext(DynamicRootContext);
@@ -73,6 +75,7 @@ export const AppBase = () => {
                 element={<Component {...props} />}
               />
             ))}
+            <Route path="/my-plugin" element={<MyPluginPage />} />
           </FlatRoutes>
         </Root>
       </AppRouter>
```

```diff
diff --git a/packages/app/src/components/Root/Root.tsx b/packages/app/src/components/Root/Root.tsx
index 5f519654..2d38ede8 100644
--- a/packages/app/src/components/Root/Root.tsx
+++ b/packages/app/src/components/Root/Root.tsx
@@ -75,6 +75,10 @@ export const Root = ({ children }: PropsWithChildren<{}>) => (
           <SidebarItem icon={MapIcon} to="tech-radar" text="Tech Radar" />
         </SidebarScrollWrapper>
       </SidebarGroup>
+      <SidebarDivider />
+
+      <SidebarItem icon={ExtensionIcon} to="my-plugin" text="my plugin"/>
+
       <SidebarDivider />
       <SidebarSpace />
       <SidebarDivider />
```

```diff
diff --git a/packages/app/src/components/catalog/EntityPage.tsx b/packages/app/src/components/catalog/EntityPage.tsx
index be1029db..3b1293c9 100644
--- a/packages/app/src/components/catalog/EntityPage.tsx
+++ b/packages/app/src/components/catalog/EntityPage.tsx
@@ -57,6 +57,8 @@ import { TechDocsAddons } from '@backstage/plugin-techdocs-react';

 import { Button, Grid } from '@material-ui/core';

+import { MyPluginEntityPage } from  '@janus-idp/backstage-plugin-my-plugin';
+
 const techdocsContent = (
   <EntityTechdocsContent>
     <TechDocsAddons>
@@ -193,6 +195,11 @@ const websiteEntityPage = (
     <EntityLayout.Route path="/docs" title="Docs">
       {techdocsContent}
     </EntityLayout.Route>
+
+    <EntityLayout.Route path="/my-plugin" title="CustomTitle">
+      <MyPluginEntityPage />
+    </EntityLayout.Route>
+
   </EntityLayout>
 );
```
