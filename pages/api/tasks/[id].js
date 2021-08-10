import withSession from '@/lib/session';
import axios from '@/lib/axiosConfig';

async function handle(req, res) {
  const user = req.session.get('user');

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      const { data, status } = await axios.delete(`/task/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      res.status(status).json(data);
    } catch (error) {
      const { status, data } = response;

      res.status(status).json({
        message: data
      });
    }
  } else {
    try {
      const { id } = req.query;

      const { data, status } = await axios.put(`/task/${id}`, req.body, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      res.status(status).json(data);
    } catch (error) {
      const { status, data } = response;

      res.status(status).json({
        message: data
      });
    }
  }
}

export default withSession(handle);
