process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const metadata = {
    title: 'me',
}

export default function Me () {
    return (
    <div className="flex flex-col items-center justify-center">
        <img src="/133204551.png" alt="ksw-github" className="rounded-full" />
        <h1 className="text-4xl font-bold p-5">KimSeoWoo</h1>
        <div className="flex items-center space-x-2">
            <i className="fab fa-github text-2xl text-white"></i>
            <a href="https://github.com/ksw-github" className="group" target="_blank" rel="noopener noreferrer">
                ksw-github
            </a>
        </div>
    </div>
    )
};