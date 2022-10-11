import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { Loading } from '../../../../components';

import {
  TrainingContent,
  TrainingSideBar,
  TrainingSideBarItem,
} from '../../components';

import { useTraining } from '../../hooks';

export const ViewTrainingPage = (): JSX.Element => {
  const { slug: trainingSlug, step: stepSlug } = useParams();

  const {
    training,
    isLoading,
    progress,
    currentStep,
    nextStep,
    resetTraining,
  } = useTraining(trainingSlug!, stepSlug!);

  if (isLoading) return <Loading />;
  if (!training) return <div>Training not found</div>;

  const currentStepIndex = progress.currentStep;

  const progressPercentage = !training
    ? 0
    : Math.floor((currentStepIndex / training.getTotalSteps()) * 100);

  return (
    <div className='flex flex-row w-full h-full'>
      <TrainingSideBar title={training.name}>
        {training.steps.map((item, index) => (
          <TrainingSideBarItem
            key={index}
            isDone={index < currentStepIndex}
            isCurrent={index === currentStepIndex}
            isDisabled={index > currentStepIndex}
            trainingSlug={training.slug}
            stepSlug={item.slug}
          >
            {item.name}
          </TrainingSideBarItem>
        ))}
      </TrainingSideBar>
      <section className='w-full h-full px-8 overflow-y-auto'>
        {currentStep && (
          <div className='pb-20'>
            <h1 className='py-4'>{currentStep?.name}</h1>
            <TrainingContent content={currentStep.content} />
          </div>
        )}
      </section>
      <div className='fixed bottom-0 left-0 flex justify-end w-full p-4 bg-white shadow-xl'>
        <div className='absolute top-0 left-0 right-0 h-[2px] bg-gray-300'>
          <div
            className='h-[2px] transition-all duration-500 bg-green-400'
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <button
          className={clsx('px-8 py-2 text-2xl  rounded-lg font-heading', {
            'text-white bg-blue-500': !progress.completed,
            'text-gray-300 bg-gray-200': progress.completed,
          })}
          onClick={nextStep}
          disabled={progress.completed}
        >
          next
        </button>
        <button
          className={clsx(
            'px-8 py-2 text-2xl bg-transparent  rounded-lg font-heading',
            {
              'text-blue-500': progress.completed,
              'text-gray-300': !progress.completed,
            }
          )}
          onClick={resetTraining}
          disabled={!progress.completed}
        >
          reset
        </button>
      </div>
    </div>
  );
};
