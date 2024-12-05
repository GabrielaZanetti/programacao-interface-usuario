'use client'

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import "./globals.css";
import { useAuth } from '@/utils/auth';

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
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

  return (
    <div className="pagina-erro">
      <Image src="/logo.png" alt="Falha ao encontrar a página" className="img-error-page" width={500} height={500} />
      <p className="mensagem-erro">
        Carregando...
      </p>
    </div>
  );
};

export default Page;
