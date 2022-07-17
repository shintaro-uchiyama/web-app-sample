SHELL=/bin/zsh

# Multipass operatin on Mac
.PHONY: launch
launch:
	zsh scripts/launch/launch.zsh

.PHONY: connect
connect:
	multipass shell docker

.PHONY: list
list:
	multipass list

# Vscode
.PHONY: create-remote-ssh
create-remote-ssh:
	zsh scripts/connect/vscode.zsh

SHELL=/bin/bash
# Setup on Multipass
.PHONY: setup
setup:
	bash scripts/setup/change-zsh.bash