import withSession from '@/lib/session';

function user(req, res) {
  const user = req.session.get('user');

  res.status(200).send({
    ...user
  });
}

export default withSession(user);
