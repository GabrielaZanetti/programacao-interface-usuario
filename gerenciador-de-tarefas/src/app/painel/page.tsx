"use client"

import React, { useEffect, useState } from 'react'
import { Home } from '@/layout-page';
import ListaArrastavel from '@/components/listaArrastavel';
import "./style.css";
import { SemDados } from '@/components/semDados';
import { buscarAtividadesPorProjeto } from '@/api/repositories/FirebaseAtividadesRepository';
import { AtividadesAgrupadasPorStatus } from '@/utils/Atividade';
import { buscarProjetosPorUsuario } from '@/api/repositories/FirebaseProjetosRepository';
import { Projeto } from '@/utils/Projeto';

interface PropsProjeto {
    nome_user?: string
}

const Projetos: React.FC<PropsProjeto> = ({ nome_user = 'usuário', }) => {
    const [listaAtividades, setListaAtividades] = useState<AtividadesAgrupadasPorStatus[]>([]);
    const [listaProjetos, setListaProjetos] = useState<Projeto[]>([]);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        const id_usuario = localStorage.getItem("id_usuario");
        if (id_usuario) {
            const fetchAtividades = async () => {
                const atividadesAgrupadas = await buscarAtividadesPorProjeto(id_usuario);
                setListaAtividades(atividadesAgrupadas);
            }

            const fetchProjetos = async () => {
                try {
                    setCarregando(true);
                        const projetosList = await buscarProjetosPorUsuario(id_usuario);
                        setListaProjetos(projetosList);
                } catch (err) {
                    setCarregando(false);
                }
            };
            
            fetchAtividades();
            fetchProjetos();
        }
    }, [])

    return (
        <Home>
            <div className="header-projeto">
                <p className='titulo-pagina'>Olá, {nome_user}</p>
            </div>
            {listaAtividades.length > 0 ? 
                <div className="container-lista">
                    <ListaArrastavel lista={listaAtividades} tituloLista="Painel" listaProjetos={listaProjetos} />
                </div>
            : <SemDados />
            }
        </Home>
    )
}

export default Projetos;