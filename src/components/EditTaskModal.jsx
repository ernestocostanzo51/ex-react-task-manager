import React, { useState, useEffect } from 'react';
import Modal from './Modal'; 

export default function EditTaskModal({ show, onClose, task, onSave }) {
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'To do');
    }
  }, [task, show]);

 
  const handleConfirm = () => {
  
  

    
    const updatedTask = {
      ...task,
      title: title,
      description: description,
      status: status
    };

   
    onSave(updatedTask);
  };

  const formContent = (
    <form onSubmit={(e) => e.preventDefault()}>
      
      <div className="mb-3 text-start">
        <label className="form-label fw-bold">Titolo</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Inserisci il titolo della task"
        />
      </div>

  
      <div className="mb-3 text-start">
        <label className="form-label fw-bold">Descrizione</label>
        <textarea
          className="form-control"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Inserisci la descrizione"
        />
      </div>

  
      <div className="mb-3 text-start">
        <label className="form-label fw-bold">Stato</label>
        <select 
          className="form-select" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To do">To do</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </form>
  );

  return (
    <Modal
      title="Modifica Task"
      content={formContent}
      show={show}
      onClose={onClose}
      onConfirm={handleConfirm}
      confirmText="Salva"
    />
  );
}