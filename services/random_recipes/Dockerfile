FROM public.ecr.aws/lambda/python:3.9

ARG SPOONACULAR_APIKEY
ENV SPOONACULAR_APIKEY ${SPOONACULAR_APIKEY}

COPY app.py ${LAMBDA_TASK_ROOT}

COPY requirements.txt .
RUN pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

CMD [ "app.handler" ]