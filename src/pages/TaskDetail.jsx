import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext'

function TaskDetail() {
  const { id } = useParams(); 
  
 
  const { tasks, loading } = useContext(GlobalContext);

 
  const currentTask = tasks.find(task => task.id == id) ;

  if (loading) {
    return <p style={{ padding: '20px' }}>Caricamento in corso...</p>;
  }

  // Se la task non viene trovata nell'array locale
  if (!currentTask) {
    return (
      <div style={{ padding: '20px' }}>
        <p>⚠️ La task richiesta (ID: {id}) non è presente nell'elenco locale.</p>
        <Link to="/tasks">Torna alla lista</Link>
      </div>
    );
  }

  const dataCreazione = currentTask.createdAt 
    ? new Date(currentTask.createdAt).toLocaleString('it-IT') 
    : 'N/D';

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
      <h2>Dettaglio Task</h2>
      <p><strong>ID:</strong> {currentTask.id}</p>
      <p><strong>Titolo:</strong> {currentTask.title}</p>
      <p><strong>Descrizione:</strong> {currentTask.description || 'Nessuna descrizione'}</p>
      <p><strong>Stato:</strong> {currentTask.status || 'N/D'}</p>
      <p><small><strong>Creata il:</strong> {dataCreazione}</small></p>
      
      <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #eee' }} />
      <Link to="/tasks" style={{ color: '#007bff', textDecoration: 'none' }}>← Torna alla lista</Link>
    </div>
  );
}

export default TaskDetail;