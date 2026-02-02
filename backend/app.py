from flask import Flask, jsonify, render_template
import subprocess
import random

app = Flask(__name__)

BASE_PORT = 9000
MAX_PORT = 9080

def free_port():
    return random.randint(BASE_PORT, MAX_PORT)

@app.route("/")
def index():
    return render_template("frontend/index.html")

@app.route("/api/start")
def start_terminal():
    port = free_port()

    subprocess.run([
        "docker", "run", "-d", "--rm",
        "--memory=512m",
        "--cpus=0.5",
        "-p", f"{port}:7681",
        "terminal-image"
    ])

    return jsonify({
        "url": f"http://localhost:{port}"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5555)