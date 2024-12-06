"use client";

import React, { useEffect, useState } from 'react';
import { BarraPorcentagem } from '@/components/barraPorcentage';
import { Home } from '@/layout-page';
import './style.css';
import ListaArrastavel from '@/components/listaArrastavel';
import { SemDados } from '@/components/semDados';
import { AtividadesAgrupadasPorStatus } from '@/utils/Atividade';
import { Projeto } from '@/utils/Projeto';
import { buscarAtividadesPorProjeto } from '@/api/repositories/FirebaseAtividadesRepository';
import { buscarPorcentagemPorIdProjeto, buscarProjetosPorUsuario } from '@/api/repositories/FirebaseProjetosRepository';
import Link from 'next/link';
import Image from 'next/image';

interface ProjetoDetalhesParams {
    id: string;
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
    const [porcentagem_atividade, setPorcentagemAtividade] = useState(0);
    
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
                        setPorcentagemAtividade(projetosList[0].porcentagem_atividade)
                    } catch (err) {
                        setCarregando(false);
                    }
                };
                
                fetchAtividades();
                fetchProjetos();
            }
        }
    }, [idProjeto])

    const fetchPorcentagem = () => {
        setTimeout(async () => {
            const porcentagem = await buscarPorcentagemPorIdProjeto(idProjeto);
            if (porcentagem !== null) {
                setPorcentagemAtividade(porcentagem);
            }            
        }, 1000);
    };
    

    return (
        <Home>
            <Link href={`/projeto`} passHref className='btn-secondary btn-voltar-projetos'>
                <Image src="/setaVoltar.png" alt="Voltar ao projeto" className="seta-icon" width={10} height={10} />
                Voltar aos projetos
            </Link>
            {projeto.length > 0 ?
                <>
                    <div className="projeto-cabecalho">
                        <div className="projeto-container">
                            <h1 className='projeto-titulo'>{projeto[0].titulo_projeto}</h1>
                            <div className="identificador-atividade" style={{ backgroundColor: projeto[0].cor_projeto }}></div>
                        </div>
                    <div className='projeto-descricao'>{projeto[0].desc_projeto}</div>
                    <BarraPorcentagem percent={porcentagem_atividade} />
                    </div>
                    <div className="container-lista">
                        <ListaArrastavel lista={listaAtividades} tituloLista="Painel" listaProjetos={projeto} setAltera={fetchPorcentagem} id_projeto={projeto[0].id_projeto} />
                    </div>
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
