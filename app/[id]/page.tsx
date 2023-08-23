import { round } from "../Asteroid"
import { Asteroid } from "../types"
import astCSS from '../asteroid.module.css'
import pageCSS from './style.module.css'

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

  approachList = close_approach_data.map(app => <li key={app.close_approach_date_full} className={pageCSS.approach}>
    <time dateTime={app.close_approach_date_full} className={pageCSS.time}>{app.close_approach_date}</time>
    <div className={astCSS.distance}>{round(app.miss_distance.kilometers)} км</div>
    <div>Относительная скорость: {round(app.relative_velocity.kilometers_per_hour)} км/ч</div>
    <div>Орбитальное тело: {translate(app.orbiting_body)}</div>
  </li>)

  return <div>
    <article className={pageCSS.asteroid}>
      <h2>{name}</h2>
      <span  className={astCSS.size}>Ø {round(estimated_diameter.meters.estimated_diameter_min)} м</span>
      {is_potentially_hazardous_asteroid && <span className={astCSS.hazard}>опасен</span>}
    </article>
    <section>
      <h3 className={pageCSS.h3}>Сближения астероида</h3>
      <ul>{approachList}</ul>
    </section>
  </div>
}