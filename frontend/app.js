let timeLeft = 7200; 
let currentSessionId = null;

async function start() {
    const btn = document.querySelector("button");
    btn.innerText = "Deploying Personal Container...";
    btn.disabled = true;

    try {
        const res = await fetch("/api/start");
        if (!res.ok) throw new Error("Server error");
        
        const data = await res.json();
        currentSessionId = data.id;

        document.getElementById("welcome-screen").style.display = "none";
        document.getElementById("terminal-container").style.display = "flex";
        document.getElementById("terminal-frame").src = data.url;
        
        startTimers();

    } catch (e) {
        alert("Error: " + e.message);
        btn.innerText = "Try Again";
        btn.disabled = false;
    }
}

function startTimers() {
    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            const h = Math.floor(timeLeft / 3600).toString().padStart(2, '0');
            const m = Math.floor((timeLeft % 3600) / 60).toString().padStart(2, '0');
            const s = (timeLeft % 60).toString().padStart(2, '0');
            document.getElementById("timer").innerText = `${h}:${m}:${s}`;
        } else {
            document.getElementById("timer").innerText = "EXPIRED";
            clearInterval(timerInterval);
        }
    }, 1000);

    setInterval(async () => {
        if (!currentSessionId) return;
        
        try {
            const res = await fetch(`/api/stats/${currentSessionId}`);
            const data = await res.json();
            document.getElementById("ram").innerText = data.ram;
        } catch (e) {
            console.error(e);
        }
    }, 2000);
}