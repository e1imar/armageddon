"use client"

import useLocalStorageState from "use-local-storage-state"
import { useRouter } from "next/navigation"
import { num_word } from "./Asteroid"

export default () => {
  const [store] = useLocalStorageState('Asteroids'),
  quant = store.asts.filter(ast => ast.ordered).length,
  astWord = num_word(quant, ['астероид', 'астероида', 'астероидов']),
  router = useRouter()

  if (quant > 0) return <div>
    <div>
      <h3>Корзина</h3>
      <div>{quant} {astWord}</div>
    </div>
    <button type="button" onClick={() => router.push('/basket')}>Отправить</button>
  </div>
}