import Asteroids from "./Asteroids"

async function getData() {
  const date = new Date().toISOString().split('T')[0]
  // const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${process.env.API_KEY}`)
  const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&detailed=false&api_key=${process.env.API_KEY}`)
 
  if (!res.ok) throw new Error('Failed to fetch data')
 
  return res.json()
}

export default async () => {
  const data = await getData()

  return <>
    <header>
      <h1>armageddon 2023</h1>
      <p>ООО "Команда им. Б. Уиллиса".</p>
      <p>Взрываем астериоды с 1998 года.</p>
    </header>
    <main>
      <Asteroids data={data}/>
    </main>
    <footer>© Все права и планета защищены</footer>
  </>
}