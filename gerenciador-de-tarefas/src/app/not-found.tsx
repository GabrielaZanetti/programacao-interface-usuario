"use client";

import { isAuthenticated } from '@/utils/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const NotFound: React.FC = () => {
    return (
        <div className="pagina-erro">
            <Image src="/logo.png" alt="Falha ao encontrar a página" className="img-error-page" width={500} height={500} />
            <p className="mensagem-erro">
                Ah, aventureiro... a estrada que você busca leva a um abismo vazio. A página perdida não pode ser encontrada neste reino. Volte e escolha outro caminho!
            </p>
            <Link href={!isAuthenticated() ? '/login' : '/painel' } className='btn-retorno'>
                <p className={!isAuthenticated() ? 'login' : 'painel' }>{ !isAuthenticated() ? 'Ir para o Login' : 'Ir para o Painel' }</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </Link>
        </div>
    )
}

export default NotFound;