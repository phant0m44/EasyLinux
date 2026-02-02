async function start() {
    const btn = document.querySelector("button");
    const originalText = btn.innerText;
    
    try {
        btn.innerText = "Starting...";
        btn.disabled = true;

        const res = await fetch("/api/start");
        
        if (!res.ok) throw new Error("Server error");
        
        const data = await res.json();
        
        window.location.href = "http://" + window.location.hostname + ":" + data.port;
        
    } catch (e) {
        alert("Помилка запуску: " + e.message);
        btn.innerText = originalText;
        btn.disabled = false;
    }
}