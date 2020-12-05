import * as React from 'react';
import './Loader.scss';
import Spinner from './Spinner';

interface LoaderProps {
  loadingText?: string;
}

const Loader = ({ loadingText }: LoaderProps) => {
  return (
    <div className="loader">
      <Spinner />
      {loadingText && loadingText}
      {!loadingText && <span>LOADING...</span>}
    </div>
  );
};

export default Loader;
