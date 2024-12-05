"use client";

import React, { useEffect, useState } from 'react';
import { BarraPorcentagem } from '@/components/barraPorcentage';
import { Home } from '@/layout-page';
import './style.css';
import ListaArrastavel from '@/components/listaArrastavel';
import { Pomodoro } from '@/components/pomodoro';
import { SemDados } from '@/components/semDados';
import { AtividadesAgrupadasPorStatus } from '@/utils/Atividade';
import { Projeto } from '@/utils/Projeto';
import { buscarAtividadesPorProjeto } from '@/api/repositories/FirebaseAtividadesRepository';
import { buscarProjetosPorUsuario } from '@/api/repositories/FirebaseProjetosRepository';

interface ProjetoDetalhesParams {
    id: string; // Altere conforme o formato de `params`
}
  
interface ProjetoDetalhesProps {
    params: ProjetoDetalhesParams;
}

const ProjetoDetalhes: React.FC<ProjetoDetalhesProps> = ({ params }) => {
    const [idProjeto, setIdProjeto] = useState('');
    const [listaAtividades, setListaAtividades] = useState<AtividadesAgrupadasPorStatus[]>([]);
    const [projeto, setListaProjetos] = useState<Projeto[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState('');
    
    useEffect(() => {
      const fetchParams = async () => {
        const { id } = await params;
        setIdProjeto(id);
      };
      fetchParams();
    }, [params]);

    useEffect(() => {
        if (idProjeto) {
            const id_usuario = localStorage.getItem("id_usuario");
        
            if (id_usuario) {
                const fetchAtividades = async () => {
                    const atividadesAgrupadas = await buscarAtividadesPorProjeto(id_usuario, idProjeto);
                    setListaAtividades(atividadesAgrupadas);
                }
                
                const fetchProjetos = async () => {
                    try {
                        setCarregando(true);
                        const projetosList = await buscarProjetosPorUsuario(id_usuario, idProjeto);
                        setListaProjetos(projetosList);
                    } catch (err) {
                        setCarregando(false);
                    }
                };
                
                fetchAtividades();
                fetchProjetos();
            }
        }
    }, [idProjeto])

    return (
        <Home>
            <>teste</>
            {projeto.length > 0 ?
                <>
                    <div className="projeto-cabecalho">
                        <div className="projeto-container">
                            <h1 className='projeto-titulo'>{projeto[0].titulo_projeto}</h1>
                            <div className="identificador-atividade" style={{ backgroundColor: projeto[0].cor_projeto }}></div>
                        </div>
                    <div className='projeto-descricao'>{projeto[0].desc_projeto}</div>
                    <BarraPorcentagem percent={projeto[0].porcentagem_atividade} />
                    </div>
                    <div className="container-lista">
                        <ListaArrastavel lista={listaAtividades} tituloLista="Painel" listaProjetos={projeto} />
                    </div>
                    <Pomodoro />
                </>
            : 
            carregando ? 
                <div className="container-carregando">
                    <div className="icone-carregando">
                        <div className="boble-icon"></div>
                        <div className="boble-icon"></div>
                        <div className="boble-icon"></div>
                    </div>
                </div>
                :
                <SemDados texto={erro} />
            }
        </Home>
    );
};

export default ProjetoDetalhes;
