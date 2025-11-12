@echo off
setlocal EnableDelayedExpansion

for /F %%a in ('echo prompt $E ^| cmd') do (
    set "ESC=%%a"
)

cd /d "%~dp0"

git pull origin main

echo.
echo %ESC%[32mDone!%ESC%[0m

pause