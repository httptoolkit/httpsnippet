use serde_json::json;
use reqwest;

#[tokio::main]
pub async fn main() {
    let url = "http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//";

    let querystring = [
        ("'", "squote-key-test"),
        ("squote-value-test", "'"),
        ("\"", "dquote-key-test"),
        ("dquote-value-test", "\""),
        ("`", "backtick-key-test"),
        ("backtick-value-test", "`"),
        ("$(", "dollar-parenthesis-key-test"),
        ("dollar-parenthesis-value-test", "$("),
        ("#{", "hash-brace-key-test"),
        ("hash-brace-value-test", "#{"),
        ("%(", "percent-parenthesis-key-test"),
        ("percent-parenthesis-value-test", "%("),
        ("%{", "percent-brace-key-test"),
        ("percent-brace-value-test", "%{"),
        ("{{", "double-brace-key-test"),
        ("double-brace-value-test", "{{"),
        ("\\0", "null-key-test"),
        ("null-value-test", "\\0"),
        ("%s", "string-fmt-key-test"),
        ("string-fmt-value-test", "%s"),
        ("\\", "slash-key-test"),
        ("slash-value-test", "\\"),
    ];

    let payload = "' \" ` $( #{ %( %{ {{ \\0 %s \\";

    let mut headers = reqwest::header::HeaderMap::new();
    headers.insert("'", "squote-key-test".parse().unwrap());
    headers.insert("squote-value-test", "'".parse().unwrap());
    headers.insert("dquote-value-test", "\"".parse().unwrap());
    headers.insert("`", "backtick-key-test".parse().unwrap());
    headers.insert("backtick-value-test", "`".parse().unwrap());
    headers.insert("$", "dollar-key-test".parse().unwrap());
    headers.insert("dollar-parenthesis-value-test", "$(".parse().unwrap());
    headers.insert("#", "hash-key-test".parse().unwrap());
    headers.insert("hash-brace-value-test", "#{".parse().unwrap());
    headers.insert("%", "percent-key-test".parse().unwrap());
    headers.insert("percent-parenthesis-value-test", "%(".parse().unwrap());
    headers.insert("percent-brace-value-test", "%{".parse().unwrap());
    headers.insert("double-brace-value-test", "{{".parse().unwrap());
    headers.insert("null-value-test", "\\0".parse().unwrap());
    headers.insert("string-fmt-value-test", "%s".parse().unwrap());
    headers.insert("slash-value-test", "\\".parse().unwrap());

    let client = reqwest::Client::new();
    let response = client.post(url)
        .query(&querystring)
        .headers(headers)
        .body(payload)
        .send()
        .await;

    let results = response.unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    dbg!(results);
}