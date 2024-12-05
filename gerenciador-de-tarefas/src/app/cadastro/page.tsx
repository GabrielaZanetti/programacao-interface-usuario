"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { CardAcesso } from '@/components/cardAcesso';
import Input from '@/components/input';
import './style.module.css';
import Link from 'next/link';
import { FirebaseUserRepository } from '@/api/repositories/FirebaseUserRepository';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrorMessages';

function Cadastro() {
  const router = useRouter()
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirma, setSenhaConfirma] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setCarregando(true);

    const createUserUseCase = new FirebaseUserRepository();
    try {
      const { uid, authToken } = await createUserUseCase.execute(email, senha, usuario);
      localStorage.setItem("auth_token", authToken);
      localStorage.setItem("id_usuario", uid);

      router.push("/painel");
    } catch (error: any) {
      setErro(getFirebaseErrorMessage(error.code));
    } finally {
      setCarregando(false);
    }
  }

  const disabledButon = !(email && usuario && senha && !carregando && (senha === senhaConfirma));

  return (
    <main className='container-cadastro'>
      <Image src="/pastas.svg" className="image-pastas" alt="Pastas" width={500} height={464} />
      <CardAcesso title={'Cadastro'} onSubmit={entrar}>
        <Input
          text='Usuário: '
          value={usuario}
          setValue={setUsuario}
          label='usuario'
          required={true}
        />
        <Input
          text='E-mail: '
          value={email}
          setValue={setEmail}
          label='email'
          type='email'
          required={true}
        />
        <Input
          text='Senha: '
          value={senha}
          setValue={setSenha}
          label='password'
          type='password'
          required={true}
        />
        <Input
          text='Confirmar senha: '
          value={senhaConfirma}
          setValue={setSenhaConfirma}
          label='confirma-password'
          type='password'
          required={true}
        />
        <div className="container-botao">
          <button className='btn btn-primary' type='submit' disabled={disabledButon}>
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
        {erro &&
          <p className='msg-erro'>{erro}</p>
        }
        <div className="container-botao">
          <Link href='/login' className='btn btn-secondary'>Login</Link>
        </div>
      </CardAcesso>
    </main>
  );
}

export default Cadastro;
