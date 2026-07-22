$file = "C:\Projects\website iit\inext-website\app\globals.css"
$content = Get-Content -Path $file -Raw -Encoding UTF8
$updated = $content
$updated = $updated.Replace('border: 1px solid var(--color-accent)', 'border: 1px solid var(--color-border)')
$updated = $updated.Replace('border: 1.5px solid var(--color-accent)', 'border: 1.5px solid var(--color-border)')
$updated = $updated.Replace('border-bottom: 1px solid var(--color-accent)', 'border-bottom: 1px solid var(--color-border)')
$updated = $updated.Replace('border-bottom: 2px solid var(--color-accent)', 'border-bottom: 2px solid var(--color-border)')
$updated = $updated.Replace('border-top: 1px solid var(--color-accent)', 'border-top: 1px solid var(--color-border)')
$updated = $updated.Replace('border-left: 1px solid var(--color-accent)', 'border-left: 1px solid var(--color-border)')
$updated = $updated.Replace('border-left: 4px solid var(--color-accent)', 'border-left: 4px solid var(--color-border)')
$updated = $updated.Replace('border-left-color: var(--color-accent)', 'border-left-color: var(--color-border)')
$updated = $updated.Replace('border-bottom: 3px solid var(--color-accent)', 'border-bottom: 3px solid var(--color-border)')
Set-Content -Path $file -Value $updated -Encoding UTF8 -NoNewline
Write-Host "done"
