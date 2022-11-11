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

# Vscode
.PHONY: create-remote-ssh
create-remote-ssh:
	zsh scripts/connect/vscode.zsh
