import { round } from "../Asteroid"
import { Asteroid } from "../types"

async function getData(id: string) {
  const res = await fetch(`http://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${process.env.API_KEY}`)
 
  if (!res.ok) throw new Error('Failed to fetch data')
 
  return res.json()
}

export default async ({params}: {params: {id: string}}) => {
  const {name, close_approach_data, estimated_diameter, is_potentially_hazardous_asteroid}: Asteroid = await getData(params.id),
  relevantApproach = close_approach_data.filter(data => new Date(data.close_approach_date) > new Date),
  approachList = relevantApproach.map(app => <li key={app.close_approach_date_full}>
    <time dateTime={app.close_approach_date_full}>{app.close_approach_date_full}</time><br/>
    <div>{round(app.miss_distance.kilometers)} км</div>
    <div>Относительная скорость: {round(app.relative_velocity.kilometers_per_hour)} км/ч</div>
    <div>Орбитальное тело: {app.orbiting_body}</div>
  </li>)

  return <>
    <h2>{name}</h2>
    <span>{round(estimated_diameter.meters.estimated_diameter_min)} м</span>
    {is_potentially_hazardous_asteroid && <span>опасен</span>}
    <ul>{approachList}</ul>
  </>
}