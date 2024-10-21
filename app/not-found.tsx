import { Metadata } from "next";

export const metadata:Metadata = {
    title: "존재하지 않는 페이지",
}

export default function NotFound(){
    return (
        <div>
            <h1>Not Found</h1>
        </div>
    )
}