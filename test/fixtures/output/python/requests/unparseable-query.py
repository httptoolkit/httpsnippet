import requests

url = "http://mockbin.com/har?&&a=b&&"

response = requests.get(url)

print(response.text)