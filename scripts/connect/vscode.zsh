#!/bin/zsh

if [ grep 'Host multipass-docker' ~/.ssh/config ]; then
  echo 'test'
fi