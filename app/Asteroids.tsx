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
  const [store, setStore] = useLocalStorageState('Asteroids', {defaultValue: {
    asts: Object.values(data.near_earth_objects)[0],
    nextPage: data.links.next
  }}),
  [unit, setUnit] = useState<Unit>('kilometers'),
  astsUI = store.asts.map(ast => <li key={ast.id}><Asteroid {...ast} unit={unit} setStore={setStore}/></li>),
  fetchData = async () => {  
    try {
      const response = await fetch(store.nextPage)
      const data = await response.json()
  
      setStore(prev => ({
        asts: [...prev.asts, ...Object.values(data.near_earth_objects)[0] as AsteroidType[]],
        nextPage: data.links.next
      }))
    } catch (error) {console.log(error)}
  };

  return <>
    <h2>Ближайшие подлёты астероидов</h2>
    <button type="button" onClick={() => setUnit('kilometers')}>в километрах</button> | <button type="button" onClick={() => setUnit('lunar')}>в лунных орбитах</button>
    <Scroll
    dataLength={store.asts.length}
    next={fetchData}
    hasMore={!!store.nextPage}
    loader={<h4>Загрузка...</h4>}
    >
      <ul>{astsUI}</ul>
    </Scroll>
  </>
}