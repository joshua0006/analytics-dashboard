$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:5173/')
$listener.Start()
Write-Output "Serving analytics dashboard at http://localhost:5173/"
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $path = $context.Request.Url.LocalPath
        $file = if ($path -eq '/' -or $path -eq '/index.html') {
            "C:\Users\PC\analytics-dashboard\dashboard.html"
        } else {
            $null
        }
        if ($file -and (Test-Path $file)) {
            $bytes = [System.IO.File]::ReadAllBytes($file)
            $context.Response.ContentType = 'text/html; charset=utf-8'
            $context.Response.ContentLength64 = $bytes.Length
            $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $html = [System.Text.Encoding]::UTF8.GetBytes('<html><body>404</body></html>')
            $context.Response.StatusCode = 404
            $context.Response.OutputStream.Write($html, 0, $html.Length)
        }
        $context.Response.OutputStream.Close()
    } catch {}
}
