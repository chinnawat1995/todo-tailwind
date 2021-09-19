import { useRouter } from 'next/router'
import Loader from 'react-loader-spinner'
import useUser from '@/lib/useUser'
import { signOut } from 'next-auth/react'

const Header = () => {
  const router = useRouter()

  const { data } = useUser({ redirectTo: '' })

  const displayForm = () => {
    let display = ''

    if (!data) {
      display = loading()
    } else if (Object.keys(data).length) {
      display = loggedForm()
    } else {
      display = ''
    }

    return display
  }

  const loggedForm = () => {
    return (
      <>
        <p className="inline-flex items-center px-3 py-1 bg-white text-black h-full mr-1 rounded-sm">
          {data.name}
        </p>
        <button
          className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white h-full rounded-sm"
          onClick={handleLogout}
          type="button">
          Logout
        </button>
      </>
    )
  }

  const loading = () => {
    return <Loader type="ThreeDots" color="#8adb53" height={30} width={30} timeout={0} />
  }

  const handleLogout = async () => {
    await signOut();

    router.push('auth/login')
  }

  return (
    <nav className="w-full flex px-4 py-2">
      <div className="inline-flex items-center ml-auto">{displayForm()}</div>
    </nav>
  )
}

export default Header
