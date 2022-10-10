import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  TrainingContent,
  TrainingSideBar,
  TrainingSideBarItem,
} from '../../components';

import { useTraining } from '../../hooks';

export const ViewTrainingPage = (): JSX.Element => {
  const [content, setContent] = useState('');
  const { slug } = useParams();

  const training = useTraining(slug);

  if (!training) return <div>Training not found</div>;

  return (
    <div className='flex flex-row w-full h-full mx-auto'>
      <TrainingSideBar>
        {training.steps.map((item, index) => (
          <TrainingSideBarItem
            key={index}
            isDone={false}
            isCurrent={false}
            onClick={() => setContent(item.content)}
          >
            {item.name}
          </TrainingSideBarItem>
        ))}
      </TrainingSideBar>
      <section className='w-full h-full px-8 overflow-y-auto'>
        <TrainingContent content={content} />
      </section>
    </div>
  );
};
