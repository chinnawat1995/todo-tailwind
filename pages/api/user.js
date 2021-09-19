import { getSession } from 'next-auth/react'

async function user(req, res) {
  const session = await getSession({ req })

  res.status(200).send({
    ...session?.user
  })
}

export default user
