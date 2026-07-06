import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useTasks from '../context/useTasks'

function TaskDetail() {
  const { id } = useParams(); 
  
 
  const { tasks } = useContext(GlobalContext);

  const { removeTask } = useTasks();

  
  const currentTask = tasks ? tasks.find(task => task.id == id) : null;

  
  const handleRemoveClick = async () => {
    const conferma = window.confirm("Sei sicuro di voler eliminare questa task?");
    
    if (conferma) {
      try {
       
    
        await removeTask(Number(id));
        
        alert("Task eliminata con successo!");
        navigate('/'); 
        
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  if (!tasks || tasks.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Caricamento in corso...</span>
        </div>
        <p className="mt-2 text-muted">Caricamento dei dati...</p>
      </div>
    );
  }

  
  if (!currentTask) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning role=alert">
          <h4 className="alert-heading">⚠️ Task non trovata</h4>
          <p>La task richiesta con ID <strong>{id}</strong> non esiste nel database.</p>
          <hr />
          <Link to="/" className="btn btn-outline-warning btn-sm">
            Torna alla lista delle task
          </Link>
        </div>
      </div>
    );
  }

  
  const dataCreazione = currentTask.createdAt 
    ? new Date(currentTask.createdAt).toLocaleString('it-IT') 
    : 'Data non disponibile';

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          
          
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Dettaglio Task</h5>
              <span className="badge bg-secondary">ID: {currentTask.id}</span>
            </div>
            
            <div className="card-body">
              <h3 className="card-title text-secondary mb-3">{currentTask.title}</h3>
              
              <p className="card-text">
                <strong>Descrizione:</strong><br />
                <span className="text-muted">{currentTask.description || 'Nessuna descrizione fornita.'}</span>
              </p>

              <div className="mb-3">
                <strong className="me-2">Stato:</strong>
              <span className={`badge ${
                  currentTask.status === 'Done' ? 'bg-success' :
                  currentTask.status === 'To do' ? 'bg-danger' : 'bg-warning'
                }`}>
                  {currentTask.status}
                </span>
              </div>

              <p className="card-text text-end">
                <small className="text-muted">Creata il: {dataCreazione}</small>
              </p>
            </div>
            
            <div className="card-footer bg-light d-flex justify-content-between">
              <NavLink to="/" className="btn btn-secondary btn-sm">
                ← Torna alla lista
              </NavLink>
              <div className='btn btn-dark' onClick={handleRemoveClick}>Elimina task</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TaskDetail;