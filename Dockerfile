# syntax=docker/dockerfile:1
#
# Base image dipin ke digest agar build reproducible.
# Digest ini menunjuk node:22-bookworm-slim berisi Node v22.23.2, sesuai .nvmrc.

FROM node:22-bookworm-slim@sha256:d649c27dae7ba0137b3cef5dd75baa422c08dc3d9e3fc0c23dfb172dc3cc6436 AS builder

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,target=/root/.cache/node/corepack \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build


FROM node:22-bookworm-slim@sha256:d649c27dae7ba0137b3cef5dd75baa422c08dc3d9e3fc0c23dfb172dc3cc6436 AS runtime

# npm, npx, dan corepack terbawa base image tapi tidak dipakai saat runtime:
# aplikasi dijalankan dengan `node server.js` lewat entrypoint.sh.
RUN rm -rf /usr/local/lib/node_modules/npm \
           /usr/local/lib/node_modules/corepack \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /usr/local/bin/corepack

ENV NODE_ENV=production
WORKDIR /app

# `output: 'standalone'` menghasilkan server.js + node_modules minimal;
# .next/static dan public tidak ikut serta di dalamnya, harus disalin manual.
COPY --from=builder --chown=1000:1000 /app/.next/standalone ./
COPY --from=builder --chown=1000:1000 /app/.next/static ./.next/static
COPY --from=builder --chown=1000:1000 /app/public ./public

# config.js ditulis ulang saat container start (lihat entrypoint.sh), sehingga
# direktori public perlu tetap bisa ditulis oleh user non-root di bawah.
COPY --chown=1000:1000 docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

USER 1000:1000

ENV PORT=8080
ENV HOSTNAME=0.0.0.0
EXPOSE 8080

# Memakai http bawaan Node agar tidak perlu menambahkan curl atau wget.
# /robots.txt dipilih karena tidak memanggil backend (lihat R-00), jadi
# healthcheck ini murni menilai proses Next sendiri, bukan ketersediaan API.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get({host:'127.0.0.1',port:process.env.PORT||8080,path:'/robots.txt'},r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"

ENTRYPOINT ["./entrypoint.sh"]
