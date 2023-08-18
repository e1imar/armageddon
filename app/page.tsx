import Asteroids from "./Asteroids"
import Basket from "./Basket"

const date = new Date().toISOString().split('T')[0]

async function getData() {
  const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&detailed=false&api_key=${process.env.API_KEY}`)
 
  if (!res.ok) throw new Error('Failed to fetch data')
 
  return res.json()
}

export default async () => {
  const data = await getData()

  return <>
    <Asteroids data={data}/>
    <Basket/>
  </>
}