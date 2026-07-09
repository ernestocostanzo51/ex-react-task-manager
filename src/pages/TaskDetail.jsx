import React, { useContext, useState } from 'react';
import { useParams, Link, NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import useTasks from '../context/useTasks';
import Modal from '../components/Modal';

function TaskDetail() {
  const { id } = useParams(); 
  const [showModal, setShowModal] = useState(false);
  
  const { tasks } = useContext(GlobalContext);
  const { removeTask } = useTasks();
  const navigate = useNavigate(); 

  const currentTask = tasks ? tasks.find(task => task.id == id) : null;

  const handleRemoveClick = async () => {
   
    try {
      await removeTask(Number(id));
      setShowModal(false); 
      alert("Task eliminata con successo!");
      navigate('/'); 
    } catch (error) {
      alert(error.message);
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
        <div className="alert alert-warning" role="alert"> 
          <h4 className="alert-heading">⚠️ Task non trovata</h4>
          <p>La task richiesta non esiste nel database.</p>
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
              
            
              <button className='btn btn-danger btn-sm' onClick={() => setShowModal(true)}>
                Elimina task
              </button>
            </div>
          </div>

        </div>
      </div>

     
      <Modal
        title="Conferma eliminazione"
        content={<p>Sicuro di voler eliminare la task selezionata?</p>}
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleRemoveClick}
        confirmText='Elimina'
      />
    </div>
  );
}

export default TaskDetail;