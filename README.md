# Common

# Ejecutar comandos Docker para instalar dependencias y ejecutar tests

Para instalar las dependencias y ejecutar los tests en un entorno Docker utilizando Node.js y Yarn, puedes utilizar los siguientes comandos:

```bash
docker container run --workdir "/app" --rm -i \
        -v "${PWD}":/app \
        node:18-alpine \
        yarn install
        
docker container run --workdir "/app" --rm -i \
        -v "${PWD}":/app \
        node:18-alpine \
        yarn test
