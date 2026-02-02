let currentPort = null;
let timeLeft = 7200;

async function start() {
    const btn = document.querySelector("button");
    btn.innerText = "Deploying Container...";
    btn.disabled = true;

    try {
        const res = await fetch("/api/start");
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();
        currentPort = data.port;

        document.getElementById("welcome-screen").style.display = "none";
        const container = document.getElementById("terminal-container");
        container.style.display = "flex";

        const frame = document.getElementById("terminal-frame");
        frame.src = "http://" + window.location.hostname + ":" + currentPort;

        startTimers();

    } catch (e) {
        alert("Error: " + e.message);
        btn.innerText = "Try Again";
        btn.disabled = false;
    }
}

function startTimers() {
    setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
            const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
            const s = (timeLeft % 60).toString().padStart(2, '0');
            document.getElementById("timer").innerText = `${h}:${m}:${s}`;
        } else {
            document.getElementById("timer").innerText = "EXPIRED";
            document.getElementById("timer").style.color = "red";
        }
    }, 1000);

    setInterval(async () => {
        if (!currentPort) return;
        try {
            const res = await fetch(`/api/stats/${currentPort}`);
            const data = await res.json();
            document.getElementById("ram").innerText = data.ram;
        } catch (e) {
            console.error("Stats error", e);
        }
    }, 2000);
}