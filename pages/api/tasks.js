import withSession from '@/lib/session';
import axios from '@/lib/axiosConfig';

async function tasks(req, res) {
  const user = req.session.get('user');

  if (req.method === 'POST') {
    try {
      const { data, status } = await axios.post('/task', req.body, {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      res.status(status).json(data);
    } catch ({ response }) {
      const { status, data } = response;

      res.status(status).json({
        message: data
      });
    }
  } else {
    try {
      const { data, status } = await axios.get('/task', {
        headers: { Authorization: `Bearer ${user?.token}` }
      });

      res.status(status).json(data.data);
    } catch ({ response }) {
      const { status, data } = response;

      res.status(status).json({
        message: data
      });
    }
  }
}

export default withSession(tasks);
