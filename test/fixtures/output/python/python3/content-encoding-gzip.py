import http.client
import gzip

conn = http.client.HTTPConnection("mockbin.com")

headers = { "accept-encoding": "gzip" }

conn.request("GET", "/har", headers=headers)

res = conn.getresponse()
data = res.read()

if res.headers['content-encoding'] == 'gzip':
    print(gzip.decompress(data).decode("utf-8"))
else:
    print(data.decode("utf-8"))
