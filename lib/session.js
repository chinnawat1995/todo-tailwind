import { withIronSession } from "next-iron-session";

export default function withSession (handler) {
  return withIronSession(handler, {
    password: '0eGnS6FKEwzKMek9S2avSM5PMYJXKyxC',
    cookieName: 'http://localhost-my-to-do',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: false
    }
  });
}