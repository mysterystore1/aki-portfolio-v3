param(
  [string]$ProfilePath = 'public/images/hero-profile.png',
  [string]$MascotPath = 'public/images/hero-mascot-transparent.png',
  [string]$SmallOut = 'public/images/twitter-card-small.png',
  [string]$LargeOut = 'public/images/twitter-card-large.png'
)

Add-Type -AssemblyName System.Drawing

function New-RoundRectPath([float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $r * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  return $path
}

function Draw-Pill(
  [System.Drawing.Graphics]$g,
  [float]$x,
  [float]$y,
  [float]$w,
  [float]$h,
  [float]$radius,
  [System.Drawing.Color]$fillColor,
  [bool]$drawStroke,
  [System.Drawing.Color]$strokeColor,
  [float]$strokeWidth,
  [string]$text,
  [System.Drawing.Font]$font,
  [System.Drawing.Color]$textColor
) {
  $path = New-RoundRectPath $x $y $w $h $radius
  $fillBrush = New-Object System.Drawing.SolidBrush($fillColor)
  $g.FillPath($fillBrush, $path)
  $fillBrush.Dispose()

  if ($drawStroke) {
    $strokePen = New-Object System.Drawing.Pen($strokeColor, $strokeWidth)
    $g.DrawPath($strokePen, $path)
    $strokePen.Dispose()
  }

  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = [System.Drawing.StringAlignment]::Center
  $fmt.LineAlignment = [System.Drawing.StringAlignment]::Center
  $textBrush = New-Object System.Drawing.SolidBrush($textColor)
  $g.DrawString($text, $font, $textBrush, [System.Drawing.RectangleF]::new($x, $y, $w, $h), $fmt)
  $textBrush.Dispose()
  $fmt.Dispose()
  $path.Dispose()
}

function Draw-HeroPhoto(
  [System.Drawing.Graphics]$g,
  [System.Drawing.Bitmap]$profile,
  [float]$x,
  [float]$y,
  [float]$w,
  [float]$h,
  [float]$radius
) {
  $path = New-RoundRectPath $x $y $w $h $radius
  $g.SetClip($path)

  $scale = [Math]::Max($w / $profile.Width, $h / $profile.Height)
  $dw = $profile.Width * $scale
  $dh = $profile.Height * $scale
  $dx = $x + ($w - $dw) / 2
  $dy = $y + ($h - $dh) / 2

  $g.DrawImage($profile, $dx, $dy, $dw, $dh)
  $g.ResetClip()
  $path.Dispose()
}

function Create-Card(
  [int]$width,
  [int]$height,
  [string]$outputPath,
  [bool]$isSquare,
  [System.Drawing.Bitmap]$profile,
  [System.Drawing.Bitmap]$mascot
) {
  $bg = [System.Drawing.ColorTranslator]::FromHtml('#F8F7F8')
  $ink = [System.Drawing.ColorTranslator]::FromHtml('#2C2C3A')
  $muted = [System.Drawing.ColorTranslator]::FromHtml('#8E8E9C')
  $rose = [System.Drawing.ColorTranslator]::FromHtml('#D4708F')
  $blushLight = [System.Drawing.ColorTranslator]::FromHtml('#FDF2F5')
  $blushText = [System.Drawing.ColorTranslator]::FromHtml('#C97A8E')
  $line = [System.Drawing.ColorTranslator]::FromHtml('#E6E7ED')
  $youtube = [System.Drawing.ColorTranslator]::FromHtml('#FF2A55')
  $xBtn = [System.Drawing.ColorTranslator]::FromHtml('#2E2F43')

  $bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.Clear($bg)

  $decoBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#F3EAF0'))
  if ($isSquare) {
    $g.FillEllipse($decoBrush, $width - 380, -80, 440, 440)
    $g.DrawImage($mascot, $width - 146, 146, 118, 112)
  } else {
    $g.FillEllipse($decoBrush, $width - 270, -40, 320, 320)
    $g.DrawImage($mascot, $width - 108, 98, 88, 84)
  }
  $decoBrush.Dispose()

  if ($isSquare) {
    $left = 56

    $labelFont = New-Object System.Drawing.Font('Segoe UI Semibold', 15)
    Draw-Pill $g $left 384 190 42 21 $blushLight $false $line 0 '  Japanese Crypto KOL' $labelFont $blushText
    $dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#E8A0B4'))
    $g.FillEllipse($dotBrush, $left + 14, 401, 9, 9)
    $dotBrush.Dispose()

    $headFont = New-Object System.Drawing.Font('Georgia', 86)
    $headInkBrush = New-Object System.Drawing.SolidBrush($ink)
    $headRoseBrush = New-Object System.Drawing.SolidBrush($rose)
    $g.DrawString('Hello,', $headFont, $headInkBrush, $left, 454)
    $g.DrawString("I'm", $headFont, $headInkBrush, $left, 555)
    $g.DrawString(' Aki', $headFont, $headRoseBrush, $left + 205, 555)

    $subFont = New-Object System.Drawing.Font('Yu Gothic UI', 24)
    $subBrush = New-Object System.Drawing.SolidBrush($muted)
    $g.DrawString('クリプトKOL・MC・コミュニティ運営', $subFont, $subBrush, $left, 700)

    $chipFont = New-Object System.Drawing.Font('Yu Gothic UI', 14)
    Draw-Pill $g $left 748 58 34 17 $bg $true $line 2 'KOL' $chipFont $muted
    Draw-Pill $g ($left + 70) 748 100 34 17 $bg $true $line 2 'MC / ホスト' $chipFont $muted
    Draw-Pill $g ($left + 184) 748 108 34 17 $bg $true $line 2 'イベント進行' $chipFont $muted
    Draw-Pill $g ($left + 306) 748 116 34 17 $bg $true $line 2 'コンテンツ制作' $chipFont $muted

    $descFont = New-Object System.Drawing.Font('Yu Gothic UI', 22)
    $g.DrawString('2021年より、DeFi・チェーン・ブロックチェーンゲームを楽しくわかり', $descFont, $subBrush, $left, 835)
    $g.DrawString('やすく解説しています。', $descFont, $subBrush, $left, 882)

    $btnFont = New-Object System.Drawing.Font('Yu Gothic UI Semibold', 18)
    Draw-Pill $g $left 982 166 58 29 $xBtn $false $line 0 'X  Xをフォロー' $btnFont ([System.Drawing.Color]::White)
    Draw-Pill $g ($left + 181) 982 220 58 29 $bg $true ([System.Drawing.ColorTranslator]::FromHtml('#F3C1CF')) 2 '▶ YouTubeを見る' $btnFont $youtube

    Draw-HeroPhoto $g $profile 764 364 320 432 30

    $metricFont = New-Object System.Drawing.Font('Segoe UI Semibold', 17)
    Draw-Pill $g 658 425 86 56 14 ([System.Drawing.Color]::FromArgb(240, 255, 255, 255)) $false $line 0 '10,000+' $metricFont $ink
    Draw-Pill $g 658 868 72 54 13 ([System.Drawing.Color]::FromArgb(240, 255, 255, 255)) $false $line 0 '50+' $metricFont $ink
    Draw-Pill $g 1105 688 94 60 14 ([System.Drawing.Color]::FromArgb(240, 255, 255, 255)) $false $line 0 '3,000+' $metricFont $ink

    $labelFont.Dispose(); $headFont.Dispose(); $headInkBrush.Dispose(); $headRoseBrush.Dispose();
    $subFont.Dispose(); $subBrush.Dispose(); $chipFont.Dispose(); $descFont.Dispose(); $btnFont.Dispose(); $metricFont.Dispose()
  }
  else {
    $left = 36

    $labelFont = New-Object System.Drawing.Font('Segoe UI Semibold', 12)
    Draw-Pill $g $left 28 148 34 17 $blushLight $false $line 0 '  Japanese Crypto KOL' $labelFont $blushText
    $dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#E8A0B4'))
    $g.FillEllipse($dotBrush, $left + 10, 41, 7, 7)
    $dotBrush.Dispose()

    $headFont = New-Object System.Drawing.Font('Georgia', 68)
    $headInkBrush = New-Object System.Drawing.SolidBrush($ink)
    $headRoseBrush = New-Object System.Drawing.SolidBrush($rose)
    $g.DrawString('Hello,', $headFont, $headInkBrush, $left, 94)
    $g.DrawString("I'm", $headFont, $headInkBrush, $left, 175)
    $g.DrawString(' Aki', $headFont, $headRoseBrush, $left + 154, 175)

    $subFont = New-Object System.Drawing.Font('Yu Gothic UI', 19)
    $subBrush = New-Object System.Drawing.SolidBrush($muted)
    $g.DrawString('クリプトKOL・MC・コミュニティ運営', $subFont, $subBrush, $left, 313)

    $chipFont = New-Object System.Drawing.Font('Yu Gothic UI', 11)
    Draw-Pill $g $left 350 50 29 14 $bg $true $line 2 'KOL' $chipFont $muted
    Draw-Pill $g ($left + 56) 350 84 29 14 $bg $true $line 2 'MC / ホスト' $chipFont $muted
    Draw-Pill $g ($left + 146) 350 95 29 14 $bg $true $line 2 'イベント進行' $chipFont $muted
    Draw-Pill $g ($left + 247) 350 102 29 14 $bg $true $line 2 'コンテンツ制作' $chipFont $muted

    $descFont = New-Object System.Drawing.Font('Yu Gothic UI', 18)
    $g.DrawString('2021年より、DeFi・チェーン・ブロックチェーンゲームを楽しくわかり', $descFont, $subBrush, $left, 435)
    $g.DrawString('やすく解説しています。', $descFont, $subBrush, $left, 472)

    $btnFont = New-Object System.Drawing.Font('Yu Gothic UI Semibold', 15)
    Draw-Pill $g $left 549 122 46 23 $xBtn $false $line 0 'X  Xをフォロー' $btnFont ([System.Drawing.Color]::White)
    Draw-Pill $g ($left + 137) 549 166 46 23 $bg $true ([System.Drawing.ColorTranslator]::FromHtml('#F3C1CF')) 2 '▶ YouTubeを見る' $btnFont $youtube

    Draw-HeroPhoto $g $profile 741 68 322 400 28

    $metricFont = New-Object System.Drawing.Font('Segoe UI Semibold', 15)
    Draw-Pill $g 620 113 74 54 13 ([System.Drawing.Color]::FromArgb(240, 255, 255, 255)) $false $line 0 '10,000+' $metricFont $ink
    Draw-Pill $g 632 404 70 54 13 ([System.Drawing.Color]::FromArgb(240, 255, 255, 255)) $false $line 0 '50+' $metricFont $ink
    Draw-Pill $g 1105 342 90 58 14 ([System.Drawing.Color]::FromArgb(240, 255, 255, 255)) $false $line 0 '3,000+' $metricFont $ink

    $labelFont.Dispose(); $headFont.Dispose(); $headInkBrush.Dispose(); $headRoseBrush.Dispose();
    $subFont.Dispose(); $subBrush.Dispose(); $chipFont.Dispose(); $descFont.Dispose(); $btnFont.Dispose(); $metricFont.Dispose()
  }

  $outDir = Split-Path -Parent $outputPath
  if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir | Out-Null }
  $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

  $g.Dispose()
  $bmp.Dispose()
}

$profile = [System.Drawing.Bitmap]::FromFile($ProfilePath)
$mascot = [System.Drawing.Bitmap]::FromFile($MascotPath)

Create-Card -width 1200 -height 1200 -outputPath $SmallOut -isSquare $true -profile $profile -mascot $mascot
Create-Card -width 1200 -height 630 -outputPath $LargeOut -isSquare $false -profile $profile -mascot $mascot

$profile.Dispose()
$mascot.Dispose()

Write-Output "Generated: $SmallOut"
Write-Output "Generated: $LargeOut"
