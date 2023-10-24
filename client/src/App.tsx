import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<any>(undefined)
  const [fetchData, setFetchData] = useState<boolean>(false)

  useEffect(() => {
    fetch('/app/')
      .then(res => res.json())
      .then(data => setData(data))
  }, [fetchData])

  return (
    <main>
      <h1>Hello World</h1>
      <form action="/app/" method='POST'>
        <label htmlFor="text">Add todo</label>
        <input type="text" name='text' />
        <button type='submit' onClick={() => setFetchData(prev => !prev)}>submit</button>
      </form>
      {data && data.todos.map((i: any, k: any) => {
        return (<p key={k} >{i.text}</p>)
      })}
    </main>
  )
}

export default App
