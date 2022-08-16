SHELL=/bin/zsh

# Setup Mac
.PHONY: install-multipass
install-multipass:
	zsh scripts/setup/install-multipass.zsh

.PHONY: install-docker
install-docker:
	zsh scripts/setup/install-docker.zsh

.PHONY: install-docker-compose
install-docker-compose:
	zsh scripts/setup/install-docker-compose.zsh

# Multipass operation on Mac
.PHONY: launch
launch:
	zsh scripts/launch/launch.zsh

.PHONY: list
list:
	zsh scripts/launch/list.zsh

.PHONY: update-hosts
update-hosts:
	zsh scripts/launch/update-hosts.zsh

# Vscode
.PHONY: create-remote-ssh
create-remote-ssh:
	zsh scripts/connect/vscode.zsh

SHELL=/bin/bash
# Setup on Multipass
.PHONY: setup
setup:
	bash scripts/setup/change-zsh.bash