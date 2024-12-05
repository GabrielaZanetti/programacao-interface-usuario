import Image from "next/image";
import "./globals.css";

export default function Loading() {
  return (
    <div className="pagina-erro">
      <Image src="/logo.png" alt="Falha ao encontrar a página" className="img-error-page" width={500} height={500} />
      <p className="mensagem-erro">
        Carregando...
      </p>
    </div>
  )
}