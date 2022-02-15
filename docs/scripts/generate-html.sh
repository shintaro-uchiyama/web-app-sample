#!/bin/sh
# Create output directories
mkdir -p output/html
find . -type d -not -path './output*' -not -path './scripts*' -not -path '.' | xargs -I {} sh -c 'mkdir -p output/html/"${0#./}"' {}

# convert from md to html
find . -name "*.md" -type f -not -path "*.template.md" -not -path "*README.md" | xargs -I {} sh -c 'echo "${0#./}"' {} | xargs -I {} sh -c 'docker run --rm --volume "`pwd`:/data" pandoc/latex:2.17.1 -s -t html5 -c github.css --metadata title="${0}" "${0}" -o "output/html/${0%.md}.html"' {}
# copy base css file
find output/html -type d | xargs -I {} cp github.css {}
# copy image files
find . -type f -name "*.svg" -not -path './output/*' | xargs -I {} cp "{}" "output/html/{}"

# change md alink to html
find output/html -type f -name "*.html" | xargs sed -i '' -e "s/.md/.html/g"