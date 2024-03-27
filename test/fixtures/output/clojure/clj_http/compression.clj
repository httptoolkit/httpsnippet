(require '[clj-http.client :as client])

(client/get "http://mockbin.com/har" {:headers {:accept-encoding "deflate, gzip, br"}})