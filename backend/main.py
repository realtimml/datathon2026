from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Datathon 2026 API",
    description="Backend API for Datathon 2026 application",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["test", "localhost link"],  # connect to react dev server :)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root(): # where the fastAPI runs from (root)
    """Root endpoint - welcome message test"""
    return {
        "message": "Welcome to Datathon 2026 API",
        "status": "running",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint to check if the server is running and working properly -dz"""
    return {"status": "healthy"}

# TODO: Additional endpoints for user management, data processing, etc. can be added here