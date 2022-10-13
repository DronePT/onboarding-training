import clsx from 'clsx';
import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaHamburger } from 'react-icons/fa';
import { TrainingSideBarItem } from '../TrainingSideBarItem';

interface TrainingSideBarProps {
  title?: string;
  children: ReturnType<typeof TrainingSideBarItem>[];
}

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = React.useState(false);

  React.useEffect(() => {
    const updateTarget = (e: MediaQueryListEvent) =>
      setTargetReached(e.matches);
    const media = window.matchMedia(`(min-width: ${width}px)`);
    media.addEventListener('change', updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener('change', updateTarget);
  }, []);

  return targetReached;
};

export const TrainingSideBar = ({
  title,
  children,
}: TrainingSideBarProps): JSX.Element => {
  const isDesktop = useMediaQuery(768);
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <div className='fixed z-20 right-8 top-0 md:hidden h-[80px] flex items-center justify-center'>
        <button onClick={() => setIsOpen((o) => !o)}>
          {isOpen ? (
            <AiOutlineCloseCircle size={32} />
          ) : (
            <FaHamburger size={32} />
          )}
        </button>
      </div>
      <div
        className={clsx(
          'bg-white flex-grow max-w-xs min-w-[300px] shadow-lg z-10',
          'absolute h-full',
          'md:relative md:block',
          { hidden: !isOpen && !isDesktop }
        )}
      >
        <div className='h-[80px] px-4 mb-8 flex items-start flex-col justify-center border-b border-b-white'>
          <h3 className='text-xl text-gray-400'>{title}</h3>
          <h3 className=''>Content</h3>
        </div>

        <ul className=''>{children}</ul>
      </div>
    </>
  );
};
