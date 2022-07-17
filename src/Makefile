SHELL=/bin/bash
.PHONY: setup
setup:
	bash ./scripts/generate-local-env.sh
.PHONY: init
init:
	make setup
	source ~/.bash_profile
	docker compose up -d --build
.PHONY: up
up:
	docker compose up -d
down:
	docker compose down