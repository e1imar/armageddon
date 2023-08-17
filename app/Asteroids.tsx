"use client"

import { use, useState } from "react"
import { Data, Unit } from "./types"
import Asteroid from "./Asteroid"

type Props = {
  data: Data
}

export default ({data}: Props) => {
  const [asts, setAsts] = useState(Object.values(data.near_earth_objects)[0]),
  [unit, setUnit] = useState<Unit>('kilometers'),
  astsUI = asts.map(ast => <li key={ast.id}><Asteroid {...ast} unit={unit} orderable/></li>)

  return <>
    <h2>Ближайшие подлёты астероидов</h2>
    <button type="button" onClick={() => setUnit('kilometers')}>в километрах</button> | <button type="button" onClick={() => setUnit('lunar')}>в лунных орбитах</button>
    <ul>{astsUI}</ul>
  </>
}