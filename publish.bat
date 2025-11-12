@echo off
setlocal EnableDelayedExpansion

for /F %%a in ('echo prompt $E ^| cmd') do (
    set "ESC=%%a"
)

cd /d "%~dp0"

git add -A

for /f "tokens=1-4 delims=/- " %%a in ('date /t') do (
    set day=%%a
    set month=%%b
    set year=%%c
)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set hour=%%a
    set minute=%%b
)

set commitMsg=Auto update %year%-%month%-%day% %hour%:%minute%
git commit -m "%commitMsg%"
git push

echo.
echo.
echo.
echo %ESC%[32mPublish is completed!%ESC%[0m

pause
