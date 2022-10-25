.PHONY: up down invoke build

up:
	docker run -d -p 9000:8080 --env-file=.env --rm --name random-recipes random-recipes

down:
	docker stop random-recipes

invoke:
	curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"number": 2, "diets": ["vegan"], "intolerances": ["egg", "tree nut"]}'

build:
	docker build -t random-recipes .