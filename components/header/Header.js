import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import useUser from '@/lib/useUser';
import axios from 'axios';

const Header = () => {
  const router = useRouter();

  const { data } = useUser({ redirectTo: '' });

  const displayForm = () => {
    let display = '';

    if (!data) {
      display = loading();
    } else if (Object.keys(data).length) {
      display = loggedForm();
    } else {
      display = loginForm();
    }

    return display;
  };

  const loginForm = () => {
    return (
      <>
        <button
          onClick={() => router.push('login')}
          className="px-3 bg-blue-500 hover:bg-blue-600 text-white h-full mr-1 rounded-lg"
          type="button">
          Login
        </button>
        <button
          onClick={() => router.push('register')}
          className="px-3 bg-gray-500 hover:bg-gray-600 text-white h-full rounded-lg"
          type="button">
          Register
        </button>
      </>
    );
  };

  const loggedForm = () => {
    return (
      <>
        <p className="inline-flex items-center px-3 bg-gray-100 border-2 border-green-500 text-black h-full mr-1 rounded-lg">
          {data.name}
        </p>
        <button
          className="px-3 bg-gray-500 hover:bg-gray-600 text-white h-full rounded-lg"
          onClick={handleLogout}
          type="button">
          Logout
        </button>
      </>
    );
  };

  const loading = () => {
    return <Loader type="ThreeDots" color="#8adb53" height={30} width={30} timeout={0} />;
  };

  const handleLogout = async () => {
    await axios.post('/api/logout');

    router.reload(window.location.pathname);
  };

  return (
    <nav className="w-full flex px-4 py-2 border-b-2 border-gray-300 shadow-md">
      <div onClick={() => router.push('/')} className="inline-flex items-center cursor-pointer">
        <img className="w-10 mr-2" src="/images/check.png" alt="" />
        <span className="font-bold text-lg">Todo</span>
      </div>
      <div className="inline-flex items-center ml-auto">{displayForm()}</div>
    </nav>
  );
};

export default Header;
