$files = @(
  "app\admin\achievements\[id]\edit\page.tsx",
  "app\admin\members\[id]\edit\page.tsx",
  "app\admin\news\[id]\edit\page.tsx",
  "app\admin\projects\[id]\edit\page.tsx",
  "app\admin\publications\[id]\edit\page.tsx"
)
foreach ($f in $files) {
  $path = "C:\Projects\website iit\inext-website\$f"
  $content = Get-Content -Path $path -Raw -Encoding UTF8
  $cleaned = $content.Replace("`n// Required for static export with dynamic routes`nexport function generateStaticParams() { return []; }`n", "")
  $cleaned = $cleaned.Replace("`r`n// Required for static export with dynamic routes`r`nexport function generateStaticParams() { return []; }`r`n", "")
  Set-Content -Path $path -Value $cleaned -Encoding UTF8 -NoNewline
  Write-Host "Cleaned: $f"
}
Write-Host "Done"
