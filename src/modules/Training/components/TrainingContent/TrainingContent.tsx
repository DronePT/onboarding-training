import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './TrainingContent.scss';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { funky } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TrainingContentProps {
  content: string;
}

export const TrainingContent = (props: TrainingContentProps): JSX.Element => {
  return (
    <div className='h-full pb-4 TrainingContent markdown'>
      <ReactMarkdown
        children={props.content}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => {
            const re = /(.*)(=([0-9]*)x([0-9]*))/i;
            const srcLink = String(node?.properties?.src || '');

            const exec = re.exec(srcLink) || [, srcLink, , , ,];

            const [, link, , width, height] = exec;

            return (
              <span className='flex items-center justify-center my-8'>
                <span className='shadow-lg border-[10px] border-white inline-block rounded-lg mx-auto'>
                  <img
                    {...props}
                    src={link}
                    alt={node.properties?.alt as string}
                    className='rounded-lg'
                    width={width || undefined}
                    height={height || undefined}
                  />
                </span>
              </span>
            );
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={funky as any}
                language={match[1]}
                PreTag='div'
                showLineNumbers
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};
