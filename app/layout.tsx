import "../styles/global.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
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
            <body>
                <Navigation/>
                {children}
                <Footer/>
            </body>
        </html>
    )
}
