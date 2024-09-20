import "../styles/global.css";
import { Metadata } from "next";
import Navigation from "../components/navigation";

export const metadata:Metadata = {
    title: {
        template: "%s | 넥스트 무비즈",
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
            </body>
        </html>
    )
}
