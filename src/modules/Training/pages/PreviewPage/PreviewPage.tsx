import React, { useCallback, useRef, useState } from 'react';
import { TrainingContent } from '../../components';

const getContentFromLocalStorage = () => {
  const content = localStorage.getItem('trainingContent');
  if (content) {
    return content;
  }
  return '';
};

const saveContentToLocalStorage = (content: string) => {
  localStorage.setItem('trainingContent', content);
};

function useDebounceState<T>(initialValue: T, delay: number) {
  const [value, setValue] = useState<T>(initialValue);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const setDebounceValue = useCallback((newValue: T) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setValue(newValue);
    }, delay);
  }, []);

  return [value, setDebounceValue as (newValue: T) => void] as const;
}

export const PreviewPage = (): JSX.Element => {
  const [content, setContent] = useDebounceState(
    getContentFromLocalStorage(),
    500
  );

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // console.log('event', event);
    setContent(event.target.value);
    saveContentToLocalStorage(event.target.value);
  };

  return (
    <div className='pt-96 relative'>
      <div className='fixed h-96 left-0 right-0 top-0 shadow-lg p-0 z-50'>
        <textarea
          className='w-full h-96 bg-blue-100 border-b border-b-gray-300 p-4 m-0'
          defaultValue={getContentFromLocalStorage()}
          onChange={handleContentChange}
        />
      </div>
      <div className='p-4'>
        <TrainingContent content={content} />
      </div>
    </div>
  );
};
