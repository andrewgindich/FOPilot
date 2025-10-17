# Сервісний шар для логіки податків

import httpx
from fastapi import HTTPException, status
from core.config import settings
from models.tax import TaxCalculationRequest, TaxCalculationResponse, PaymentRequest, PaymentResponse

# Константи для розрахунку (на базі даних 2025 року)
# Мінімальна ЗП = 8000 грн
# ЄСВ (22% від МЗП) = 1760 грн/місяць
MIN_SOCIAL_CONTRIBUTION_MONTHLY = 1760.00
MIN_SOCIAL_CONTRIBUTION_QUARTERLY = MIN_SOCIAL_CONTRIBUTION_MONTHLY * 3
SINGLE_TAX_RATE = 0.05  # 5% для 3-ї групи


def calculate_taxes(data: TaxCalculationRequest) -> TaxCalculationResponse:
    """
    Розраховує податки для ФОП 3-ї групи.
    """
    single_tax = round(data.quarterly_income * SINGLE_TAX_RATE, 2)
    social_contribution = MIN_SOCIAL_CONTRIBUTION_QUARTERLY

    total_tax = round(single_tax + social_contribution, 2)

    return TaxCalculationResponse(
        single_tax=single_tax,
        social_contribution=social_contribution,
        total_tax=total_tax
    )


async def create_mono_payment(payment_data: PaymentRequest) -> PaymentResponse:
    """
    Створює інвойс (рахунок) на оплату через Monobank Acquiring API.
    """
    headers = {
        "X-Token": settings.MONOBANK_API_TOKEN
    }

    payload = {
        "amount": int(payment_data.amount * 100),  # Monobank приймає суму в копійках
        "ccy": 980,  # 980 = UAH
        "merchantPaymInfo": {
            "destination": payment_data.destination
        },
        "redirectUrl": "https://github.com/andrewgindich/FOPilot"  # Заміни на сторінку успішної оплати
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{settings.MONOBANK_API_URL}/api/merchant/invoice/create",
                json=payload,
                headers=headers
            )

            response.raise_for_status()  # Генерує помилку, якщо статус не 2xx

            data = response.json()
            return PaymentResponse(
                invoice_id=data["invoiceId"],
                payment_page_url=data["pageUrl"]
            )

        except httpx.HTTPStatusError as e:
            raise HTTPException(
                status_code=e.response.status_code,
                detail=f"Monobank API error: {e.response.text}"
            )
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Internal error: {str(e)}"
            )