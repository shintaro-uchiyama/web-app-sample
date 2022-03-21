SHELL=/bin/zsh
.PHONY: setup
setup:
	zsh ./scripts/generate-local-env.sh
.PHONY: init
init:
	make setup
	source ~/.zshenv
	docker compose up -d --build
.PHONY: up
up:
	docker compose up -d
down:
	docker compose down