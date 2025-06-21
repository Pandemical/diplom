from sqlalchemy import create_engine
import pandas as pd
from sklearn.linear_model import LinearRegression
from datetime import datetime

# Подключение к PostgreSQL (Проверь порт, логин/пароль/название БД!)
DB_URL = "postgresql://postgres:root@localhost:5432/diplomversion1"
engine = create_engine(DB_URL)

def fetch_transactions(user_id: int):
    query = f"""
        SELECT t.date, t.amount, c.name AS category
        FROM transactions t
        JOIN category_transactions c ON c.id = t."categoryTransactionId"
        JOIN bills b ON b.id = t."billId"
        WHERE b."userId" = {user_id}
    """
    df = pd.read_sql(query, engine)
    return df

def get_recommendations_for_user(user_id: int):
    df = fetch_transactions(user_id)
    if df.empty:
        return []

    # Исключаем доход
    df = df[df['category'].str.lower() != 'доход']

    df['date'] = pd.to_datetime(df['date'])
    df['month_num'] = df['date'].dt.to_period('M').apply(lambda x: x.ordinal)

    results = []

    # --- Общий прогноз ---
    monthly_total = df.groupby('month_num')['amount'].sum().reset_index()
    if len(monthly_total) >= 2:
        X_total = monthly_total[['month_num']]
        y_total = monthly_total['amount']

        model_total = LinearRegression()
        model_total.fit(X_total, y_total)

        next_month_num = monthly_total['month_num'].max() + 1
        predicted_total = int(model_total.predict([[next_month_num]])[0])
        past_avg_total = int(y_total.mean())

        if predicted_total > past_avg_total * 1.2:
            percent_total = int((predicted_total - past_avg_total) / past_avg_total * 100)
            recommendation_total = (
                f"В следующем месяце вы, вероятно, потратите {predicted_total}₽ — "
                f"это на {percent_total}% выше средней нормы ({past_avg_total}₽). "
                f"Рекомендуем сократить траты."
            )
        else:
            recommendation_total = f"Общие расходы в пределах нормы ({predicted_total}₽). Всё хорошо."

        results.append({
            "type": "Общий прогноз",
            "predicted": predicted_total,
            "average": past_avg_total,
            "recommendation": recommendation_total
        })

    # --- Проверка категорий на перерасход ---
    for cat in df['category'].unique():
        cat_df = df[df['category'] == cat]
        if len(cat_df) < 2:
            continue

        monthly_sum = cat_df.groupby('month_num')['amount'].sum().reset_index()
        if len(monthly_sum) < 2:
            continue

        X = monthly_sum[['month_num']]
        y = monthly_sum['amount']

        model = LinearRegression()
        model.fit(X, y)

        next_month_num = df['month_num'].max() + 1
        predicted = int(model.predict([[next_month_num]])[0])
        past_avg = int(y.mean())

        if predicted > past_avg * 1.2:
            percent = int((predicted - past_avg) / past_avg * 100)
            results.append({
                "type": "Предупреждение по категории",
                "category": cat,
                "predicted": predicted,
                "average": past_avg,
                "recommendation": (
                    f"Ожидаются повышенные траты на {cat} — {predicted}₽, "
                    f"что на {percent}% выше средней нормы ({past_avg}₽). "
                    f"Рекомендуем сократить расходы в этой категории."
                )
            })

    return results

