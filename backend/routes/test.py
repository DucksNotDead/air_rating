import requests
import time

url = "https://flightera-flight-data.p.rapidapi.com/airport/flights"

querystring = {"ident":"UUEE","time":int(time.time()),"direction":"arrival"}

headers = {
	"X-RapidAPI-Key": "ac0c630dd0mshc201274c2dc0a7ap1c93c4jsnf356b75b2694",
	"X-RapidAPI-Host": "flightera-flight-data.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())
