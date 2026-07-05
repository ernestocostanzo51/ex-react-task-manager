import { createContext , useState, useEffect, use } from "react"
import { data } from "react-router-dom"

const {VITE_URL} = import.meta.env
export const GlobalContext = createContext()

export default function GlobalProvider({ children }){

    const [tasks , setTasks] = useState([])
    useEffect(() => {
        fetch(`${VITE_URL}/tasks`)
        .then(res => res.json())
        .then(data => {
            setTasks(data)
        })
        .catch(error => console.error(error)
        )
    } , [])

    return(
        <GlobalContext.Provider value={{tasks , setTasks}}>
            {children}
        </GlobalContext.Provider>
    )
}