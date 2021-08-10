import { useState } from 'react';
import Main from '@/components/layout/Main';
import axios from 'axios';
import { useRouter } from 'next/router';
import withSession from '@/lib/session';
import handleAuthRedirect from '@/lib/handleAuthRedirect';

export default function Login() {
  const router = useRouter();

  const [error, setError] = useState('');
  const [loading, isLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { target } = event;

    try {
      await axios.post('/api/login', {
        email: target.email.value,
        password: target.password.value
      });

      router.push('/');
    } catch ({ response }) {
      setError(response.data.message);
    }
  };

  return (
    <>
      <Main>
        <div className="w-2/4 m-auto p-16 border-2 border-gray-50 shadow-md rounded-lg">
          {error && (
            <>
              <p className="bg-red-100 border-2 border-opacity-25 border-red-200 rounded-md p-2 mb-2 text-red-700 font-semibold">
                {error} <br />- Check your email or password.
              </p>
            </>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 w-full">
              <label className="mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Please enter your email."
                className="input is-valid"
              />
            </div>
            <div className="grid grid-cols-1 mt-4 w-full">
              <label className="mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="●●●●●●●●●●●●●●●●"
                className="input is-valid"
              />
            </div>
            <div className="grid gap-2 grid-cols-2 mt-5 w-full">
              <button
                type="submit"
                className="py-2 rounded-md text-white bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-800">
                Login
              </button>
              <button
                type="button"
                onClick={() => router.push('register')}
                className="py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700">
                Register
              </button>
            </div>
          </form>
        </div>
      </Main>
    </>
  );
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  return handleAuthRedirect(req, res);
});
