# Fix 1: Update credentials on all article/blog sub-pages (navbar header line)
# These pages have "MS OBGY | MBBS" in a <p> tag in the header
$subPages = Get-ChildItem -Recurse -Path ".\src\app" -Include "page.tsx" | Where-Object { $_.FullName -notmatch "\\app\\page\.tsx" -and $_.FullName -notmatch "\\admin\\" }

foreach ($file in $subPages) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # Fix navbar header credentials (sub-page top-left logo area)
    $content = $content -replace 'MS OBGY \| MBBS', 'Consultant Obstetrician &amp; Gynecologist'

    # Fix photo path for pregnancy-calculator specifically
    if ($file.FullName -match "pregnancy-calculator") {
        $content = $content -replace '"/images/doctor-hero-hd\.jpg"', '"/dr-vaibhavi-clinic/images/doctor-hero-hd.jpg"'
    }

    Set-Content $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated: $($file.Name)"
}

Write-Host "Done! All sub-page credentials updated."
