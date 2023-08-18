"use client"

import { useState } from "react"
import { Asteroid as AsteroidType, Data, Unit } from "./types"
import Asteroid from "./Asteroid"
import Scroll from "react-infinite-scroll-component"
import useLocalStorageState from "use-local-storage-state"

type Props = {
  data: Data
}

export default ({data}: Props) => {
  const [asts, setAsts] = useLocalStorageState('Asteroids', {defaultValue: Object.values(data.near_earth_objects)[0]}),
  [unit, setUnit] = useState<Unit>('kilometers'),
  astsUI = asts.map(ast => <li key={ast.id}><Asteroid {...ast} unit={unit} setAsts={setAsts}/></li>),
  [nextPage, setNextPage] = useState(data.links.next),
  fetchData = async () => {  
    try {
      const response = await fetch(nextPage)
      const data = await response.json()
  
      setAsts(prev => [...prev, ...Object.values(data.near_earth_objects)[0] as AsteroidType[]])
      setNextPage(data.links.next)
    } catch (error) {console.log(error)}
  };

  return <>
    <h2>Ближайшие подлёты астероидов</h2>
    <button type="button" onClick={() => setUnit('kilometers')}>в километрах</button> | <button type="button" onClick={() => setUnit('lunar')}>в лунных орбитах</button>
    <Scroll
    dataLength={asts.length}
    next={fetchData}
    hasMore={!!nextPage}
    loader={<h4>Загрузка...</h4>}
    >
      <ul>{astsUI}</ul>
    </Scroll>
  </>
}