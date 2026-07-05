import { memo } from "react";
 function TaskRow({ task }) {
    return (
        <tr>
            <th scope="row">{task.id}</th>
            <td>
               
                <strong>{task.title}</strong>
            </td>
            <td>
               
                <span className={`badge ${
                   task.status === 'Done' ? 'bg-success' :
                   task.status === 'To do' ? 'bg-danger' : 'bg-warning'
                }`}>
                    {task.status}
                </span>
            </td>
            <td>
                {new Date(task.createdAt).toLocaleDateString('it-IT')}
            </td>
        </tr>
    );
    
}export default memo(TaskRow)