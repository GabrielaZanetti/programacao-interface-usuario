"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import "./style.css";
 
export function MenuLateral() {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    return (
        <>
        <div className="botao-container">
            <button className="menu-botao" onClick={toggleMenu}>
            {menuOpen ? (
                <Image
                src="/Close.svg"
                className="icon-nav icon-user"
                alt="Fechar Menu"
                width={20}
                height={20}
                />
            ) : (
                <Image
                src="/Menu.svg"
                className="icon-nav icon-user"
                alt="Menu Hambúrguer"
                width={20}
                height={20}
                />
            )}
            </button>
        </div>
        <div className={`menu-lateral ${menuOpen ? "open" : ""}`}>
            <div className="nav-item conta-user">
                <Link href='/conta' className={pathname.startsWith('/perfil') ? 'link-ativo' : ''}>
                    <Image src="/user.png" className="icon-nav icon-user" alt="Perfil" width={20} height={20} />
                </Link>
            </div>
            <div className="nav-item">
                <Link href='/painel' className={`${pathname.startsWith('/painel') ? 'link-ativo' : ''} link-nav`}>
                    <Image src="/home.png" alt="Início" className="icon-nav" width={20} height={20} />
                </Link>
                <Link href='/projeto' className={`${pathname.startsWith('/projeto') ? 'link-ativo' : ''} link-nav`}>
                    <Image src="/projetos.png" alt="Projetos" className="icon-nav" width={20} height={20} />
                </Link>
            </div>
        </div>        
        </>
    );
}
