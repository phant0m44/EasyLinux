from flask import Flask, jsonify, send_from_directory, request
import subprocess
import time
import uuid

app = Flask(__name__)

@app.route("/")
def index():
    return send_from_directory('frontend', 'index.html')

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory('frontend', filename)

@app.route("/api/start")
def start_terminal():
    session_id = uuid.uuid4().hex[:8]
    container_name = f"term-{session_id}"

    subprocess.run([
        "docker", "run", "-d", "--rm",
        "--name", container_name,
        "--network", "easylinux_app_net", 
        "--memory=256m",
        "--cpus=0.3",
        "terminal-image",
        "timeout", "7200",
        "ttyd", "-p", "7681", "-W", "-b", f"/terminal/{session_id}", "bash"
    ])

    time.sleep(2)

    return jsonify({
        "status": "ok", 
        "id": session_id,
        "url": f"/terminal/{session_id}/"
    })

@app.route("/api/stats/<session_id>")
def get_stats(session_id):
    try:
        container_name = f"term-{session_id}"
        result = subprocess.check_output(
            f"docker stats {container_name} --no-stream --format '{{{{.MemUsage}}}}'", 
            shell=True
        ).decode().strip()
        return jsonify({"ram": result})
    except:
        return jsonify({"ram": "Offline (Expired)"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)