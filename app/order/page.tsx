"use client"

import useLocalStorageState from "use-local-storage-state"
import { Store } from "../types"
import Asteroid from "../Asteroid"

export default () => {
  const [store] = useLocalStorageState<Store>('Asteroids'),
  asts = store?.orderedAsts ?? [],
  astLists = asts.map(ast => <Asteroid key={ast.id} ast={ast} unit={store?.unit ?? 'kilometers'} setStore={() => {}} ordered/>)
  return <section>
    <h2>{asts.length ? 'Заказ отправлен!' : 'Нет заказов'}</h2>
    <ul>{astLists}</ul>
  </section>
}