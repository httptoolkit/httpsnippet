package main

import (
	"fmt"
	"strings"
	"net/http"
	"io"
)

func main() {

	url := "http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C"

	payload := strings.NewReader("' \" ` $( #{ %( %{ {{ \\0 %s \\")

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("squote-value-test", "'")
	req.Header.Add("dquote-value-test", "\"")
	req.Header.Add("backtick-value-test", "`")
	req.Header.Add("dollar-parenthesis-value-test", "$(")
	req.Header.Add("hash-brace-value-test", "#{")
	req.Header.Add("percent-parenthesis-value-test", "%(")
	req.Header.Add("percent-brace-value-test", "%{")
	req.Header.Add("double-brace-value-test", "{{")
	req.Header.Add("null-value-test", "\\0")
	req.Header.Add("string-fmt-value-test", "%s")
	req.Header.Add("slash-value-test", "\\")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}