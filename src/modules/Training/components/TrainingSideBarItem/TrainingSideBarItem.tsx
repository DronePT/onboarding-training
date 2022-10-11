import clsx from 'clsx';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface TrainingSideBarItemProps {
  isDone?: boolean;
  isCurrent?: boolean;
  children?: React.ReactNode;
  trainingSlug: string;
  stepSlug: string;
}

export const TrainingSideBarItem = ({
  isDone = false,
  isCurrent = false,
  isDisabled = false,
  stepSlug,
  trainingSlug,
  children,
}: TrainingSideBarItemProps): JSX.Element => {
  return (
    <li className='border-b border-gray-100 select-none last:border-b-0'>
      <Link
        className={clsx('flex items-center justify-between px-4 py-2')}
        to={`/training/${trainingSlug}/${stepSlug}`}
        onClick={(e) => {
          if (isDisabled) {
            e.preventDefault();
          }
        }}
      >
        <span
          className={clsx('mr-8', {
            'text-gray-300': !isCurrent,
            'line-through': isDone,
            'text-bold': isCurrent,
          })}
        >
          {children}
        </span>
        <AiOutlineCheckCircle
          className={clsx({
            'text-gray-500': isCurrent,
            'text-green-500': isDone,
            'text-gray-300': !isDone && !isCurrent,
          })}
          size={24}
        />
      </Link>
    </li>
  );
};
