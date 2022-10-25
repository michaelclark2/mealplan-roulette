import os
import requests

def handler(event, context):
    # TODO: use context to read identity from cognito user pools

    api_key = os.environ["SPOONACULAR_APIKEY"]
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
