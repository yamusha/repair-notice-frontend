import schools from './optschools.json'

async function getSchools(req, res) {
  if (req.method === "GET") {
    // Try to verify token with firebase admin
    res.status(200).json(schools)
  }
}

export default getSchools