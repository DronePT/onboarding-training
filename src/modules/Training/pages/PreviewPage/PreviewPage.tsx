import { useState } from 'react';
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

export const PreviewPage = (): JSX.Element => {
  const [content, setContent] = useState<string>(getContentFromLocalStorage());

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
    saveContentToLocalStorage(event.target.value);
  };

  return (
    <div>
      <div className=''>
        <textarea
          className='w-full h-96 bg-blue-100 border-b border-b-gray-300 rounded-md p-4'
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <div className='p-4'>
        <TrainingContent content={content} />
      </div>
    </div>
  );
};
