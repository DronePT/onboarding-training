import { TrainingSideBarItem } from '../TrainingSideBarItem';

interface TrainingSideBarProps {
  children: ReturnType<typeof TrainingSideBarItem>[];
}

export const TrainingSideBar = ({
  children,
}: TrainingSideBarProps): JSX.Element => (
  <div className='bg-white flex-grow max-w-xs min-w-[300px]'>
    <h3 className='p-4'>Content</h3>

    <ul className=''>{children}</ul>
  </div>
);
