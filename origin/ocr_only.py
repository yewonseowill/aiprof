import fitz  # PyMuPDF
from PIL import Image
import pytesseract
import sys
import io

def extract_text_from_pdf(path):
    doc = fitz.open(path)
    full_text = []

    for page_num, page in enumerate(doc, start=1):
        # 먼저 텍스트 추출 시도
        text = page.get_text("text").strip()
        if text:
            full_text.append(text)
        else:
            # 텍스트가 없으면 이미지로 변환하여 OCR 수행
            try:
                pix = page.get_pixmap(dpi=300)  # 해상도 향상
                img = Image.open(io.BytesIO(pix.tobytes("png")))
                ocr = pytesseract.image_to_string(img, lang='eng+kor')
                full_text.append(f"[페이지 {page_num} OCR 결과]\n" + ocr.strip())
            except Exception as e:
                full_text.append(f"[페이지 {page_num} OCR 실패]: {str(e)}")

    return "\n\n".join(full_text)

def extract_text_from_image(path):
    try:
        img = Image.open(path)
        text = pytesseract.image_to_string(img, lang='eng+kor')
        return text.strip()
    except Exception as e:
        return f"이미지 OCR 실패: {str(e)}"

def main(image_file):
    # if len(sys.argv) < 2:
    #     print("사용법: python ocr_only.py 파일경로")
    #     sys.exit(1)
    #
    # path = sys.argv[1]
    path = image_file;
    print(f"입력 파일 경로: {path}")

    if path.lower().endswith('.pdf'):
        text = extract_text_from_pdf(path)
    elif path.lower().endswith(('.png', '.jpg', '.jpeg', '.tif', '.bmp')):
        text = extract_text_from_image(path)
    else:
        print("지원하지 않는 파일 형식입니다.")
        sys.exit(1)

    print("\n=== 추출된 텍스트 ===\n")
    print(text)

if __name__ == "__main__":
    main()