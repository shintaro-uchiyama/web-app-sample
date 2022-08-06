SHELL=/bin/bash
.PHONY: setup
setup:
	bash ./scripts/generate-local-env.sh
.PHONY: init
init:
	make setup
	source ~/.bash_profile
	docker compose up -d --build
	open http://docker-vm.local:3000/
.PHONY: up
up:
	docker compose up -d
	open http://docker-vm.local:3000/
down:
	docker compose down