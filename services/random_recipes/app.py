import os
import requests

def handler(event, context):
    api_key = os.environ["SPOONACULAR_APIKEY"]

    params = event['queryStringParameters']

    assert int(params["number"]) < 8

    params = {
        "apiKey" : api_key,
        "addRecipeInformation": True,
        "sort": "random",
        "type": "main course",
        "number": params["number"],
        "diet": ",".join(params.get("diets", [])),
        "intolerances": ",".join(params.get("intolerances", []))
    }
    request = requests.get("https://api.spoonacular.com/recipes/complexSearch", params=params)
    return request.json()['results']
