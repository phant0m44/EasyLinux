FROM debian:stable

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install -y \
    sudo bash nano vim htop curl wget git \
    build-essential gcc g++ make cmake \
    python3 python3-pip python3-venv \
    iputils-ping net-tools procps \
    ca-certificates ttyd \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m user && \
    echo "user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER user
WORKDIR /home/user

EXPOSE 7681
CMD ["ttyd", "-p", "7681", "/bin/bash"]