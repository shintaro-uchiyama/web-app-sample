#!/bin/bash

if grep 'export PATH="/usr/local/go/bin:$PATH"' ~/.bashrc then
    echo "MATCH"
fi

    echo "fin"
# git clone https://github.com/udhos/update-golang
# cd update-golang
# sudo ./update-golang.sh
# echo 'export PATH="/usr/local/go/bin:$PATH"' >> ~/.bashrc
# source ~/.bashrc
