"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Home } from '@/layout-page';
import { BarraPorcentagem } from '@/components/barraPorcentage';
import './style.css';
import { Modal } from '@/components/modal';
import Input from '@/components/input';
import Alerta from '@/components/alerta';
import { SemDados } from '@/components/semDados';
import { Projeto } from '@/utils/Projeto';
import { adicionarProjeto, buscarProjetosPorUsuario } from '@/api/repositories/FirebaseProjetosRepository';

function gerarIdAleatorio(tamanho: number = 10): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        id += caracteres[indiceAleatorio];
    }
    return id;
}

const Projetos: React.FC = () => {
    const [listaProjetos, setListaProjetos] = useState<Projeto[]>([]);
    const [modal, setModal] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState('');
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [descProjeto, setDescProjeto] = useState('');
    const [corProjeto, setCorProjeto] = useState("#000000");

    const fetchProjetos = async () => {
        const id_usuario = localStorage.getItem("id_usuario");

        try {
            setCarregando(true);
            if (id_usuario) {
                const projetosList = await buscarProjetosPorUsuario(id_usuario);
                setListaProjetos(projetosList);
            } else {
                setErro('Usuário não autenticado');
            }
        } catch (err) {
            setErro('Erro ao buscar projetos');
            console.error(err);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        fetchProjetos();
    }, [])

    const novoItem = async () => {
        const id_usuario = localStorage.getItem("id_usuario");

        const novoProjeto: Projeto = {
            id_projeto: gerarIdAleatorio(12),
            titulo_projeto: nomeProjeto,
            desc_projeto: descProjeto,
            cor_projeto: corProjeto,
            porcentagem_atividade: 0,
            id_usuario,
            data_criacao: new Date()
        };

        try {
            if (carregando || !nomeProjeto || !descProjeto || !corProjeto) {
                return;
            }
            await adicionarProjeto(novoProjeto);
            fetchProjetos();
        } catch (error) {
            console.log(error);

            setErro("Erro ao criar o projeto.");
            setTimeout(() => {
                setErro("");
            }, 5000);
        } finally {
            setCarregando(false);
            setModal(false)
            setNomeProjeto('')
            setDescProjeto('')
            setCorProjeto('#000')
        }
    }

    return (
        <Home>
            <div className="container-btn">
                <button className="config-lista" title='Adicionar coluna' onClick={() => setModal(true)}>
                    <Image src="/plus.png" className="config-icon" alt="Logo da empresa" width={20} height={20} />
                </button>
            </div>
            {carregando ? 
                <div id="carregando">
                    <span className="loader"></span>
                </div>
            :
                listaProjetos.length > 0 ?
                    (<div className="container-atividades">
                        {listaProjetos.map(({ id_projeto, titulo_projeto, desc_projeto, cor_projeto, porcentagem_atividade }) => {
                            return (
                                <div
                                    key={id_projeto}
                                    className='container-projeto'
                                >
                                    <Link href={`/projeto/${id_projeto}`} passHref>
                                        <div className="cabecalho-projeto">
                                            <div className="titulo-projeto">{titulo_projeto}</div>
                                            <div className="identificador-atividade" style={{ backgroundColor: cor_projeto }}></div>
                                        </div>
                                        <div className="desc-projeto">{desc_projeto}</div>
                                        <BarraPorcentagem percent={porcentagem_atividade} />
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    )
                    : <SemDados />
            }
            {modal &&
                <Modal
                    titulo="Adicionar Item"
                    onClose={() => setModal(false)}
                    btn={<button className='btn-primary' onClick={novoItem} disabled={!descProjeto || !nomeProjeto || carregando}>
                        {carregando ? 'Salvando...' : 'Salvar'}
                    </button>}
                >
                    <Input
                        text='Nome do Projeto: '
                        value={nomeProjeto}
                        setValue={setNomeProjeto}
                        label='nome-projeto'
                    />
                    <Input
                        text='Descrição do Projeto: '
                        value={descProjeto}
                        setValue={setDescProjeto}
                        label='desc-projeto'
                    />
                    <Input
                        text='Cor do Projeto: '
                        value={corProjeto}
                        setValue={setCorProjeto}
                        label='cor-projeto'
                        type='color'
                    />
                </Modal>
            }
            {erro &&
                <Alerta mensagem={erro} tipo='erro' />
            }
        </Home>
    );
}

export default Projetos;
