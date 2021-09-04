import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Head from 'next/head'

import Main from '@/components/layout/Main'
import withSession from '@/lib/session'
import handleAuthRedirect from '@/lib/handleAuthRedirect'

export default function Register() {
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required.'),
    email: Yup.string().required('Email is required.').email('Email is invalid.'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters.')
      .notOneOf(['password', '123456'], 'Your password is not secure.')
      .required('Password is required.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match.')
      .required('Confirm Password is required.')
  })

  const formOption = { resolver: yupResolver(validationSchema) }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm(formOption)

  const onSubmit = async (data) => {
    setLoading(true)
    await axios
      .post('/api/register', data)
      .then(() => {
        router.push('/')
      })
      .catch(({ response }) => {
        setLoading(false)
        setError(response.data.message)
      })
  }

  return (
    <>
      <Main>
        <Head>
          <title>Register</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="w-full md:w-3/4 lg:w-3/5 m-auto p-8 md:p-16 border-2 bg-white border-gray-50 shadow-md rounded-lg">
          {error && (
            <>
              <p className="bg-red-100 border-2 border-opacity-25 border-red-200 rounded-md p-2 mb-2 text-red-700 font-semibold">
                {error}
              </p>
            </>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 w-full space-y-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Please enter your name."
                className={`input ${errors.name?.message ? 'is-invalid' : 'is-valid'}`}
                {...register('name')}
              />
              <span className="text-red-500">{errors.name?.message}</span>
            </div>
            <div className="grid grid-cols-1 w-full space-y-2">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Please enter your email."
                className={`input ${errors.email?.message ? 'is-invalid' : 'is-valid'}`}
                {...register('email')}
              />
              <span className="text-red-500">{errors.email?.message}</span>
            </div>
            <div className="grid grid-cols-1 mt-4 w-full space-y-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="●●●●●●●●●●●●●●●●"
                className={`input ${errors.password?.message ? 'is-invalid' : 'is-valid'}`}
                {...register('password')}
              />
              <span className="text-red-500">{errors.password?.message}</span>
            </div>
            <div className="grid grid-cols-1 mt-4 w-full space-y-2">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="●●●●●●●●●●●●●●●●"
                className={`input ${errors.confirmPassword?.message ? 'is-invalid' : 'is-valid'}`}
                {...register('confirmPassword')}
              />
              <span className="text-red-500">{errors.confirmPassword?.message}</span>
            </div>
            <div className="grid gap-2 grid-cols-2 mt-5 w-full">
              <button
                type="submit"
                disabled={loading}
                className="py-2 rounded-md text-white bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 disabled:text-gray-800">
                Submit
              </button>
              <button
                onClick={() => router.push('login')}
                type="button"
                className="py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Main>
    </>
  )
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  return handleAuthRedirect(req, res)
})
