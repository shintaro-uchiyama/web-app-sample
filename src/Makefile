.PHONY: setup
setup:
	sh ./scripts/generate-local-env.sh
.PHONY: init
init:
	make setup
	docker compose up -d --build
.PHONY: up
up:
	docker compose up -d
down:
	docker compose down