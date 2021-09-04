import { Fragment } from 'react';

import Header from '@/components/header/Header'

const Main = ({ children }) => {
  return (
    <Fragment>
      <div className="w-full h-screen bg-gradient-to-b from-pink-600 to-indigo-800">
        <Header />

        <h1 className="text-center py-10 text-5xl text-white">TODO LIST</h1>
        <div className="w-11/12 md:w-3/4 lg:w-3/5 xl:w-2/4 m-auto px-2">{children}</div>
      </div>
    </Fragment>
  );
};

export default Main;
