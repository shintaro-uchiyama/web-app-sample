#!/bin/zsh

curl -fsSL https://fnm.vercel.app/install | bash
fnm install
eval "$(fnm env --use-on-cd)"
fnm use v17.5.0
