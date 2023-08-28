"use client"

import { Asteroid as AsteroidType, Data, Store, Unit } from "./types"
import Asteroid from "./Asteroid"
import useLocalStorageState from "use-local-storage-state"
import { useState } from "react"
import css from './asteroids.module.css'
import useInfiniteScroll from 'react-infinite-scroll-hook'

type Props = {
  data: Data
}

export default function Asteroids({data}: Props) {
  const [asts, setAsts] = useState(Object.values(data.near_earth_objects)[0]),
  [loading, setLoading] = useState(false),
  [store, setStore] = useLocalStorageState<Store>('Asteroids', {defaultValue: {
    orderedAsts: [],
    unit: 'kilometers' as Unit
  }}),
  [nextPage, setNextPage] = useState(data.links.next),
  astsList = asts.map(ast => {
    const ordered = store.orderedAsts?.some(orderedAst => ast.id === orderedAst.id)
    return <Asteroid key={ast.id} ast={ast} unit={store.unit} setStore={setStore} ordered={ordered}/>
  }),
  fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(nextPage)
      const data = await response.json()

      setLoading(false)
      setAsts(prev => [...prev, ...Object.values(data.near_earth_objects)[0] as AsteroidType[]])
      setNextPage(data.links.next)
    } catch (error) {console.log(error)}
  },
  [sentryRef] = useInfiniteScroll({
    hasNextPage: !!nextPage,
    loading,
    onLoadMore: fetchData,
    rootMargin: '0px 0px 600px 0px'
  })

  return <section>
    <h2>Ближайшие подлёты астероидов</h2>
    <button type="button"
    onClick={() => setStore(prev => ({...prev, unit: 'kilometers'}))}
    className={`${store.unit !== 'kilometers' && css.NotSelected}`}
    >в километрах</button> | <button type="button"
    onClick={() => setStore(prev => ({...prev, unit: 'lunar'}))}
    className={`${store.unit !== 'lunar' && css.NotSelected}`}>в лунных орбитах</button>
    <ul className="astList">
      {astsList}
    </ul>
    {(loading || !!nextPage) && <div className={`loader ${css.loading}`} key={0} ref={sentryRef}></div>}
  </section>
}