$files = Get-ChildItem -Recurse -Path "C:\Projects\website iit\inext-website" -Include "*.tsx","*.ts","*.css" |
  Where-Object { $_.FullName -notmatch "node_modules|\.next|\.git" }

foreach ($file in $files) {
  $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
  if ($content -match "iNEXT") {
    $updated = $content.Replace("iNEXT", "i-NEXT")
    Set-Content -Path $file.FullName -Value $updated -Encoding UTF8 -NoNewline
    Write-Host "Updated: $($file.Name)"
  }
}
Write-Host "Done"
