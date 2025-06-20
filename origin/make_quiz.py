# import openai
# import os
# import json
# from dotenv import load_dotenv
#
# # 1. API 키 불러오기
# load_dotenv()
# api_key = os.getenv("API_KEY")
# if not api_key:
#     raise RuntimeError(" API_KEY가 .env에서 불러와지지 않았습니다.")
#
# openai.api_key = api_key
#
# # 2. 요약 함수
# def summarize_text(text: str, model="gpt-3.5-turbo") -> str:
#     system_prompt = (
#         "너는 교육 내용을 요약하는 AI입니다. 핵심 개념, 원리, 정의 등을 "
#         "가능한 간결하게 정리하되, 내용이 많은 경우는 문장 수를 늘려도 좋습니다. "
#         "최소 3~7문장 이내로 요약해주세요."
#     )
#
#     user_prompt = f"""다음은 OCR로 추출된 텍스트야. 핵심만 요약해줘:\n\n{text}"""
#
#     response = openai.ChatCompletion.create(
#         model=model,
#         messages=[
#             {"role": "system", "content": system_prompt},
#             {"role": "user", "content": user_prompt}
#         ],
#         temperature=0.4,
#         max_tokens=500
#     )
#
#     return response["choices"][0]["message"]["content"].strip()
#
# # 3. 문제 생성 함수
# def generate_questions(text: str, model="gpt-3.5-turbo") -> str:
#     system_prompt = "너는 교육 내용을 바탕으로 대표적인 문제를 출제하는 AI 선생님입니다."
#
#     user_prompt = f"""
# 다음 요약 내용을 바탕으로 문제를 만들어줘:
#
# 조건:
# - OX 또는 객관식으로 문제를 3~6개 정도 만들어주세요.
# - 요약 문장이 적으면 2~3문제, 길면 최대 6문제까지 출제해도 좋습니다.
# - 각 문제마다 반드시 정답을 함께 표기해주세요.
#
# 요약 내용:
# {text}
#
# 형식:
# (객관식)
# A. ...
# B. ...
# C. ...
# D. ...
# 정답: A
#
#
# (OX 문제)
# 문제: ...
# 정답: O 또는 X
# """
#
#     response = openai.ChatCompletion.create(
#         model=model,
#         messages=[
#             {"role": "system", "content": system_prompt},
#             {"role": "user", "content": user_prompt}
#         ],
#         temperature=0.5,
#         max_tokens=500
#     )
#
#     return response["choices"][0]["message"]["content"].strip()
#
#
# # 4. 실행 예시
# if __name__ == "__main__":
#     ocr_text = """
#     뉴턴의 제1법칙은 외부에서 힘이 작용하지 않을 때 물체는 현재 상태를 계속 유지하려는 성질을 설명한다.
#     정지해 있는 물체는 계속 정지해 있고, 움직이는 물체는 같은 속도로 같은 방향으로 계속 움직이려 한다.
#     """
#
#     print("[요약 결과]")
#     summary = summarize_text(ocr_text)
#     print(summary)
#
#     print("\n[문제 생성 결과]")
#     quiz = generate_questions(summary)
#     print(quiz)

import openai
from openai import OpenAI
import os
from dotenv import load_dotenv

# 환경 변수 로딩
load_dotenv()
api_key = os.getenv("API_KEY")
if not api_key:
    raise RuntimeError(" API_KEY가 .env에서 불러와지지 않았습니다.")

client = OpenAI(api_key=api_key)

def summarize_text(text: str, model="gpt-3.5-turbo") -> str:
    system_prompt = (
        "너는 교육 내용을 요약하는 AI입니다. 핵심 개념, 원리, 정의 등을 "
        "가능한 간결하게 정리하되, 내용이 많은 경우는 문장 수를 늘려도 좋습니다. "
        "최소 3~7문장 이내로 요약해주세요."
    )

    user_prompt = f"""다음은 OCR로 추출된 텍스트야. 핵심만 요약해줘:\n\n{text}"""

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.4,
        max_tokens=500
    )

    return response.choices[0].message.content.strip()


def generate_questions(text: str, model="gpt-3.5-turbo") -> str:
    system_prompt = "너는 교육 내용을 바탕으로 대표적인 문제를 출제하는 AI 선생님입니다."
    user_prompt = f"""
다음 요약 내용을 바탕으로 문제를 만들어줘:

조건:
- OX 또는 객관식으로 문제를 3~6개 정도 만들어주세요.
- 요약 문장이 적으면 2~3문제, 길면 최대 6문제까지 출제해도 좋습니다.
- 각 문제마다 반드시 정답을 함께 표기해주세요.

요약 내용:
{text}

형식:
(객관식)
A. ...
B. ...
C. ...
D. ...
정답: A


(OX 문제)
문제: ...
정답: O 또는 X
"""

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.5,
        max_tokens=500
    )

    return response.choices[0].message.content.strip()


if __name__ == "__main__":
    ocr_text = """
    뉴턴의 제1법칙은 외부에서 힘이 작용하지 않을 때 물체는 현재 상태를 계속 유지하려는 성질을 설명한다.
    정지해 있는 물체는 계속 정지해 있고, 움직이는 물체는 같은 속도로 같은 방향으로 계속 움직이려 한다.
    """

    print("[요약 결과]")
    summary = summarize_text(ocr_text)
    print(summary)

    print("\n[문제 생성 결과]")
    quiz = generate_questions(summary)
    print(quiz)