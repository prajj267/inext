$base = "C:\Projects\website iit\inext-website\app\admin"
$dest = "$base\_forms"
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$moves = @(
  @{ src = "$base\news\[id]\edit\EditForm.tsx";         dst = "$dest\EditNewsForm.tsx" },
  @{ src = "$base\members\[id]\edit\EditForm.tsx";      dst = "$dest\EditMemberForm.tsx" },
  @{ src = "$base\projects\[id]\edit\EditForm.tsx";     dst = "$dest\EditProjectForm.tsx" },
  @{ src = "$base\publications\[id]\edit\EditForm.tsx"; dst = "$dest\EditPublicationForm.tsx" },
  @{ src = "$base\achievements\[id]\edit\EditForm.tsx"; dst = "$dest\EditAchievementForm.tsx" }
)

foreach ($m in $moves) {
  if (Test-Path $m.src) {
    Move-Item -Path $m.src -Destination $m.dst -Force
    Write-Host "Moved: $($m.src)"
  } else {
    Write-Host "Not found: $($m.src)"
  }
}
Write-Host "Done"
