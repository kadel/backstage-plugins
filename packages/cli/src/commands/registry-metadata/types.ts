export interface PluginRecord {
  image: string;
  name: string;
  description: string;
}

export interface RegistryIndex {
  plugins: PluginRecord[];
}

export interface ImageInfo {
  registry: string;
  image: string;
  tag: string;
}

interface LayerInfo {
  mediaType: string;
  digest: string;
  size: number;
}

export interface ImageMetadata {
  schemaVersion: number;
  config: LayerInfo;
  layers: LayerInfo[];
  annotations: {
    [key: string]: string;
  };
}
