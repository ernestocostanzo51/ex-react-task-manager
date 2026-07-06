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

  
    const removeTask = (id) => {
        const remainingTasks = tasks.filter(task => task.id !== id);
        setTasks(remainingTasks);
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