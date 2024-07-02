$headers=@{}
$headers.Add('accept-encoding', 'deflate, gzip, br')
$response = Invoke-RestMethod -Uri 'http://mockbin.com/har' -Method GET -Headers $headers