import "../styles/global.css";
import { Metadata } from "next";
import Navigation from "../components/navigation";
import { Footer } from "./(home)/footer";

export const metadata:Metadata = {
    title: {
        template: "%s | nextJS movies",
        default: "디폴트값"
    },
    description: '공통레이아웃',
}

export default function Layout({ children }:{ children: React.ReactNode}) {
    return (
        <html lang="ko">
            <head>
                <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
                integrity="sha384-k6RqeWeci5ZR/Lv4MR0sA0FfDOM4s7mR2n9w5i9Yh6b0Oe3gD0tbmbu3LOo9R7i1"
                crossOrigin="anonymous"
                />
            </head>
            <body>
                <Navigation/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}
