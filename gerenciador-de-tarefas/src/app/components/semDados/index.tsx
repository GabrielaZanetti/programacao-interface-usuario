import Image from "next/image";
import "./style.css";
 
export function SemDados({ texto = 'Sem Dados' }) {
    return (
        <div className="container-sem-dados">
            <Image src="/sem-dados.gif" unoptimized alt="Pomodoro" className="sem-dados-icon" width={500} height={50} />
            <p className="msg-sem-dados">{ texto }</p>
        </div>
    );
}
