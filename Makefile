install:
	npm install

start:
	npx babel-node src/index.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest --coverage