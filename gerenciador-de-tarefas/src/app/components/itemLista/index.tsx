import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import "./style.css";
import { useDroppable } from '@dnd-kit/core';
import { Atividade } from '@/utils/atividades';

interface PropsItemVazio {
  id: string;
  colunaOrigen: string | null;
}

export const ItemLista: React.FC<Atividade> = ({ titulo_atividade, nome_projeto, cor_projeto, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  let style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
    pointerEvents: isDragging ? 'none' : 'auto',
  };

  return (
    <div
      style={style}
      className="container-item"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className="info-atividade">
        <div className="titulo-atividade">{titulo_atividade}</div>
        <div className="descricao-atividade">{nome_projeto}</div>
      </div>
      <div className="identificador-atividade" style={{ backgroundColor: cor_projeto }}></div>
    </div>
  );
};

export const PlaceholderItem: React.FC<PropsItemVazio> = ({ id, colunaOrigen }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  
  return (
    <div ref={setNodeRef}>
      {colunaOrigen && isOver && (
        <div className="placeholder-item"></div>
      )}
    </div>
  );
};