import { API_URL } from "../app/constants";

async function getVideos(id:string){
    const response = await fetch(`${API_URL}/${id}/videos`);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
        const videos = await response.json();
        return videos.filter((video: { name: string }) => 
        video.name.toLowerCase().includes("official"));
    } catch (error) {
        console.error("JSON 파싱 오류:", error);
        return [];
    }
}

export default async function MovieVideos({ id }: { id: string }) {
    const videos = await getVideos(id);
    const firstVideo = videos[0];
    if (videos.length === 0) return false;
    return (
        <div className="w-full mx-auto">
            <iframe
            key={firstVideo.id}
            src={`https://youtube.com/embed/${firstVideo.key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={firstVideo.name}
            className="w-full h-[500px] border border-[#515151] rounded-xl"
            />
        </div>
    );
}