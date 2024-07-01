#import <Foundation/Foundation.h>

NSDictionary *headers = @{ @"squote-value-test": @"'",
                           @"dquote-value-test": @"\"",
                           @"backtick-value-test": @"`",
                           @"dollar-parenthesis-value-test": @"$(",
                           @"hash-brace-value-test": @"#{",
                           @"percent-parenthesis-value-test": @"%(",
                           @"percent-brace-value-test": @"%{",
                           @"double-brace-value-test": @"{{",
                           @"null-value-test": @"\\0",
                           @"string-fmt-value-test": @"%s",
                           @"slash-value-test": @"\\" };

NSData *postData = [[NSData alloc] initWithData:[@"' \" ` $( #{ %( %{ {{ \\0 %s \\" dataUsingEncoding:NSUTF8StringEncoding]];

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://example.test/%27%22%60$(%(%%7B%7B%7B/0%s//?'=squote-key-test&squote-value-test='&%22=dquote-key-test&dquote-value-test=%22&%60=backtick-key-test&backtick-value-test=%60&%24(=dollar-parenthesis-key-test&dollar-parenthesis-value-test=%24(&%23%7B=hash-brace-key-test&hash-brace-value-test=%23%7B&%25(=percent-parenthesis-key-test&percent-parenthesis-value-test=%25(&%25%7B=percent-brace-key-test&percent-brace-value-test=%25%7B&%7B%7B=double-brace-key-test&double-brace-value-test=%7B%7B&%5C0=null-key-test&null-value-test=%5C0&%25s=string-fmt-key-test&string-fmt-value-test=%25s&%5C=slash-key-test&slash-value-test=%5C"]
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:10.0];
[request setHTTPMethod:@"POST"];
[request setAllHTTPHeaderFields:headers];
[request setHTTPBody:postData];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
                                                if (error) {
                                                    NSLog(@"%@", error);
                                                } else {
                                                    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
                                                    NSLog(@"%@", httpResponse);
                                                }
                                            }];
[dataTask resume];