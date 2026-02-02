from flask import Flask, jsonify, send_from_directory
import subprocess
import random
import time

app = Flask(__name__)

BASE_PORT = 9000
MAX_PORT = 9080

def free_port():
    return random.randint(BASE_PORT, MAX_PORT)

@app.route("/")
def index():
    return send_from_directory('frontend', 'index.html')

@app.route("/<path:filename>")
def serve_static(filename):
    return send_from_directory('frontend', filename)

@app.route("/api/start")
def start_terminal():
    port = free_port()
    start_ts = int(time.time())

    subprocess.run([
        "docker", "run", "-d", "--rm",
        "--name", f"term-{port}",
        "--memory=256m",
        "--cpus=0.3",
        "-p", f"{port}:7681",
        "-e", f"START_TS={start_ts}",
        "terminal-image",
        "timeout", "7200",
        "ttyd", "-p", "7681", "-W", "tmux", "new-session", "-A", "-s", "main"
    ])

    time.sleep(2)

    return jsonify({
        "port": port
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5555)