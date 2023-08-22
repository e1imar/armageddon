"use client"

import { Asteroid as AsteroidType, Data, Store, Unit } from "./types"
import Asteroid from "./Asteroid"
import Scroll from "react-infinite-scroll-component"
import useLocalStorageState from "use-local-storage-state"
import { useState } from "react"
import css from './asteroids.module.css'

type Props = {
  data: Data
}

export default ({data}: Props) => {
  const [asts, setAsts] = useState(Object.values(data.near_earth_objects)[0]),
  [store, setStore] = useLocalStorageState<Store>('Asteroids', {defaultValue: {
    orderedAsts: [],
    unit: 'kilometers' as Unit
  }}),
  [nextPage, setNextPage] = useState(data.links.next),
  astsList = asts.map(ast => {
    const ordered = store.orderedAsts?.some(orderedAst => ast.id === orderedAst.id)
    return <li key={ast.id} className={css.list}>
      <Asteroid ast={ast} unit={store.unit} setStore={setStore} ordered={ordered}/>
    </li>
  }),
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
    <button type="button"
    onClick={() => setStore(prev => ({...prev, unit: 'kilometers'}))}
    className={`${store.unit !== 'kilometers' && css.NotSelected}`}
    >в километрах</button> | <button type="button"
    onClick={() => setStore(prev => ({...prev, unit: 'lunar'}))}
    className={`${store.unit !== 'lunar' && css.NotSelected}`}>в лунных орбитах</button>
    <Scroll
    dataLength={asts.length}
    next={fetchData}
    hasMore={!!nextPage}
    loader={<h4>Загрузка...</h4>}
    >
      <ul className={css.lists}>{astsList}</ul>
    </Scroll>
  </>
}