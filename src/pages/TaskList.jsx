import React, { useContext, useState, useMemo } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function TaskList() {
  const { tasks } = useContext(GlobalContext);

  // 1. Stati per l'ordinamento
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState(1); // 1 = Crescente, -1 = Decrescente

  // 2. Mappa dei pesi per lo stato ("To do" < "Doing" < "Done")
  const statusWeights = {
    'To do': 1,
    'Doing': 2,
    'Done': 3
  };

  // 3. OGGETTO DI LOOKUP: Sostituisce completamente lo Switch-Case
  // Ogni chiave corrisponde alla colonna e restituisce il valore esatto da confrontare
  const sortStrategies = {
    title: (task) => (task.title || '').toLowerCase(),
    status: (task) => statusWeights[task.status] || 0,
    createdAt: (task) => task.createdAt ? new Date(task.createdAt).getTime() : 0
  };

  // 4. Gestore del click sulle intestazioni della tabella
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(prevOrder => prevOrder * -1); // Inverte la direzione
    } else {
      setSortBy(column); // Cambia colonna
      setSortOrder(1);   // Resetta a crescente
    }
  };

  // 5. Logica di ordinamento pulita con useMemo
  const sortedTasks = useMemo(() => {
    if (!tasks) return [];

    return [...tasks].sort((a, b) => {
      // Recuperiamo la strategia di estrazione del dato in base alla colonna attiva
      const getTargetValue = sortStrategies[sortBy];
      
      const valueA = getTargetValue(a);
      const valueB = getTargetValue(b);

      let comparison = 0;

      // Se stiamo ordinando per titolo, usiamo localeCompare per le stringhe
      if (sortBy === 'title') {
        comparison = valueA.localeCompare(valueB);
      } else {
        // Altrimenti facciamo una sottrazione numerica standard (per pesi dello stato o timestamp delle date)
        comparison = valueA - valueB;
      }

      // Applichiamo la direzione (Crescente / Decrescente)
      return comparison * sortOrder;
    });
  }, [tasks, sortBy, sortOrder]);

  // Icona dinamica per la freccia di ordinamento
  const renderSortIcon = (column) => {
    if (sortBy !== column) return null;
    return sortOrder === 1 ? ' 🔼' : ' 🔽';
  };

  if (!tasks || tasks.length === 0) {
    return <div className="container mt-4"><p>Nessuna task presente.</p></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista delle Task</h2>
      
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th onClick={() => handleSort('title')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Titolo{renderSortIcon('title')}
              </th>
              <th onClick={() => handleSort('status')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Stato{renderSortIcon('status')}
              </th>
              <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                Data Creazione{renderSortIcon('createdAt')}
              </th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map(task => (
              <tr key={task.id}>
                <td className="fw-bold">{task.title}</td>
                <td>
                  <span className={`badge ${
                    task.status === 'Done' ? 'bg-success' :
                    task.status === 'To do' ? 'bg-danger' : 'bg-warning text-dark'
                  }`}>
                    {task.status}
                  </span>
                </td>
                <td className="text-muted">
                  {task.createdAt ? new Date(task.createdAt).toLocaleString('it-IT') : 'N/D'}
                </td>
                <td>
                  <NavLink to={`/tasks/${task.id}`} className="btn btn-outline-primary btn-sm" onClick={(e) => e.stopPropagation()}>
                    Vedi Dettaglio
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}