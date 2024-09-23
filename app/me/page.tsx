process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faGithub } from "@fortawesome/free-brands-svg-icons";

export const metadata = {
    title: 'me',
}

export default function Page () {
    return (
    <div className="flex flex-col items-center justify-center h-screen">
        <img src="/133204551.png" alt="ksw-github" />
        <h1>KimSeoWoo</h1>
        {/* <FontAwesomeIcon icon={faGithub} size="sm" className="text-base" style={{ fontSize: '10px' }} /> */}
        <i className="fab fa-github text-2xl text-black"></i>
        <a href="https://github.com/ksw-github">ksw-github</a>
        <br />
        <br />
    </div>
    )
};