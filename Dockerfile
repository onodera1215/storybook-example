FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm


# Fonts for CJK / emoji rendering in screenshots, plus extra GUI libs
# (libxcursor1 / libgtk-3-0) that Playwright's install-deps does not pull in
# but Chromium still loads at startup on this image.
RUN apt-get update -y \
    && npx -y playwright@latest install-deps \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN chown -R node:node /app


USER node

RUN npm ci

RUN npx playwright install  

RUN curl -fsSL https://claude.ai/install.sh | bash
