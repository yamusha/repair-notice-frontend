import cookie from 'cookie'
import { API_URL } from 'config/index'

export default async (req, res) => {
  // console.log(req.headers.cookie);
  const cookies = req.headers.cookie ? req.headers.cookie : ''
  // console.log(cookies);
  res.json({ data: cookies});
}
