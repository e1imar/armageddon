"use client"

import useLocalStorageState from "use-local-storage-state"
import { useRouter } from "next/navigation"
import { num_word } from "./Asteroid"
import { Store } from "./types"
import css from './basket.module.css'

export default function Basket() {
  const [store] = useLocalStorageState<Store>('Asteroids'),
  quant = store?.orderedAsts?.length ?? 0,
  astWord = num_word(quant, ['астероид', 'астероида', 'астероидов']),
  router = useRouter()

  if (quant > 0) return <div className={css.basket}>
    <div>
      <h3 className={css.h}>Корзина</h3>
      <div>{quant} {astWord}</div>
    </div>
    <button type="button" onClick={() => router.push('/order')} className={css.button}>Отправить</button>
  </div>
}