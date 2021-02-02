import React, { useContext } from 'react';
import { App } from '../Providers/Context';

export const Page = ({ id, children }) => {
  const { loading } = useContext(App);

  return (
    <div id={id} className='page transition show'>
      {children}
    </div>
  );
};
// <PageSkeleton id={`${id}-sk`} className={loading ? 'sk-show' : 'sk-hide}'} />;
