export type PluginRegistryMetadata = PluginInfo[];

export interface PluginInfo {
  [key: string]: PluginMetadata;
}

export interface PluginRepository {
  type: string;
  url: string;
  directory: string;
}

export interface PluginBackstage {
  role: string;
  supportedVersions: string;
  pluginId: string;
  pluginPackage: string;
}

export interface PluginMetadata {
  name: string;
  version: string;
  description: string;
  backstage: PluginBackstage;
  homepage: string;
  repository: PluginRepository;
  license: string;
  maintainers: string;
  author: string;
  bugs: string;
  keywords: string[];
}
