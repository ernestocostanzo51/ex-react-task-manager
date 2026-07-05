import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
       
        <span className="navbar-brand fw-bold text-secondary">Esercitazione</span>

     
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

       
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto"> 
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Task List
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/addtask" className="nav-link">
                Add Task
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}