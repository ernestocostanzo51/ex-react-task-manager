import { createPortal } from 'react-dom';

export default function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {
    
    if (!show) return null;

    return createPortal(
        <div className="modal-backdrop" onClick={onClose}>
           
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">{title}</h3>
                
                <div className="modal-body">
                    {content}
                </div>
                
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Annulla</button>
                    <button className="btn-confirm" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body
    );
}