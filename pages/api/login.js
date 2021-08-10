import axios from '@/lib/axiosConfig';
import withSession from '@/lib/session';

async function login(req, res) {
  try {
    const { status, data } = await axios.post(`/user/login`, req.body);
    data.user.token = data.token;
    req.session.set('user', data.user);

    await req.session.save();
    res.status(status).json(data);
  } catch ({ response }) {
    const { status, data } = response;

    res.status(status).json({
      message: data
    });
  }
}

export default withSession(login);
