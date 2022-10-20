import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './TrainingContent.scss';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import {  as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { coldarkDark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import * as themes from 'react-syntax-highlighter/dist/esm/styles/prism';

interface TrainingContentProps {
  content: string;
}

const LOCAL_STORAGE_THEME_KEY = 'onboarding-theme';

const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

  return theme || 'materialDark';
};

export const TrainingContent = (props: TrainingContentProps): JSX.Element => {
  const [themeName, setThemeName] = useState(getThemeFromLocalStorage());

  const themesList = Object.keys(themes);
  const selectedTheme = (themes as any)[themeName];

  const handleSelectTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const theme = e.target.value;
    setThemeName(theme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
  };

  return (
    <div className='h-full pb-4 TrainingContent markdown'>
      <div className='flex justify-end items-center p-4 gap-2 border-b border-b-blue-100'>
        <span className='text-gray-400 text-sm uppercase leading-10'>
          Code highlight theme:{' '}
        </span>
        <select
          className='border border-blue-500 rounded-lg py-1 px-2'
          value={themeName}
          onChange={handleSelectTheme}
        >
          {themesList.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
      </div>
      <ReactMarkdown
        children={props.content}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => {
            const srcLink = String(node?.properties?.src || '');
            const re = /(.*)(=([0-9]*)x([0-9]*))/i;

            const exec = re.exec(srcLink) || [, srcLink, , , ,];

            const [, link, , width, height] = exec;

            if (srcLink.includes('=inline')) {
              return (
                <img
                  {...props}
                  src={link?.replaceAll('=inline', '')}
                  alt={node.properties?.alt as string}
                  width={width || undefined}
                  height={height || undefined}
                  className='inline'
                />
              );
            }

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
                style={selectedTheme}
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
