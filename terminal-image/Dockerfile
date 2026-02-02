FROM debian:stable

ENV DEBIAN_FRONTEND=noninteractive
ENV TTYD_VERSION=1.7.7


RUN apt-get update && apt-get install -y \
    sudo bash nano vim htop curl wget git \
    build-essential gcc g++ make cmake \
    python3 python3-pip python3-venv \
    iputils-ping net-tools procps \
    ca-certificates \
    btop mc neofetch

RUN curl -L \
    https://github.com/tsl0922/ttyd/releases/download/${TTYD_VERSION}/ttyd.x86_64 \
    -o /usr/local/bin/ttyd && \
    chmod +x /usr/local/bin/ttyd

RUN useradd -m user && \
    echo "user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN mv /bin/rm /bin/rm.original
COPY <<EOF /bin/rm
for arg in "\$@"; do
    if [[ "\$arg" == "/" ]] || [[ "\$arg" == "/*" ]]; then
        echo "❌ SYSTEM PROTECTION: Deleting root is forbidden!"
        exit 1
    fi
done
exec /bin/rm.original "\$@"
EOF
RUN chmod +x /bin/rm

RUN apt-get update

RUN chown -R user:user /home/user
USER user
WORKDIR /home/user

CMD ["bash"]