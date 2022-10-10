import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  TrainingContent,
  TrainingSideBar,
  TrainingSideBarItem,
} from '../../components';

import { TRAININGS } from '../../../../constants/trainings';

export const ViewTrainingPage = (): JSX.Element => {
  const [content, setContent] = useState('');
  const { slug } = useParams();

  const training = TRAININGS.find((training) => training.slug === slug);

  if (!training) return <div>Training not found</div>;

  const sideBarItems: TrainingSideBarItem[] = training.steps.map((step) => ({
    text: step.name,
    onClick: () => setContent(step.content),
  }));

  return (
    <div className='flex flex-row w-full h-full mx-auto'>
      <TrainingSideBar items={sideBarItems} />
      <section className='w-full h-full px-8 overflow-y-auto'>
        <TrainingContent content={content} />
      </section>
    </div>
  );
};
