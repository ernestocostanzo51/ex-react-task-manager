import { createContext, useState, useEffect } from "react"

const { VITE_URL } = import.meta.env
export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`${VITE_URL}/tasks`)
            .then(res => res.json())
            .then(data => {
                setTasks(data)
            })
            .catch(error => console.error(error))
    }, [])

   
const fetchTaskById = async (id) => {
  try {
    
    const response = await fetch(`http://localhost:3001/tasks/${id}`);
    
    if (!response.ok) {
      throw new Error("Task non trovata sul server");
    }
    
    const data = await response.json();
    setCurrentTask(data);
  } catch (error) {
    console.error("Errore nel recupero della task:", error);
    throw error; 
  }
};

    const getTaskById = (id) => {
        return tasks.find(task => task.id == id)
    }

    return (
        <GlobalContext.Provider value={{ tasks, setTasks, getTaskById, fetchTaskById }}>
            {children}
        </GlobalContext.Provider>
    )
}