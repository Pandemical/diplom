from fastapi import FastAPI, HTTPException
import traceback
from ml_logic import get_recommendations_for_user

app = FastAPI()

@app.get("/api/predict/{user_id}")
async def predict(user_id: int):
    try:
        results = get_recommendations_for_user(user_id)
        return {
            "user_id": user_id,
            "results": results
        }
    except Exception as e:
        print("❌ Ошибка в /predict:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))