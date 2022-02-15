#!/bin/sh
docker pull minlag/mermaid-cli:8.13.10
find . -name "*.template.md" -type f | xargs -I {} sh -c 'echo "${0#./}"' {} | xargs -I {} sh -c 'echo "${0%.template.md}"' {} | xargs -I {} sh -c 'docker run -v "$PWD:/data" minlag/mermaid-cli:8.13.10 -i /data/"${0}".template.md -o /data/"${0}.md"' {}