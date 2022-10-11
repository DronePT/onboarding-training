import clsx from 'clsx';
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

  const {
    content,
    steps,
    currentStep,
    completed,
    nextStep,
    resetTraining,
    name,
    stepName,
  } = useTraining(trainingSlug, stepSlug);

  const progress = Math.floor((currentStep / steps.length) * 100);

  console.log('progress', progress);

  return (
    <div className='flex flex-row w-full h-full'>
      <TrainingSideBar title={name}>
        {steps.map((item, index) => (
          <TrainingSideBarItem
            key={index}
            isDone={index < currentStep}
            isCurrent={index === currentStep}
            isDisabled={index > currentStep}
            trainingSlug={trainingSlug}
            stepSlug={item.slug}
          >
            {item.name}
          </TrainingSideBarItem>
        ))}
      </TrainingSideBar>
      <section className='w-full h-full px-8 overflow-y-auto'>
        <div className='pb-20'>
          <h1 className='py-4'>{stepName}</h1>
          <TrainingContent content={content} />
        </div>
      </section>
      <div className='fixed bottom-0 left-0 flex justify-end w-full p-4 bg-white shadow-xl'>
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-gray-300'>
          <div
            className='h-[2px] transition-all duration-500 bg-green-400'
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <button
          className={clsx('px-8 py-2 text-2xl  rounded-lg font-heading', {
            'text-white bg-blue-500': !completed,
            'text-gray-300 bg-gray-200': completed,
          })}
          onClick={nextStep}
          disabled={completed}
        >
          next
        </button>
        <button
          className={clsx(
            'px-8 py-2 text-2xl bg-transparent  rounded-lg font-heading',
            {
              'text-blue-500': completed,
              'text-gray-300': !completed,
            }
          )}
          onClick={resetTraining}
          disabled={!completed}
        >
          reset
        </button>
      </div>
    </div>
  );
};
