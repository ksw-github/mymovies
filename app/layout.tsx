import "../styles/global.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Metadata } from "next";
import Navigation from "../components/navigation";
import { Footer } from "../components/footer";

export const metadata:Metadata = {
    title: {
        template: "%s | nextJS movies",
        default: "디폴트값"
    },
    description: 'NextJS로 구현한 영화홈페이지',
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