"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/navigation.module.css";

export default function Navigation (){
    const path = usePathname();
    return (
        <nav className={`${styles.nav} backdrop-blur-sm border-[#1d1d1d]`}>
            <ul>
                <li>
                    <Link href="/" className={path === "/" ? styles.activeLink : ""}>Home</Link> 
                </li>
                <li>
                    <Link href="/me" className={path === "/me" ? styles.activeLink : ""}>About Me</Link> 
                </li>
            </ul>
        </nav>
    )
}