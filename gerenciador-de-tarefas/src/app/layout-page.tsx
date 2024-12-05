"use client";

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { MenuLateral } from "@/components/menuLateral";
import Image from 'next/image';
import "./globals.css";
import { useAuth } from '@/utils/auth';
interface HomeProps {
  children: React.ReactNode;
}

export const Home: React.FC<HomeProps> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname();
  const { loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        if (pathname == '/') {
          router.push("/painel");
        }
      } else {
        router.push("/login");
      }
    }
    
    return;
  }, [router, loading]);

  if (loading) {
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