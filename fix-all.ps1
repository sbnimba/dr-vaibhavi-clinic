$files = Get-ChildItem -Recurse -Path ".\src\app" -Include "page.tsx"
foreach ($file in $files) {
    $c = [System.IO.File]::ReadAllText($file.FullName)
    $orig = $c

    # Fix credential line in header navbar (compact version)
    $c = $c -replace 'MS OBGY \| MBBS', 'Consultant Obstetrician & Gynecologist'

    # Fix credential in hero byline (compact version)
    $c = $c -replace 'MS OBGY, MBBS', 'MBBS, MS (OBGY)'

    # Fix broken relative image path (without leading slash)
    $c = $c -replace '"images/doctor-hero-hd\.jpg"', '"/dr-vaibhavi-clinic/images/doctor-hero-hd.jpg"'

    if ($c -ne $orig) {
        [System.IO.File]::WriteAllText($file.FullName, $c)
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "All done!"
