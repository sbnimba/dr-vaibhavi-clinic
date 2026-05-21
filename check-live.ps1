$page = (Invoke-WebRequest -Uri "https://sbnimba.github.io/dr-vaibhavi-clinic/" -UseBasicParsing).Content
if ($page -match "border-pink-100") { Write-Host "Language border fix: LIVE ✅" } else { Write-Host "Language border fix: NOT YET ❌" }
if ($page -match "rIHIKWL49PnG4VcCd") { Write-Host "MGM Maps link: LIVE ✅" } else { Write-Host "MGM Maps link: NOT YET ❌" }
if ($page -match "1000") { Write-Host "1000+ patients count: LIVE ✅" } else { Write-Host "1000+ patients count: NOT YET ❌" }
if ($page -match "scrollbar-width") { Write-Host "Slim scrollbar CSS: LIVE ✅" } else { Write-Host "Slim scrollbar CSS: NOT YET ❌" }
if ($page -match "HeroAnimation") { Write-Host "Hero animation: LIVE ✅" } else { Write-Host "Hero animation: NOT YET ❌" }
