import { useParams } from 'react-router-dom';

import {
  TrainingContent,
  TrainingSideBar,
  TrainingSideBarItem,
} from '../../components';

import { useTraining } from '../../hooks';

export const ViewTrainingPage = (): JSX.Element => {
  const { slug: trainingSlug, step: stepSlug } = useParams();

  if (!trainingSlug || !stepSlug) {
    return <div>Training not found</div>;
  }

  const { content, steps, currentStep, nextStep, resetTraining } = useTraining(
    trainingSlug,
    stepSlug
  );

  return (
    <div className='flex flex-row w-full h-full mx-auto'>
      <TrainingSideBar>
        {steps.map((item, index) => (
          <TrainingSideBarItem
            key={index}
            isDone={index < currentStep}
            isCurrent={index === currentStep}
            trainingSlug={trainingSlug}
            stepSlug={item.slug}
          >
            {item.name}
          </TrainingSideBarItem>
        ))}
      </TrainingSideBar>
      <section className='w-full h-full px-8 overflow-y-auto'>
        <TrainingContent content={content} />
      </section>
      <div className='fixed bottom-0 left-0 w-full p-4 bg-white'>
        <button
          className='px-4 py-2 text-white bg-blue-500 rounded-lg'
          onClick={nextStep}
        >
          next
        </button>
        <button
          className='px-4 py-2 text-blue-500 bg-transparent rounded-lg'
          onClick={resetTraining}
        >
          reset
        </button>
      </div>
    </div>
  );
};
