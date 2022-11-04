.PHONY: up down invoke build

ECR_REPO_URL=227557930319.dkr.ecr.us-east-1.amazonaws.com

up:
	docker run -d -p 9000:8080 --env-file=.env --rm --name random-recipes random-recipes

down:
	docker stop random-recipes

invoke:
	curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"number": 2, "diets": ["vegan"], "intolerances": ["egg", "tree nut"]}'

build:
	docker build -t random-recipes .

deploy:
	docker tag random-recipes:latest ${ECR_REPO_URL}/random-recipes:latest
	docker push ${ECR_REPO_URL}/random-recipes:latest
	aws lambda update-function-code --region us-east-1 --function-name random-recipes --image-uri ${ECR_REPO_URL}/random-recipes:latest

login:
	 aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ECR_REPO_URL}