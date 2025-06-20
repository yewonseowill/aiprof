# VLM 파트 - 이미지 텍스트 추출 테스트용 코드
# 본 코드는 VLM 테스트용으로 OCR(Tesseract) 기능 포함 했습니다.
# 테스트 목적으로 OCR 코드를 포함했으며, 코드 통합 시에 분리 가능합니다.

import cv2
import pytesseract
import matplotlib.pyplot as plt
def vlm_main(image_file) :
    # Tesseract 설치 경로 지정 (Windows 전용 => Mac용으로 변환함)
    pytesseract.pytesseract.tesseract_cmd = r"/opt/homebrew/bin/tesseract"

    # 분석할 이미지 파일 경로 지정
    image_path = image_file;

    # 이미지 불러오기 및 전처리
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(
        blurred, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        25, 11
    )

    # 이미지에서 텍스트 추출 (한글 + 영어 혼합 인식)
    # --oem 3: LSTM 기반 OCR 엔진 사용
    # --psm 6: 문단 단위 블록으로 인식
    custom_config = r'--oem 3 --psm 6'
    text = pytesseract.image_to_string(thresh, lang='kor+eng', config=custom_config)

    # 결과 출력
    print("추출된 텍스트:\n")
    print(text)
    return text;

# 전처리된 이미지 시각화 (옵션)
# plt.figure(figsize=(10, 8))
# plt.imshow(thresh, cmap='gray')
# plt.title("전처리된 이진화 이미지")
# plt.axis("off")
# plt.tight_layout()
# plt.show()


#OCR 없는 VLM 파트

# import matplotlib.pyplot as plt


# # 결과 출력
# print(" VLM 텍스트 입력:\n")
# print(text)

# # (옵션) 시각화 요소: 추출된 텍스트를 이미지로 보여주기
# def show_text_as_image(text):
#     import numpy as np
#     from PIL import Image, ImageDraw, ImageFont

#     font = ImageFont.truetype("malgun.ttf", 20)  # Windows용 한글 폰트
#     lines = text.strip().split('\n')
#     width = 800
#     height = 30 * len(lines) + 20

#     img = Image.new("RGB", (width, height), color="white")
#     draw = ImageDraw.Draw(img)

#     for i, line in enumerate(lines):
#         draw.text((10, 30 * i + 10), line, font=font, fill="black")

#     return img

# img = show_text_as_image(text)
# plt.figure(figsize=(10, 6))
# plt.imshow(img)
# plt.axis("off")
# plt.title("VLM 텍스트 입력 시각화")
# plt.tight_layout()
# plt.show()