import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface LoadingProps {
  children?: React.ReactNode;
}

export const Loading = (props: LoadingProps): JSX.Element => (
  <div className='fixed top-0 bottom-0 left-0 right-0 z-10 flex flex-col items-center justify-center text-4xl'>
    <div className='flex flex-col items-center justify-center px-32 py-16 bg-blue-200 rounded-lg shadow-lg bg-opacity-90'>
      Loading
      <AiOutlineLoading3Quarters className='m-4 text-blue-400 animate-spin' />
    </div>
  </div>
);
