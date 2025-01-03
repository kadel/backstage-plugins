import { ComponentEntityV1alpha1 } from '@backstage/catalog-model';

import { OptionValues } from 'commander';
import fs from 'fs-extra';
import yaml from 'js-yaml';

import { exec as execCb } from 'child_process';
import path from 'path';
import { promisify } from 'util';

import { Task } from '../../lib/tasks';
import { PluginRegistryMetadata } from '../package-dynamic-plugins/types';
import { ImageInfo, ImageMetadata, RegistryIndex } from './types';

const exec = promisify(execCb);

const DEFAULT_OWNER = 'system/rhdh';
const DEFAULT_LIFECYCLE = 'production';
const DEFAULT_TYPE = 'plugin';

export async function command(opts: OptionValues): Promise<void> {
  const { indexFile } = opts;

  const containerTool = 'skopeo';
  try {
    await Task.forCommand(`${containerTool} --version`);
  } catch (e) {
    Task.error(
      `Unable to find ${containerTool} command: ${e}\nMake sure that ${containerTool} is installed and available in your PATH.`,
    );
    return;
  }

  const indexFilePath = path.resolve(indexFile);
  const indexFileContent = await fs.readFile(indexFilePath, 'utf8');
  // parse yaml file
  const registryIndex: RegistryIndex = yaml.load(
    indexFileContent,
  ) as RegistryIndex;

  console.log('Registry Index:', registryIndex);

  const entities: ComponentEntityV1alpha1[] = [];

  for (const plugin of registryIndex.plugins) {
    console.log(`Processing registry entry:`);
    console.log(`${JSON.stringify(plugin)}`);

    const image = parseImage(plugin.image);
    const meta = await inspectImage(containerTool, image);
    console.log('Image metadata:');
    console.log(meta);

    const pluginsDataString =
      meta?.annotations['com.redhat.rhdh.plugins'] || '';

    const pluginsData: PluginRegistryMetadata = JSON.parse(pluginsDataString);

    for (const pluginData of pluginsData) {
      for (const key in pluginData) {
        if (Object.hasOwn(pluginData, key)) {
          const data = pluginData[key];

          console.log(data);

          entities.push({
            apiVersion: 'backstage.io/v1alpha1',
            kind: 'Component',
            metadata: {
              name: data.name,
              description: data.description,
              links: [
                {
                  url: data.homepage,
                  title: 'Plugin Homepage',
                },
                {
                  url: data.repository.url,
                  title: 'Plugin Repository',
                },
                {
                  url: data.bugs,
                  title: 'Report Issues',
                },
              ],
            },
            spec: {
              type: DEFAULT_TYPE,
              lifecycle: DEFAULT_LIFECYCLE,
              owner: DEFAULT_OWNER,
            },
          });
        }
      }
    }
    console.log(`-------------------------`);
  }
  console.log(entities);
}

function parseImage(imagePath: string): ImageInfo {
  // TODO: validate imagePath
  const parts = imagePath.split('/');
  const registry = parts[0];
  const imageParts = parts.slice(1).join('/').split(':');
  const image = imageParts[0];
  const tag = imageParts[1];
  return { registry, image, tag };
}

async function inspectImage(
  containerTool: string,
  image: ImageInfo,
): Promise<ImageMetadata | undefined> {
  Task.log(`Running ${containerTool}`);
  try {
    const { stdout } = await exec(
      `${containerTool} inspect --raw docker://${image.registry}/${image.image}:${image.tag}`,
    );
    return JSON.parse(stdout) as ImageMetadata;
  } catch (e) {
    Task.error(`Error encountered while inspecting plugin container: ${e}`);
    return undefined;
  }
}
