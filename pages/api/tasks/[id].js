import withSession from '@/lib/session'
import axios from '@/lib/axiosConfig'
import { getSession } from 'next-auth/react'

async function handle(req, res) {
  const session = await getSession({ req })

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query

      const { data, status } = await axios.delete(`/task/${id}`, {
        headers: { Authorization: `Bearer ${session?.accessToken}` }
      })

      res.status(status).json(data)
    } catch (error) {
      const { status, data } = response

      res.status(status).json({
        message: data
      })
    }
  } else {
    try {
      const { id } = req.query

      const { data, status } = await axios.put(`/task/${id}`, req.body, {
        headers: { Authorization: `Bearer ${session?.accessToken}` }
      })

      res.status(status).json(data)
    } catch (error) {
      const { status, data } = response

      res.status(status).json({
        message: data
      })
    }
  }
}

export default withSession(handle)
