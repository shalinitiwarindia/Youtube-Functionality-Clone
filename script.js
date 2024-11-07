const API = "----"; //your API



const searchVideos = async () => {
    try {
        const query = document.getElementById("query").value;
        const res = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${API}`
        );
        const data = await res.json();
        displayThumbnails(data.items);
    } catch (err) {
        console.error(err);
    }
};

const displayThumbnails = (videos) => {
    const show_videos = document.getElementById("show_videos");
    show_videos.innerHTML = null;

    videos.forEach(({ id: { videoId }, snippet: { title, thumbnails } }) => {
        const div = document.createElement("div");
        div.onclick = () => viewVideo(videoId);

        const img = document.createElement("img");
        img.src = thumbnails.medium.url;
        img.alt = title;

        const name = document.createElement("h5");
        name.innerText = title;

        div.append(img, name);
        show_videos.append(div);
    });
};

const viewVideo = (videoId) => {
    window.location.href = `view.html?videoId=${videoId}`;
};
