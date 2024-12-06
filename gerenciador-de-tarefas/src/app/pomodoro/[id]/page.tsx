"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Home } from '@/layout-page';
import './style.css';
import { useAuth } from '@/utils/auth';
import { atualizaStatus, buscarAtividadesPorProjeto } from '@/api/repositories/FirebaseAtividadesRepository';
import { buscarProjetosPorUsuario } from '@/api/repositories/FirebaseProjetosRepository';
import { Projeto } from '@/utils/Projeto';
import { AtividadesAgrupadasPorStatus } from '@/utils/Atividade';
import Link from 'next/link';

interface ProjetoDetalhesParams {
    id: string;
}
  
interface ProjetoDetalhesProps {
    params: ProjetoDetalhesParams;
}

const Pomodoro: React.FC<ProjetoDetalhesProps> = ({ params }) => {
    const { userId } = useAuth();
    const [idProjeto, setIdProjeto] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [projeto, setProjeto] = useState<Projeto>();
    const [atividades, setAtividades] = useState<AtividadesAgrupadasPorStatus[]>([]);
    const [cronometro, setCronometro] = useState<number>(30 * 60);
    const [inicioCronometro, setInicioCronometro] = useState<boolean>(false);
    const [focoCronometro, setFocoCronometro] = useState<number>(0);

    useEffect(() => {
        const fetchParams = async () => {
            const { id } = await params;
            setIdProjeto(id);
        };
        fetchParams();
    }, [params]);

    useEffect(() => {
        if (!inicioCronometro || cronometro <= 0) return;
        const interval = setInterval(() => {
            setCronometro((prevTime) => prevTime - 1);
            setFocoCronometro((prevFocus) => prevFocus + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [inicioCronometro, cronometro]);

    useEffect(() => {
        if (idProjeto && userId) {
            const fetchBusca = async () => {
                try {
                    setCarregando(true);
                    const projetosList = await buscarProjetosPorUsuario(userId, idProjeto);
                    const atividadesAgrupadas = await buscarAtividadesPorProjeto(userId, idProjeto);
                    
                    setProjeto(projetosList[0]);
                    setAtividades(atividadesAgrupadas);
                } catch (err) {
                    setCarregando(false);
                } finally {
                    setCarregando(false);
                }
            };
            
            fetchBusca();
        }
    }, [idProjeto, userId]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    const concluirAtividade = async (event: any, id: string) => {
        event.target.disabled = true;
        event.target.closest('.label-atividade').style.textDecoration = 'line-through';
        console.log(id);

        try {
            await atualizaStatus('concluído', id, idProjeto)
            event.target.closest('.label-atividade').classList.add('elemento-removido');
            setTimeout(() => {
                event.target.closest('.label-atividade').remove();
            }, 2000);
        } catch (error) {
            event.target.disabled = false;
            event.target.closest('.label-atividade').style.textDecoration = 'auto';
        }
    }

    return (
        <Home _class='container-pages-pomodoro'>
            {carregando ?
                <div className="container-carregando">
                    <div className="icone-carregando">
                        <div className="boble-icon"></div>
                        <div className="boble-icon"></div>
                        <div className="boble-icon"></div>
                    </div>
                </div>
            :
                <>
                    <Link href={`/projeto/${idProjeto}`} passHref className='btn-secondary btn-voltar'>
                        <Image src="/setaVoltar.png" alt="Voltar ao projeto" className="seta-icon" width={10} height={10} />
                        Voltar ao projeto
                    </Link>
                    <div className="container-pomodoro">
                        <div className="container-tempo">
                            <div className="cronometro">
                                {formatTime(cronometro)}
                            </div>
                            <div className="container-btns">
                                {inicioCronometro ? (
                                    <button
                                        className="btn btn-pomodoro"
                                        title="Pausar concentração"
                                        onClick={() => setInicioCronometro(!inicioCronometro)}
                                    >
                                        Pausar concentração
                                        <Image src="/pouse.png" className="seta" alt="Pausar concentração" width={25} height={25} />
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-pomodoro"
                                        title="Comece a se concentrar"
                                        onClick={() => setInicioCronometro(!inicioCronometro)}
                                    >
                                        Comece a se concentrar
                                        <Image src="/seta.png" className="seta" alt="Comece a se concentrar" width={25} height={25} />
                                    </button>
                                )}
                                <button
                                    className="btn-reiniciar"
                                    title="Resetar cronometro"
                                    onClick={() => {
                                        setCronometro(30 * 60);
                                        setInicioCronometro(false);
                                    }}
                                >
                                    <Image src="/reiniciar.png" className="reset" alt="Resetar cronômetro" width={25} height={25} />
                                </button>
                            </div>
                        </div>
                        <div className="container-tempo-total">
                            <div className="container-atividade-pomodoro container-foco">
                                <div className="titulo">Tempo total em foco hoje:</div>
                                <div className="tempo">{formatTime(focoCronometro)}</div>
                            </div>
                            {projeto && (
                                <div className="container-atividade-pomodoro atividades-andamento">
                                    <div className="titulo-projeto-pomodoro">
                                        {projeto.titulo_projeto}
                                    </div>
                                    <div className="lista-atividades">
                                        {atividades.map(({ nome_coluna, atividades }, index) => {
                                            if (nome_coluna != 'concluído' && atividades.length > 0) {
                                                return (
                                                    <div className="container-tipo-atividade" key={index}>
                                                        <div className="desc-tipo">{nome_coluna}</div>
                                                        <div className="container-listas-atividades">
                                                            {atividades.map(({ titulo_atividade, id }) => {
                                                                return (
                                                                    <div className="label-atividade" key={id}>
                                                                        <div className="titulo-atividade">{titulo_atividade}</div>
                                                                        <input type="checkbox" onClick={(event) => concluirAtividade(event, id)} />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            }
        </Home>
    );
};

export default Pomodoro;
