async function start() {
    const res = await fetch("/api/start");
    const data = await res.json();
    window.location.href = data.url;
}