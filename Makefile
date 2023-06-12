install:
	npm ci

build:
	npm run build --prefix my-app

lint-frontend:
	npx eslint frontend

start-backend:
	npx start-server

start-frontend:
	npm --prefix frontend start

start:
	make start-backend & make start-frontend
