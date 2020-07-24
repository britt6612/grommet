import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import isChromatic from 'chromatic/isChromatic';

import { Grommet, Box, Calendar } from 'grommet';
import { grommet } from 'grommet/themes';

const SimpleCalendar = () => {
  const [date, setDate] = useState();

  const onSelect = nextDate => {
    setDate(nextDate !== date ? nextDate : undefined);
  };

  return (
    <Grommet theme={grommet}>
      <Box align="center" pad="large">
        <Calendar disabled={['2020-08-07']} />
      </Box>
    </Grommet>
  );
};

if (!isChromatic()) {
  storiesOf('TypeScript/Calendar', module).add('Simple', () => (
    <SimpleCalendar />
  ));
}
