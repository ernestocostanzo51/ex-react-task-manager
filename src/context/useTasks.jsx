import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export default function useTasks() {
    
    const { tasks, setTasks } = useContext(GlobalContext);

    
    const addTask = (newDetailedTask) => {
        const newTask = {
            id: Date.now(), 
            title: newDetailedTask.title,
            description: newDetailedTask.description || "",
            status: "To do", 
            createdAt: new Date().toISOString() 
        };
        setTasks([...tasks, newTask]); 
    };

  
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