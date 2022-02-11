#!/bin/sh
docker pull minlag/mermaid-cli:8.13.10
docker run -v "$PWD/design:/data" minlag/mermaid-cli:8.13.10 -i /data/index.template.md -o /data/index.md