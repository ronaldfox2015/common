# Common

# Ejecutar comandos Docker para instalar dependencias y ejecutar tests

Para instalar las dependencias y ejecutar los tests en un entorno Docker utilizando Node.js y Yarn, puedes utilizar los siguientes comandos:

```bash
docker container run --workdir /app --rm -it \
  -v "${PWD}":/app \
  node:22.14.0-alpine3.20 \
  sh -c "apk update && apk upgrade && \
         apk add --no-cache git && \
         npm install -g npm@11.6.0 && \
         npm install -g pnpm && \
         pnpm add dotenv && \
         pnpm add dotenv-expand && \
         pnpm install && pnpm run build"

docker container run --workdir /app --rm -it \
  -v "${PWD}":/app \
  node:22.14.0-alpine3.20 \
  sh -c "apk update && apk upgrade && \
         apk add --no-cache git && \
         npm install -g npm@11.6.0 && \
         npm install -g pnpm && \
         pnpm add -D ts-node && \
         pnpm add -D jest ts-jest @types/jest typescript && \
         pnpm install && pnpm test"
