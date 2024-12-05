"use client";

import React, { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { isAuthenticated } from '@/utils/auth';
import { MenuLateral } from "@/components/menuLateral";
import Image from 'next/image';
import "./globals.css";
interface HomeProps {
  children: React.ReactNode;
}

export const Home: React.FC<HomeProps> = ({ children }) => {
  const [carregando, setCarregando] = useState(true);
  const [logado, setLogado] = useState(false);
  const router = useRouter()
  const pathname = usePathname();

  useEffect(() => {
    setCarregando(false)
    setLogado(isAuthenticated())
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      if (pathname == '/') {
        router.push("/painel");
      }
    }
    return;
  }, [router]);

  if (carregando) {
    return (
      <div className="pagina-erro">
        <Image src="/logo.png" alt="Falha ao encontrar a página" className="img-error-page" width={500} height={500} />
        <p className="mensagem-erro">
          Carregando...
        </p>
      </div>
    )
  }
  
  if (!logado) {
    return (
        <div className="pagina-erro">
          <Image   src="/logo.png" alt="Falha ao encontrar a página" className="img-error-page" width={500} height={500} />
          <p className="mensagem-erro">
            Carregando...
          </p>
        </div>
    )
  }

  return (
    <div className="container-principal">
        <MenuLateral />
        <main className='container-pages'>
          {children}
        </main>
    </div>
  );
}