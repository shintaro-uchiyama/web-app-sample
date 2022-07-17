.PHONY: launch
launch:
	zsh scripts/launch/launch.zsh

.PHONY: connect
connect:
	multipass shell docker

.PHONY: list
list:
	multipass list

.PHONY: setup
setup:
	bash scripts/setup/change-zsh.bash