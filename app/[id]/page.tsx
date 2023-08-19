import { round } from "../Asteroid"
import { Asteroid } from "../types"

const getData = async (id: string) => {
  const res = await fetch(`http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${process.env.API_KEY}`)
 
  if (!res.ok) throw new Error('Failed to fetch data')
 
  return res.json()
},
translate = (name: string) => {
  switch (name) {
    case 'Earth': return 'Земля'
    case 'Venus': return 'Венера'
    case 'Mars': return 'Марс'
    default:  return name
  }
}



export default async ({params}: {params: {id: string}}) => {
  const {name, close_approach_data, estimated_diameter, is_potentially_hazardous_asteroid}: Asteroid = await getData(params.id),
  relevantApproach = close_approach_data.filter(data => new Date(data.close_approach_date_full) > new Date),
  approachList = relevantApproach.map(app => <li key={app.close_approach_date_full}>
    <time dateTime={app.close_approach_date_full}>{app.close_approach_date}</time><br/>
    <div>{round(app.miss_distance.kilometers)} км</div>
    <div>Относительная скорость: {round(app.relative_velocity.kilometers_per_hour)} км/ч</div>
    <div>Орбитальное тело: {translate(app.orbiting_body)}</div>
  </li>)

  return <>
    <article>
      <h2>{name}</h2>
      <span>{round(estimated_diameter.meters.estimated_diameter_min)} м</span>
      {is_potentially_hazardous_asteroid && <span>опасен</span>}
    </article>
    <section>
      <h3>Сближения астероида</h3>
      <ul>{approachList}</ul>
    </section>
  </>
}