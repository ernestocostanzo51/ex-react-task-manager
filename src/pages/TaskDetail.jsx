import React, { useContext, useState } from 'react';
import { useParams, Link, NavLink, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import useTasks from '../context/useTasks'; // Hook personalizzato
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal'; // Importiamo la modale di modifica

function TaskDetail() {
  const { id } = useParams(); 
  
  // Stati per controllare la visibilità delle due modali
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
 
  const { tasks } = useContext(GlobalContext);
  
  // Estraiamo sia removeTask che updateTask dal tuo custom hook useTasks
  const { removeTask, updateTask } = useTasks();

  const navigate = useNavigate();

  // Cerchiamo la task corrente all'interno dello stato globale
  const currentTask = tasks ? tasks.find(task => task.id == id) : null;

  // --- GESTIONE ELIMINAZIONE ---
  const handleRemoveClick = async () => {
    try {
      await removeTask(Number(id));
      setShowDeleteModal(false);
      alert("Task eliminata con successo!");
      navigate('/'); 
    } catch (error) {
      alert(error.message);
    }
  };

  // --- GESTIONE SALVATAGGIO MODIFICA ---
  const handleSaveTask = async (updatedTask) => {
    try {
      // Eseguiamo la funzione del tuo hook passando l'oggetto modificato
      await updateTask(updatedTask);
      
      // Se l'operazione ha successo:
      alert("Task modificata con successo!"); // 1. Mostra alert di conferma
      setShowEditModal(false);                 // 2. Chiude la modale
      
    } catch (error) {
      // Se la funzione lancia un errore, mostra l'alert con il messaggio ricevuto
      alert(`Errore: ${error.message}`);
    }
  };
  
  // Stato di caricamento iniziale
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

  // Se la task non esiste nel database
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
            
            <div className="card-footer bg-light d-flex justify-content-between gap-2">
              <NavLink to="/" className="btn btn-secondary btn-sm">
                ← Torna alla lista
              </NavLink>

              {/* NUOVO BOTTONE: "Modifica Task" */}
              <button className="btn btn-warning btn-sm text-white" onClick={() => setShowEditModal(true)}>
                Modifica Task
              </button>
              
              <button className='btn btn-danger btn-sm' onClick={() => setShowDeleteModal(true)}>
                Elimina task
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MODALE DI CONFERMA ELIMINAZIONE */}
      <Modal
        title="Conferma eliminazione"
        content={<p>Sicuro di voler eliminare la task selezionata?</p>}
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleRemoveClick}
        confirmText='Elimina'
      />

      {/* COMPONENTE INTEGRATO: MODALE DI MODIFICA TASK */}
      <EditTaskModal 
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={currentTask}        // Passa l'oggetto della task corrente per precompilare il form
        onSave={handleSaveTask}   // Passa la funzione di gestione del salvataggio
      />
    </div>
  );
}

export default TaskDetail;