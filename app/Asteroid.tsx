import { Asteroid, Unit } from "./types"
import Image from "next/image"

type Props = Asteroid & {
  unit: Unit
  orderable: boolean
}

const round = (val: number | string) => Math.round(Number(val)),
num_word = (value: number, words: string[]) => {
	value = Math.abs(value) % 100
	var num = value % 10
	if(value > 10 && value < 20) return words[2]
	if(num > 1 && num < 5) return words[1]
	if(num == 1) return words[0]
	return words[2]
}

export default ({unit, close_approach_data, name, estimated_diameter, orderable, is_potentially_hazardous_asteroid}: Props ) => {
  const {close_approach_date_full, miss_distance} = close_approach_data[0],
  renderedUnit = round(miss_distance[unit]),
  lunarWord = num_word(renderedUnit, ['лунная орбита', 'лунной орбиты', 'лунных орбит']),
  diameter = round(estimated_diameter.meters.estimated_diameter_min),
  imageSize = diameter < 100 ? {width: 22, height: 24} : {width: 37, height: 40}

  return <article>
    <div>
      <time dateTime={close_approach_date_full}>{close_approach_date_full}</time><br/>
      <span>{renderedUnit} {unit === 'lunar' ? lunarWord : 'км'}</span><br/>
      <Image src='/pngegg 1.svg' alt="asteroid" {...imageSize}/>
      <span>{name}</span><br/>
      <span>{diameter} м</span>
    </div>
    {orderable && <button type="button">заказать</button>}
    {is_potentially_hazardous_asteroid && <span>опасен</span>}
  </article>
}