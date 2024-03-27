open Cohttp_lwt_unix
open Cohttp
open Lwt

let uri = Uri.of_string "http://mockbin.com/har" in
let headers = Header.add (Header.init ()) "accept-encoding" "deflate, gzip, br" in

Client.call ~headers `GET uri
>>= fun (res, body_stream) ->
  (* Do stuff with the result *)