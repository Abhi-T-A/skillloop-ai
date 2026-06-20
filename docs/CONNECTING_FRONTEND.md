Local connection steps

- Backend: start from repository root

```powershell
cd Backend
./mvnw.cmd spring-boot:run
```

- Frontend: start from repository root

```bash
cd frontend
npm install
npm run dev
```

- Frontend API base URL
  - By default the frontend uses `VITE_API_BASE` or falls back to `http://localhost:8080`.
  - To override: create a `.env` file in `frontend` with `VITE_API_BASE=http://localhost:8080`

- CORS
  - Backend `SecurityConfig` enables CORS for `http://localhost:5173` and allows credentials.

- Quick test
  - Open http://localhost:5173 in browser and perform login/register or visit `http://localhost:8080/api/test` to verify backend.
