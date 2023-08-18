"use client"

import useLocalStorageState from "use-local-storage-state"
import { Store } from "../types"
import Asteroid from "../Asteroid"

export default () => {
  const [store] = useLocalStorageState<Store>('Asteroids'),
  asts = store?.asts.filter(ast => ast.ordered) ?? [],
  astsUI = asts.map(ast => <li key={ast.id}><Asteroid {...ast} unit={store?.unit ?? 'kilometers'} setStore={() => {}}/></li>)
  return <>
    <h2>{asts.length ? 'Заказ отправлен!' : 'Нет заказов'}</h2>
    <ul>{astsUI}</ul>
  </>
}