import { TrainingSideBarItem } from '../TrainingSideBarItem';

interface TrainingSideBarProps {
  items: TrainingSideBarItem[];
}

export interface TrainingSideBarItem {
  isDone?: boolean;
  isCurrent?: boolean;
  onClick?: () => void;
  text?: string | React.ReactNode;
}

export const TrainingSideBar = ({
  items,
}: TrainingSideBarProps): JSX.Element => (
  <div className='bg-white flex-grow max-w-xs min-w-[300px]'>
    <h3 className='p-4'>Content</h3>

    <ul className=''>
      {items.map((item, index) => (
        <TrainingSideBarItem
          key={index}
          isDone={item.isDone}
          isCurrent={item.isCurrent}
          onClick={item.onClick}
        >
          {item.text}
        </TrainingSideBarItem>
      ))}
    </ul>
  </div>
);
