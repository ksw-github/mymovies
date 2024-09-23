"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/navigation.module.css";
// import { useState } from "react";

export default function Navigation (){
    const path = usePathname();
    // const [count, setCount] = useState(0);
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <Link href="/">Home</Link> {path === "/" ? "🔥" : ""}
                </li>
                <li>
                    <Link href="/me">About Me</Link> {path === "/me" ? "🔥" : ""}
                </li>
            </ul>
        </nav>
    )
}