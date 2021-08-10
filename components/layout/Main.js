import { Fragment } from 'react';

import Header from '@/components/header/Header'

const Main = ({ children }) => {
  return (
    <Fragment>
      <div className="w-full h-screen bg-gray-100">
        <Header />

        <div className="lg:w-2/4 lg:px-0 mt-8 m-auto sm:w-full px-2">{children}</div>
      </div>
    </Fragment>
  );
};

export default Main;
