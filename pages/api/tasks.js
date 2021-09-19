import withSession from '@/lib/session'
import axios from '@/lib/axiosConfig'
import { getSession } from 'next-auth/react'

async function tasks(req, res) {
  const session = await getSession({ req })

  if (req.method === 'POST') {
    try {
      const { data, status } = await axios.post('/task', req.body, {
        headers: { Authorization: `Bearer ${session?.accessToken}` }
      })

      res.status(status).json(data)
    } catch ({ response }) {
      const { status, data } = response

      res.status(status).json({
        message: data
      })
    }
  } else {
    try {
      const { data, status } = await axios.get('/task', {
        headers: { Authorization: `Bearer ${session?.accessToken}` }
      })

      res.status(status).json(data.data)
    } catch ({ response }) {
      const { status, data } = response

      res.status(status).json({
        message: data
      })
    }
  }
}

export default withSession(tasks)
