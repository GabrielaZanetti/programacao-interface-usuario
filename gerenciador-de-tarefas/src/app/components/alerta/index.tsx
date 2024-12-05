import React from "react";
import "./style.css";

interface PropsItem {
  mensagem: string;
  tipo: 'sucesso' | 'erro' | 'alerta' | 'info';
}

function Alerta({ mensagem, tipo }: PropsItem) {
  return (
    <div className={`alerta-container alerta-${tipo}`}>
      {mensagem}
    </div>
  );
}

export default Alerta;
