import { useState } from 'react';

import {
  TrainingContent,
  TrainingSideBar,
  TrainingSideBarItem,
} from '../../components';

const sideBarItems: TrainingSideBarItem[] = [
  {
    isDone: true,
    text: 'Introduction',
  },
  {
    isCurrent: true,
    text: 'Getting started',
  },
  {
    text: 'Components',
  },
  {
    text: 'Props',
  },
  {
    text: 'State',
  },
  {
    text: 'Hooks',
  },
  {
    text: 'Context',
  },
  {
    text: 'Redux',
  },
  {
    text: 'Testing',
  },
  {
    text: 'Deployment',
  },
];

export const ViewTrainingPage = (): JSX.Element => {
  const [text, setText] = useState('');

  return (
    <div className='w-full h-full mx-auto flex flex-row'>
      <TrainingSideBar items={sideBarItems} />
      <section className='px-8 w-full h-full overflow-y-auto'>
        <TrainingContent />
      </section>
    </div>
  );
};
