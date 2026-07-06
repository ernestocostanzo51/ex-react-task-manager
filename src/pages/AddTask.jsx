import { useState, useRef } from "react"
import useTasks from "../context/useTasks"

export default function AddTask() {
    const { addTask } = useTasks()

    const [taskName, setTaskName] = useState("")
    const taskStatus = useRef(null)
    const taskDesc = useRef(null)

    const statusList = ["To do", "Doing", "Done"]
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~"

    const validitàNomeTask = (nome) => {
        if (nome.trim() === "") return false
        for (let i = 0; i < nome.length; i++) {
            if (symbols.includes(nome[i])) return false
        }
        return true
    }

    const isNomeValido = validitàNomeTask(taskName)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isNomeValido) return

        
        const nuovaTask = {
            title: taskName,
            status: taskStatus.current?.value || "",
            description: taskDesc.current?.value || ""
        }

        try {
          
            await addTask(nuovaTask)

          
            alert("Task creata con successo!")
            
            setTaskName("")
            if (taskStatus.current) taskStatus.current.value = ""
            if (taskDesc.current) taskDesc.current.value = ""
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
        <div className="container mt-4">
            <h1>da qui le task si aggiungono</h1>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <div className="col-6 mb-3">
                        <label className="form-label">Inserisci nome della task</label>
                        <input 
                            type="text"
                            placeholder="nome task"
                            className="form-control"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        {taskName.trim() !== "" && (
                            <span style={{ color: isNomeValido ? "green" : "red", display: "block", marginTop: "5px" }}>
                                {isNomeValido ? "Nome valido ✓" : "Nome non valido (contiene simboli) ✗"}
                            </span>
                        )}
                    </div>
                    
                    <div className="col-6 mb-3">
                        <label className="form-label">Inserisci stato della task</label>
                        <select className="form-select" ref={taskStatus}>
                            <option value="">seleziona</option>
                            {
                                statusList.map((task, index) => (
                                    <option key={index} value={task}>{task}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="col-12 mb-3">
                        <label className="form-label">Descrizione della task</label>
                        <textarea className="form-control" placeholder="Scrivi qui la descrizione..." ref={taskDesc} rows="3"></textarea>
                    </div>

                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" disabled={!isNomeValido}>Aggiungi Task</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}