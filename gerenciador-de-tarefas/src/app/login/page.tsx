"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { CardAcesso } from '@/components/cardAcesso';
import Input from '@/components/input';
import Link from 'next/link';
import { FirebaseAuthRepository } from '@/api/repositories/FirebaseLoginRepository';
import { getFirebaseErrorMessage } from '@/utils/firebaseErrorMessages';
import './style.css'

function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const entrar = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const authRepo = new FirebaseAuthRepository();
    setCarregando(true)
    try {
      const { uid, token } = await authRepo.authenticate(email, senha);
      
      localStorage.setItem("auth_token", token);
      localStorage.setItem("id_usuario", uid);
      router.push('/painel');
    } catch (error: any) {
      console.log(error.code);
      
      setErro(getFirebaseErrorMessage(error.code));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className='container-login'>
      <Image src="/pastas.svg" className="image-pastas" alt="Pastas" width={500} height={464} />
      <CardAcesso title={'Entrar'} onSubmit={entrar}>
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
          label='passwprd'
          type='password'
          required={true}
        />
        <div className="container-botao">
          <button className='btn btn-primary' type='submit' disabled={!email || !senha || carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
        {erro &&
          <p className='msg-erro'>{erro}</p>
        }
        <div className="container-botao">
          <Link href='/cadastro' className='btn btn-secondary'>Cadastrar</Link>
        </div>
      </CardAcesso>
    </main>
  );
}

export default Login;
