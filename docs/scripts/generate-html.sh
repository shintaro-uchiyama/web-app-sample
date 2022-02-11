#!/bin/sh
# Create output directories
mkdir -p output/html
find . -type d -not -path './output*' -not -path './scripts*' -not -path '.' -exec sh -c 'mkdir -p output/html/"${0}"' {} \;

# convert from md to html
find . -iname "index.md" -type f -exec sh -c 'docker run --rm --volume "`pwd`:/data" pandoc/latex:2.17.1 "${0}" -o "output/html/${0%.md}.html"' {} \;
# copy image files
find . -type f -not -path './output*' -name "*.svg" -or -name "*.jpg" -or -name "*.png" -or -name "*.gif" | xargs -I {} cp "{}" "output/html/{}"

# change md alink to html
find output/html -type f -name "*.html" | xargs sed -i '' -e "s/index.md/index.html/g"