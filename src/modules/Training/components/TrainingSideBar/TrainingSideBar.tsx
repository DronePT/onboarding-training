import { TrainingSideBarItem } from '../TrainingSideBarItem';

interface TrainingSideBarProps {
  title?: string;
  children: ReturnType<typeof TrainingSideBarItem>[];
}

export const TrainingSideBar = ({
  title,
  children,
}: TrainingSideBarProps): JSX.Element => (
  <div className='bg-white flex-grow max-w-xs min-w-[300px]  shadow-lg z-10'>
    <div className='h-[80px] px-4 mb-8 flex items-start flex-col justify-center border-b border-b-white'>
      <h3 className='text-xl text-gray-400'>{title}</h3>
      <h3 className=''>Content</h3>
    </div>

    <ul className=''>{children}</ul>
  </div>
);
