import React from 'react';
import {useDroppable} from '@dnd-kit/core';

interface HomeProps {
  children: React.ReactNode;
}

export const Droppable: React.FC<HomeProps> = ({ children }) => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}