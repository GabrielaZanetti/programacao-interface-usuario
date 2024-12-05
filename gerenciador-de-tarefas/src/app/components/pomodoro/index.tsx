import Image from "next/image";
import "./style.css";
import Link from "next/link";
 
export function Pomodoro() {
    return (
        <Link href='/pomodoro' className="container-pomodoro">
            <Image src="/pomodoro.png" alt="Pomodoro" className="pomodoro-icon" width={50} height={50} />
        </Link>
    );
}
