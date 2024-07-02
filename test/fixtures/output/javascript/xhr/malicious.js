const data = "' \" ` $( #{ %( %{ {{ \\0 %s \\";

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C");
xhr.setRequestHeader("'", "squote-key-test");
xhr.setRequestHeader("squote-value-test", "'");
xhr.setRequestHeader("dquote-value-test", "\"");
xhr.setRequestHeader("`", "backtick-key-test");
xhr.setRequestHeader("backtick-value-test", "`");
xhr.setRequestHeader("$", "dollar-key-test");
xhr.setRequestHeader("dollar-parenthesis-value-test", "$(");
xhr.setRequestHeader("#", "hash-key-test");
xhr.setRequestHeader("hash-brace-value-test", "#{");
xhr.setRequestHeader("%", "percent-key-test");
xhr.setRequestHeader("percent-parenthesis-value-test", "%(");
xhr.setRequestHeader("percent-brace-value-test", "%{");
xhr.setRequestHeader("double-brace-value-test", "{{");
xhr.setRequestHeader("null-value-test", "\\0");
xhr.setRequestHeader("string-fmt-value-test", "%s");
xhr.setRequestHeader("slash-value-test", "\\");

xhr.send(data);