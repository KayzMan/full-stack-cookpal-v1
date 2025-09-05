export default async function handler(req, res) {
  const API_KEY = process.env.API_KEY

  if (!API_KEY) {
    return res.status(500).json({ error: 'API_KEY is not set.' })
  }

  try {
    const result = await fetch(
      `https://www.themealdb.com/api/json/${API_KEY}/list.php?c=list`,
    )
    if (!result.ok) {
      throw new Error('Failed to fetch data from TheMealDB API')
    }
    const data = await result?.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('API call failed:', error)
    return res.status(500).json({ error: 'Failed to retrieve categories.' })
  }
}
