import { FC } from 'react';

interface PreLoaderProps {
  text?: string;
  screenSize?: boolean;
}

export const PreLoader: FC<PreLoaderProps> = ({
  text,
  screenSize = true,
}) => {
  if (screenSize) {
    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <button className="btn loading">{text ?? 'loading'}</button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <button className="btn loading">{text ?? 'loading'}</button>
      </div>
    )
  }
};
