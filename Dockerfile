FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# Install Chromium and fonts required by storycap (Puppeteer)
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-noto-cjk \
    fonts-noto-color-emoji \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    && rm -rf /var/lib/apt/lists/*

# Tell Puppeteer/storycap to use the system-installed Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

RUN chown -R node:node /app

USER node

RUN curl -fsSL https://claude.ai/install.sh | bash \
    && npx storybook add @storybook/addon-mcp \
    && npx mcp-add --type http --url "http://localhost:6006/mcp" --scope project
