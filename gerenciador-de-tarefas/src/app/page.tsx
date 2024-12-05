'use client'

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { isAuthenticated } from '@/utils/auth';
import "./globals.css";

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      if (pathname.startsWith('/')) {
        router.push("/painel");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

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
