
import useTasks  from "../context/useTasks";
import TaskRow from "../components/TaskRow"

export default function TaskList() {
    const { tasks } = useTasks();
    console.log(tasks)

    
    if (!tasks) return <div className="container mt-4">Caricamento in corso...</div>

    return (
        <>
        <div className="container mt-4">
            <h2 className="mb-4">Lista delle Tasks</h2>
            <div className="row">
              
                <table className="table table-striped table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th> 
                            <th scope="col">Nome</th>
                            <th scope="col">Stato</th>
                            <th scope="col">Data Creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map(task => (
                                <TaskRow key={task.id} task={task} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}