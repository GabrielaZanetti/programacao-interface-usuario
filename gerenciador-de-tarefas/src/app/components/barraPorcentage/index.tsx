import React from 'react';
import "./style.css";

interface PropsBarraPorcentagem {
  percent: number;
}

export const BarraPorcentagem: React.FC<PropsBarraPorcentagem> = ({ percent }) => {
  return (
    <div className="container-porcent">
        <div className="barra-porcent fundo-porcent"></div>
        <div className="barra-porcent porcent-progress" style={{ width: `${percent}%` }}></div>
    </div>
  );
};
