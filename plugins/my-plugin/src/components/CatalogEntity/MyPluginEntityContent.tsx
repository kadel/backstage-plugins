import React from 'react';

import { Content, InfoCard } from '@backstage/core-components';
import { useEntity } from '@backstage/plugin-catalog-react';

import { Grid, Typography } from '@material-ui/core';

export const MyPluginEntityContent = () => {
  const entity = useEntity();

  return (
    <Content>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <InfoCard title={entity.entity.metadata.name}>
            <Typography variant="body1">
              <pre>{JSON.stringify(entity.entity, null, 2)}</pre>
            </Typography>
          </InfoCard>
        </Grid>
      </Grid>
    </Content>
  );
};
