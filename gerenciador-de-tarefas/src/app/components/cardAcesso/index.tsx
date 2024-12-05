import { FormEventHandler } from 'react';
import Image from 'next/image';
import './style.css';

interface cartaoInicial {
    title: string,
    children: React.ReactNode;
    onSubmit: FormEventHandler<HTMLFormElement>;
}

export function CardAcesso({title, children, onSubmit}: cartaoInicial) {
    return (
        <div className="container-cartao">
            <Image src="/logo.png" className="logo" alt="Logo da empresa" width={160} height={160} />
            <h1>{title}</h1>
            <form data-testid="form" className='form' onSubmit={onSubmit}>
                {children}
            </form>
        </div>
    );
}