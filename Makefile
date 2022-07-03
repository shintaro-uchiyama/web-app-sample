.PHONY: launch
launch:
	zsh scripts/launch/launch.zsh

.PHONY: connect
connect:
	multipass shell docker

.PHONY: setup
setup:
	bash scripts/setup/change-zsh.bash