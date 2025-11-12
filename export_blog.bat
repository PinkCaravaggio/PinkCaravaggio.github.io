@echo off
setlocal EnableDelayedExpansion

for /F %%a in ('echo prompt $E ^| cmd') do (
    set "ESC=%%a"
)

cd /d "%~dp0"
node "src/lib/cmd.js" -blog -all

echo %ESC%[32mExport Complete!%ESC%[0m
echo Please run %ESC%[34m"publish.bat"%ESC%[0m to publish to the web

pause
