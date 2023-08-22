import Link from "next/link"
import { Asteroid, Store, Unit } from "./types"
import Image from "next/image"
import css from './asteroid.module.css'

type Props = {
  ast: Asteroid
  unit: Unit
  setStore: React.Dispatch<React.SetStateAction<Store>>
  ordered: boolean
}

export const round = (val: number | string) => Math.round(Number(val)),
num_word = (value: number, words: string[]) => {
	value = Math.abs(value) % 100
	var num = value % 10
	if(value > 10 && value < 20) return words[2]
	if(num > 1 && num < 5) return words[1]
	if(num == 1) return words[0]
	return words[2]
}

export default ({unit, setStore, ast, ordered}: Props ) => {
  const {id, close_approach_data, name, estimated_diameter, is_potentially_hazardous_asteroid} = ast,
  {close_approach_date, miss_distance} = close_approach_data[0],
  renderedUnit = round(miss_distance[unit]),
  lunarWord = num_word(renderedUnit, ['лунная орбита', 'лунной орбиты', 'лунных орбит']),
  diameter = round(estimated_diameter.meters.estimated_diameter_min),
  imageSize = diameter < 100 ? {width: 22, height: 24} : {width: 37, height: 40},
  reserve = (e: React.MouseEvent) => {
    e.preventDefault()
    setStore(prev => prev.orderedAsts?.length ?  {...prev, orderedAsts: [...prev.orderedAsts, ast]} : {...prev, orderedAsts: [ast]})
  }

  return <Link href={id} className={css.asteroid}>
    <article>
      <div>
        <time dateTime={close_approach_date} className={css.time}>{close_approach_date}</time>
        <span className={css.distance}>{renderedUnit} {unit === 'lunar' ? lunarWord : 'км'}</span>
        <Image src='/pngegg 1.svg' alt="asteroid" {...imageSize} className={css.img}/>
        <span className={css.nameCont}>
          <span className={css.name}>{name}</span>
          <span className={css.size}>Ø {diameter} м</span>
        </span>
      </div>
      {ordered ? <span className={`${css.reserve} ${css.inBasket}`}>в корзине</span> : <button type="button" onClick={reserve} className={css.reserve}>заказать</button>}
      {is_potentially_hazardous_asteroid && <span className={css.hazard}>Опасен</span>}
    </article>
  </Link>
}