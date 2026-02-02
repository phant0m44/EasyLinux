FROM debian:stable

ENV DEBIAN_FRONTEND=noninteractive
ENV TTYD_VERSION=1.7.7

RUN apt update && apt install -y \
    sudo bash nano vim htop curl wget git \
    build-essential gcc g++ make cmake \
    python3 python3-pip python3-venv \
    iputils-ping net-tools procps \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# --- install ttyd (binary) ---
RUN curl -L \
    https://github.com/tsl0922/ttyd/releases/download/${TTYD_VERSION}/ttyd.x86_64 \
    -o /usr/local/bin/ttyd && \
    chmod +x /usr/local/bin/ttyd

# non-root user
RUN useradd -m user && \
    echo "user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER user
WORKDIR /home/user

EXPOSE 7681
CMD ["bash"]