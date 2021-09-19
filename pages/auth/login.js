import { useState } from 'react'
import Main from '@/components/layout/Main'
import { useRouter } from 'next/router'
import { getSession, signIn } from 'next-auth/react'

export default function Login(props) {
  const router = useRouter()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    const { target } = event

    const { error } = await signIn('credentials', {
      email: target.email.value,
      password: target.password.value,
      callbackUrl: `${window.location.origin}`,
      redirect: false
    })

    if (error) {
      setLoading(false)
      setError(error)
    } else {
      router.push('/')
    }
  }

  return (
    <>
      <Main>
        <div className="w-full md:w-3/4 lg:w-3/5 m-auto p-8 md:p-16 border-2 bg-white border-gray-50 shadow-md rounded-lg">
          {error && (
            <>
              <p className="bg-red-100 border-2 border-opacity-25 border-red-200 rounded-md p-2 mb-2 text-red-700 font-semibold">
                {error} <br />- Check your email or password.
              </p>
            </>
          )}
          <form onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={props.csrfToken} />
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
                disabled={loading}
                className="py-2 rounded-md text-white bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-800">
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
  )
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  let response = {
    props: {}
  }

  if (session) {
    response = {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return response
}
