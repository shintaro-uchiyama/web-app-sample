docker run --rm -v "${PWD}:/local" openapitools/openapi-generator-cli:v5.4.0 generate \
    -i /local/openapi.yml \
    -g go-gin-server \
    -o /local/out/go