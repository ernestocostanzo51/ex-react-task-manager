import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
export default function TaskList(){

    const {tasks} = useContext(GlobalContext)
    console.log(tasks)
    return(
        <>
        <h1>qui verranno mostrate le task</h1>
        </>
    )
}