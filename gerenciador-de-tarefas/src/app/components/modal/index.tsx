import React from 'react';
import './style.css';

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    titulo: string;
    btn?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ titulo, children, onClose, btn }) => {
    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div className='fundo-modal' onClick={handleBackgroundClick}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-titulo">
                    {titulo}
                    <button className='btn-modal' onClick={onClose}>X</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button className='btn-fechar' onClick={onClose}>Fechar</button>
                    {btn}
                </div>
            </div>
        </div>
    );
};