import os

def handler(event, context):
    api_key = os.environ["SPOONACULAR_APIKEY"]
    return api_key