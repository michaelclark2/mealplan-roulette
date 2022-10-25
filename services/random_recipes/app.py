import os
import requests

def handler(event, context):
    api_key = os.environ["SPOONACULAR_APIKEY"]

    assert event["number"] < 8

    params = {
        "apiKey" : api_key,
        "addRecipeInformation": True,
        "sort": "random",
        "type": "main course",
        "number": event["number"],
        "diet": ",".join(event["diets"]),
        "intolerances": ",".join(event["intolerances"])
    }
    request = requests.get("https://api.spoonacular.com/recipes/complexSearch", params=params)
    return request.json()['results']
