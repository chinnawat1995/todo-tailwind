import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from '@/lib/axiosConfig'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { status, data } = await axios.post(`/user/login`, {
            password: credentials.password,
            email: credentials.email
          })

          data.user.accessToken = data.token

          return data.user
        } catch ({ response }) {
          const { data } = response

          throw new Error(data)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
      }

      return token
    },
    async session ({ session, token }) {
      session.accessToken = token.accessToken
      return session
    }
  },
  session: {
    jwt: true
  },
  secret: process.env.NEXT_AUTH_SECRET,
  jwt: {
    secret: process.env.NEXT_AUTH_JWT_SECRET,
    signingKey: process.env.NEXT_AUTH_JWT_SIGNING_PRIVATE_KEY,
    verificationOptions: {
      algorithms: ['HS512']
    },
    encryption: true,
    encryptionKey: process.env.NEXT_AUTH_JWT_ENCRYPTION_KEY,
    decryptionOptions: {
      algorithms: ['A256GCM']
    }
  }
})
