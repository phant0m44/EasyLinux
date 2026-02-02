FROM debian:stable

ENV DEBIAN_FRONTEND=noninteractive
ENV TTYD_VERSION=1.7.7

RUN apt-get update && apt-get install -y \
    sudo bash nano vim htop curl wget git \
    build-essential gcc g++ make cmake \
    python3 python3-pip python3-venv \
    iputils-ping net-tools procps \
    ca-certificates tmux gawk \
    && rm -rf /var/lib/apt/lists/*

RUN curl -L \
    https://github.com/tsl0922/ttyd/releases/download/${TTYD_VERSION}/ttyd.x86_64 \
    -o /usr/local/bin/ttyd && \
    chmod +x /usr/local/bin/ttyd

RUN useradd -m user && \
    echo "user ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

RUN mv /bin/rm /bin/rm.original
COPY <<EOF /bin/rm
#!/bin/bash
for arg in "\$@"; do
    if [[ "\$arg" == "/" ]] || [[ "\$arg" == "/*" ]]; then
        echo "❌ SYSTEM PROTECTION: Deleting root is forbidden!"
        exit 1
    fi
done
exec /bin/rm.original "\$@"
EOF
RUN chmod +x /bin/rm

COPY <<EOF /usr/local/bin/status_bar.sh
START=\${START_TS:-$(date +%s)}
NOW=\$(date +%s)
ELAPSED=\$((NOW - START))
REMAINING=\$((7200 - ELAPSED))

if [ \$REMAINING -le 0 ]; then
    TIME_STR="⚠️ EXPIRED"
else
    H=\$((REMAINING / 3600))
    M=\$(( (REMAINING % 3600) / 60 ))
    S=\$((REMAINING % 60))
    TIME_STR=\$(printf "%02d:%02d:%02d" \$H \$M \$S)
fi

RAM=\$(free -m | awk '/Mem:/ { printf("%d MB", \$3) }')

echo "⏳ Life: \$TIME_STR  |  💾 RAM: \$RAM  |  🛡️ Protected"
EOF
RUN chmod +x /usr/local/bin/status_bar.sh

COPY <<EOF /home/user/.tmux.conf
set -g status-interval 1
set -g status-style bg=green,fg=black
set -g status-left ""
set -g status-right "#(bash /usr/local/bin/status_bar.sh) "
set -g status-right-length 150
set -g mouse on
EOF

RUN chown -R user:user /home/user
USER user
WORKDIR /home/user

CMD ["bash"]