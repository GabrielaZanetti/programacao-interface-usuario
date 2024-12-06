import Image from "next/image";
import "./style.css";
import Link from "next/link";
 
interface PomodoroProps {
    id_projeto: string;
}

export const Pomodoro: React.FC<PomodoroProps> = ({ id_projeto }) => {
    return (
        <Link href={`/pomodoro/${id_projeto}`} className="container-pomodoro-icon">
            <Image src="/pomodoro.png" alt="Pomodoro" className="pomodoro-icon" width={50} height={50} />
        </Link>
    );
}
