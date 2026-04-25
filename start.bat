@echo off
echo Starting Face Recognition App...
echo Starting backend...
start "Backend" cmd /k "cd Backend && venv\Scripts\activate && python server.py"
start "frontend" cmd /k "cd Frontend && npm run dev"
echo Both servers running!
echo    Frontend: http://localhost:5173
echo    Backend:  http://localhost:5000