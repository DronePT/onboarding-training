import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './TrainingContent.scss';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { funky } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TrainingContentProps {
  children?: React.ReactNode;
}

const text = `## Installation

To install the \`React library\`, run the following command in your terminal:

\`\`\`bash
npm install react
\`\`\`

## Usage

To use the React library, import it in your JavaScript file:

\`\`\`jsx
import React from 'react';

function ComponentName(props) {
  return <div>{props.children}</div>;
}

function App(props) {
  return <ComponentName>Hello World!</ComponentName>;
}
\`\`\`

## Documentation

For more information, see the [React documentation](https://reactjs.org/docs/getting-started.html).

## Next steps

 ![Tux, the Linux mascot](http://media.slice.ca/imageserve/wp-content/uploads/sites/5/2014/12/04498df771a00d22e06d05eb4a259049/x.jpg=480x50)

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
| cum caraças | deste me ca uma dor |

* Lists
* [ ] todo
* [x] done`;

export const TrainingContent = (props: TrainingContentProps): JSX.Element => (
  <div className='TrainingContent markdown h-full pb-4'>
    <ReactMarkdown
      children={text}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[]}
      components={{
        img: ({ node, ...props }) => {
          const [link, dimensions] = (
            (node?.properties?.src || '') as string
          ).split('=');

          // const regex =
          //   /(\d+)(px|%|em|rem|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|q)?/g;
          const regex =
            /([0-9]{0,}(px|em|rem|%){0,})x([0-9]{0,}(px|em|rem|%){0,})/gi;

          const [width, height] = dimensions?.split('x') || [];

          return (
            <img
              {...props}
              src={link}
              alt={node.properties?.alt as string}
              className='mx-auto'
              width={width || undefined}
              height={height || undefined}
            />
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
