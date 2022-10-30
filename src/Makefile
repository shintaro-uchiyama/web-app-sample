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
.PHONY: up-library
up-library:
	docker compose -f ./docker-compose.library.yml up -d
	open http://docker-vm.local:5173/
down:
	docker compose down