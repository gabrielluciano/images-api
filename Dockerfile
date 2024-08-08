FROM oven/bun:1.1.22-alpine

WORKDIR /app

RUN mkdir public && \
    apk --no-cache add libstdc++

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile 

COPY src ./src

EXPOSE 3000

CMD ["bun", "src/index.ts"]