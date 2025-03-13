@echo off
echo Checking prerequisites...

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker is not running. Please start Docker Desktop first.
    exit /b 1
)

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Copy env file
echo Setting up environment...
copy .env.example .env
if %errorlevel% neq 0 (
    echo Failed to copy .env file
    exit /b 1
)

REM Install dependencies
echo Installing npm packages...
call npm install
if %errorlevel% neq 0 (
    echo Failed to install npm packages
    exit /b 1
)

REM Start Docker services
echo Starting Docker services...
call docker-compose up -d
if %errorlevel% neq 0 (
    echo Failed to start Docker services
    exit /b 1
)

REM Run Prisma migrations
echo Setting up database...
call npx prisma migrate dev
if %errorlevel% neq 0 (
    echo Failed to run Prisma migrations
    exit /b 1
)

REM Install recommended VSCode extensions
echo Installing VSCode extensions...
call code --install-extension svelte.svelte-vscode
call code --install-extension ardenivanov.svelte-intellisense
call code --install-extension fivethree.vscode-svelte-snippets
call code --install-extension bradlc.vscode-tailwindcss
call code --install-extension esbenp.prettier-vscode
call code --install-extension dbaeumer.vscode-eslint
call code --install-extension prisma.prisma
call code --install-extension christian-kohler.npm-intellisense

echo Setup complete! 
echo.
echo Access points:
echo - Development server: http://localhost:5173
echo - pgAdmin: http://localhost:5050 (email: admin@example.com, password: admin)
echo - MailDev: http://localhost:8080
echo.
echo Run `npm run dev` to start the dev server!