install:
	npm ci

build:
	npm run build 

lint-frontend:
	npx eslint frontend

start-backend:
	npx start-server

start-frontend:
	npm --prefix frontend start

start:
	make start-backend & make start-frontend
