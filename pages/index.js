import Head from 'next/head';
import useSWR from 'swr';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import Main from '@/components/layout/Main';
import withSession from '@/lib/session';
import TodoList from '@/components/todo-list/TodoList';
import NotFound from '@/components/not-found/NotFound';

export default function Home(props) {
  const fetchTasks = async (url) => {
    const { data } = await axios.get(url);

    return data;
  };

  const {
    data: tasks,
    isValidating,
    mutate: reloading
  } = useSWR(['/api/tasks', props.user?.token], fetchTasks, { revalidateOnFocus: false });

  const submitTask = async (event) => {
    event.preventDefault();

    const { target } = event;

    if (target.task.value) {
      await axios.post('/api/tasks', {
        description: target.task.value
      });

      reloading();

      target.task.value = '';
    }
  };

  const handleLoading = () => {
    if ((!tasks || isValidating) && props.user) {
      return (
        <div className="w-14 m-auto">
          <Loader type="ThreeDots" color="#60a5fa" height={30} width={50} timeout={0} />
        </div>
      );
    } else {
      return tasks?.length ? <TodoList tasks={tasks} reloading={reloading} /> : <NotFound />;
    }
  };

  return (
    <>
      <Head>
        <title>Todo with TailWindCss</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <section className="mb-5">
          <form className="grid grid-cols-4 gap-4" onSubmit={submitTask}>
            <input
              type="text"
              id="task"
              placeholder="Please enter your task."
              className="input col-span-3 shadow-none border-b-2 rounded-none focus:outline-none"
            />
            <button
              type="submit"
              className="col-span-1 font-bold text-white bg-blue-400 rounded-md hover:bg-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 m-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </form>
        </section>
        <section className="space-y-2">{handleLoading()}</section>
      </Main>
    </>
  );
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  return {
    props: {
      user: req.session.get('user') ? req.session.get('user') : ''
    }
  };
});
