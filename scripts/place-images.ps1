$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$public = Join-Path $root "public\images"
$gallery = Join-Path $public "gallery"
$works = Join-Path $public "works"

New-Item -ItemType Directory -Force -Path $public, $gallery, $works | Out-Null

$assetsRoot = "C:\Users\taikan\.cursor\projects\c-Aki\assets"

Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_HAUt31BaMAAkwON-b44d1e8a-e74c-4d53-a1a6-ea1a369d8680.png") (Join-Path $gallery "01.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_HAMT7yPbkAAV3qo-7f594539-a251-45b3-bdb0-8d3b58ab2206.png") (Join-Path $gallery "02.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_HAA-SvKbEAAhp3I-535e0479-0fa5-4922-a8d5-3d664ddc2425.png") (Join-Path $gallery "03.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_G_1Em8DaAAAVrsX-7bab0f85-bf32-46be-b2ca-4f881c5a0a6f.png") (Join-Path $gallery "04.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_G_oFo_9bAAES4f7-d674d896-e917-45f1-ba0e-54a55a9ad9fe.png") (Join-Path $gallery "05.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_G-c9D61bsAAEKyj-f7961527-47d7-482b-bfca-ccfc126eead6.png") (Join-Path $gallery "06.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_G-DGhmnacAAunAR-734e4e3b-7026-439f-b07c-737d3c0aa324.png") (Join-Path $gallery "07.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_G9_VgNTb0AAtDIs-8ad7ee9e-fbc9-4e55-ba7f-09603912e169.png") (Join-Path $gallery "08.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_G9_PmXQbcAEFoJx-81057cdc-fc78-470f-95ca-4815b389d8a2.png") (Join-Path $gallery "09.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_G96eDllbcAEaGvx-f7b9a555-7efe-4518-ab24-a208e1ca51dd.png") (Join-Path $gallery "10.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_G9v2APGaEAA-vmQ-e0b8df87-3bf2-431a-97fd-33824d61618a.png") (Join-Path $gallery "11.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_G9eUayWa4AAMKsI-fd2598a2-55e9-49ed-9369-a6953e38c65d.png") (Join-Path $gallery "12.png")

Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_image-038513fc-c408-4504-84d7-83f6986982e0.png") (Join-Path $public "hero-v2.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_image-743a73d5-7a12-4c1b-810f-4a6d1e22907b.png") (Join-Path $public "hero-bg.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_image-4f1a20c2-e5eb-436f-a065-4c870b904562.png") (Join-Path $public "media-kit.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_image-038513fc-c408-4504-84d7-83f6986982e0.png") (Join-Path $public "profile.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_image-da9db4f8-792f-46c3-aeb7-9c0d81976334.png") (Join-Path $works "stakestone.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_image-b3e18a9b-a7be-47da-965c-21282f908da6.png") (Join-Path $works "boarding-bridge.png")
Copy-Item -Force (Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_image-d13a75ff-a26c-4498-b80d-c0e21fc47504.png") (Join-Path $works "mantle-creator-awards.png")
$logoSource = Join-Path $assetsRoot "c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_4fbd4bf3f82dff39976546755c087eff_images_ChatGPT_Image_2026_2_13__05_39_49-d12b7964-a6b2-4ee0-a57c-b21d6460b1bc.png"
$logoTarget = Join-Path $public "logo-v2.png"
$logoPadding = 48

try {
  Add-Type -AssemblyName System.Drawing
  $logoBitmap = New-Object System.Drawing.Bitmap $logoSource
  $logoBitmap.MakeTransparent([System.Drawing.Color]::Black)
  $width = $logoBitmap.Width + ($logoPadding * 2)
  $height = $logoBitmap.Height + ($logoPadding * 2)
  $canvas = New-Object System.Drawing.Bitmap $width, $height
  $graphics = [System.Drawing.Graphics]::FromImage($canvas)
  $graphics.Clear([System.Drawing.Color]::Transparent)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.DrawImage($logoBitmap, $logoPadding, $logoPadding, $logoBitmap.Width, $logoBitmap.Height)
  $canvas.Save($logoTarget, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $canvas.Dispose()
  $logoBitmap.Dispose()
} catch {
  Copy-Item -Force $logoSource $logoTarget
}
