export default function loginCheck(req, res) {
  const user = req.session.get('user');

  let response = {
    props: {}
  };

  if (user) {
    response = {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  return response;
}
