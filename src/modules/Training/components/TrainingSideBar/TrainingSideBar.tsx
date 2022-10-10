import { TrainingSideBarItem } from '../TrainingSideBarItem';

interface TrainingSideBarProps {
  title?: string;
  children: ReturnType<typeof TrainingSideBarItem>[];
}

export const TrainingSideBar = ({
  title,
  children,
}: TrainingSideBarProps): JSX.Element => (
  <div className='bg-white flex-grow max-w-xs min-w-[300px]'>
    <h3 className='px-4 pt-4 text-xl text-gray-400'>{title}</h3>
    <h3 className='px-4 pb-4'>Content</h3>

    <ul className=''>{children}</ul>
  </div>
);
