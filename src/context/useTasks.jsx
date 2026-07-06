import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export default function useTasks() {
    
    const { tasks, setTasks } = useContext(GlobalContext);

    
   const addTask = async (taskData) => {
        try {
            const response = await fetch("http://localhost:3001/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: taskData.title,
                    description: taskData.description,
                    status: taskData.status
                })
            })

            const data = await response.json()

            if (data.success) {
                
                setTasks((prevTasks) => [...prevTasks, data.task])
                return data
            } else {
                
                throw new Error(data.message)
            }
        } catch (error) {
            
            throw error
        }
    }

  
    const removeTask = async (id) => {
  if (!id) {
    throw new Error("ID della task mancante o non valido.");
  }
  try {
    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id != id));
      return { success: true };
    } else {
      throw new Error("Task non trovato o errore sul server.");
    }

  } catch (error) {
    console.error("Errore rilevato nel frontend:", error.message);
    
    throw error;
  }
};

    
    const updateTask = (id, newStatus) => {
        const updatedTasks = tasks.map(task => 
            task.id === id ? { ...task, status: newStatus } : task
        );
        setTasks(updatedTasks);
    };

    
    return {
        tasks,
        addTask,
        removeTask,
        updateTask
    };
}