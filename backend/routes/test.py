# import requests
# import time

# url = "https://flightera-flight-data.p.rapidapi.com/airport/flights"

# querystring = {"ident":"UUEE","time":int(time.time()),"direction":"arrival"}

# headers = {
# 	"X-RapidAPI-Key": "ac0c630dd0mshc201274c2dc0a7ap1c93c4jsnf356b75b2694",
# 	"X-RapidAPI-Host": "flightera-flight-data.p.rapidapi.com"
# }

# response = requests.get(url, headers=headers, params=querystring)

# print(response.json())

# Set your API key before making the request
import requests

resp = requests.get('https://api.flightapi.io/roundtrip/5f8b1ec2a9d372151b4109f4dfd8/HAN/SGN/2024-04-10/2024-04-12/1/0/1/Economy/USD')
print (resp.json())

