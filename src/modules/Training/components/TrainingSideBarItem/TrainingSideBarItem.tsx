import clsx from 'clsx';
import { AiOutlineCheckCircle } from 'react-icons/ai';

interface TrainingSideBarItemProps {
  isDone?: boolean;
  isCurrent?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const TrainingSideBarItem = ({
  isDone = false,
  isCurrent = false,
  onClick,
  children,
}: TrainingSideBarItemProps): JSX.Element => {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <li className='border-b border-gray-100 last:border-b-0'>
      <a
        href='#'
        className='px-4 py-2 flex justify-between items-center'
        onClick={handleClick}
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
      </a>
    </li>
  );
};
