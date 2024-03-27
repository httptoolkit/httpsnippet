import requests

url = "http://mockbin.com/har"

headers = { "accept-encoding": "deflate, gzip, br" }

response = requests.get(url, headers=headers)

print(response.text)