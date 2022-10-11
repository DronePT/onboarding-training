import { useState } from 'react';
import { TrainingContent } from '../../components';

export const PreviewPage = (): JSX.Element => {
  const [content, setContent] = useState<string>('');

  return (
    <div>
      <div className=''>
        <textarea
          className='w-full h-96 bg-blue-100 border-b border-b-gray-300 rounded-md p-4'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='p-4'>
        <TrainingContent content={content} />
      </div>
    </div>
  );
};
