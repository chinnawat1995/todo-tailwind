import withSession from '@/lib/session';

async function logout (req, res) {
  req.session.destroy();
  res.status(200).json({ message: 'Log out success' });
}

export default withSession(logout)