import http.client
import gzip

conn = http.client.HTTPConnection("mockbin.com")

headers = { "accept-encoding": "gzip" }

conn.request("GET", "/har", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))
