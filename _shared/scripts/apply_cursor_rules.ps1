param(
  [string]$WorkRoot = "C:\work",
  [switch]$Force
)

# Prefer UTF-8 console I/O to reduce mojibake in mixed environments.
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
try { [Console]::InputEncoding = [System.Text.UTF8Encoding]::new($false) } catch {}

$projectsRoot = Join-Path $WorkRoot "projects"
$sharedRoot   = Join-Path $WorkRoot "_shared"
$sharedRulesCandidates = @(
  (Join-Path $sharedRoot "ai\.cursorrules.shared"),
  (Join-Path $sharedRoot "ai\.cursorrules.shared.txt")
)
$sharedRules = $sharedRulesCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (!(Test-Path $projectsRoot)) { throw "projects folder not found: $projectsRoot" }
if (!(Test-Path $sharedRoot))   { throw "_shared folder not found: $sharedRoot" }
if (!$sharedRules) {
  throw "shared rules file not found. checked: $($sharedRulesCandidates -join ', ')"
}

Get-ChildItem -Path $projectsRoot -Directory | ForEach-Object {
  $proj = $_.FullName

  # 1) 各プロジェクト直下に _shared (junction) を作る
  $junction = Join-Path $proj "_shared"
  if (!(Test-Path $junction)) {
    cmd /c "mklink /J `"$junction`" `"$sharedRoot`"" | Out-Null
    Write-Host "[OK] junction: $junction"
  } else {
    Write-Host "[SKIP] junction exists: $junction"
  }

  # 2) .cursorrules を共通ファイルへのハードリンクにする
  $ruleLink = Join-Path $proj ".cursorrules"
  if (Test-Path $ruleLink) {
    if ($Force) {
      Remove-Item $ruleLink -Force
      Write-Host "[RM] existing .cursorrules: $ruleLink"
    } else {
      Write-Host "[SKIP] .cursorrules exists: $ruleLink  (use -Force to overwrite)"
      return
    }
  }

  cmd /c "mklink /H `"$ruleLink`" `"$sharedRules`"" | Out-Null
  Write-Host "[OK] hardlink: $ruleLink"
}

Write-Host "Done."
