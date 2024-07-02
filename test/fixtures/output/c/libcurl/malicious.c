CURL *hnd = curl_easy_init();

curl_easy_setopt(hnd, CURLOPT_CUSTOMREQUEST, "POST");
curl_easy_setopt(hnd, CURLOPT_URL, "http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C");

struct curl_slist *headers = NULL;
headers = curl_slist_append(headers, "': squote-key-test");
headers = curl_slist_append(headers, "squote-value-test: '");
headers = curl_slist_append(headers, "dquote-value-test: \"");
headers = curl_slist_append(headers, "`: backtick-key-test");
headers = curl_slist_append(headers, "backtick-value-test: `");
headers = curl_slist_append(headers, "$: dollar-key-test");
headers = curl_slist_append(headers, "dollar-parenthesis-value-test: $(");
headers = curl_slist_append(headers, "#: hash-key-test");
headers = curl_slist_append(headers, "hash-brace-value-test: #{");
headers = curl_slist_append(headers, "%: percent-key-test");
headers = curl_slist_append(headers, "percent-parenthesis-value-test: %(");
headers = curl_slist_append(headers, "percent-brace-value-test: %{");
headers = curl_slist_append(headers, "double-brace-value-test: {{");
headers = curl_slist_append(headers, "null-value-test: \\0");
headers = curl_slist_append(headers, "string-fmt-value-test: %s");
headers = curl_slist_append(headers, "slash-value-test: \\");
curl_easy_setopt(hnd, CURLOPT_HTTPHEADER, headers);

curl_easy_setopt(hnd, CURLOPT_POSTFIELDS, "' \" ` $( #{ %( %{ {{ \\0 %s \\");

CURLcode ret = curl_easy_perform(hnd);