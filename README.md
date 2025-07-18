
# aiprof (AI 교수님 학습 시스템)

![image](https://github.com/user-attachments/assets/adf71040-317a-4eb4-88e1-284330089b66)


![image](https://github.com/user-attachments/assets/8ce7484a-a81a-4913-9232-e273aecb4bf8)




<hr>

🎥 시연 영상 [![Watch the video](https://img.shields.io/badge/YouTube-영상보기-red?logo=youtube)](https://youtu.be/IkvJoR0f8uM?si=LpYKX-VWKfVkvkfA)



<hr>

📌 project 진행 과정  --> https://github.com/users/yewonseowill/projects/2/views/1

![image](https://github.com/user-attachments/assets/5eb11233-d157-4060-bb7a-0120696ecf92)


<hr>

📌 project 주요 노트  --> https://github.com/yewonseowill/aiprof/issues

<br>

![image](https://github.com/user-attachments/assets/19b0cf2d-afd9-43c0-a847-d0d681638e1f)


![image](https://github.com/user-attachments/assets/6d4311b9-a966-47b6-9316-ac71dc215fdf)

<hr>

📌 project 구조 <br>

![image](https://github.com/user-attachments/assets/55a609e7-b35e-4f06-ac96-712ccc57e903)


<hr>

📌 project 주요 기술 스택 🔗 https://github.com/yewonseowill/aiprof/issues/14

![image](https://github.com/user-attachments/assets/84b2b049-fa27-4404-a637-c0e930b56eee)

<br>

<html>
<body>

<hr>
<h2> 전체 기술 스택 구성</h2>
<h3>1. <strong>프론트엔드 (Frontend)</strong></h3>

기술 | 설명
-- | --
HTML5 / CSS3 | 웹 페이지의 구조 및 스타일 지정
Bootstrap 5 | 반응형 UI 프레임워크 활용 (버튼, 카드 등)
Pretendard 폰트 | 사용자 지정 웹폰트로 UI 일관성 확보
Vanilla JS | 버튼 이벤트 핸들링 및 AJAX 가능
Static files (Django) | css/style.css, js/script.js, images/aiprof.png 등의 정적 리소스를 템플릿에 적용

<hr>


</body>
</html>


### **2. 백엔드 (Backend) - Django 기반**
| 기술/모듈          | 설명                                                                 |
|-------------------|----------------------------------------------------------------------|
| Django 4.x        | Python 기반의 웹 프레임워크                                           |
| views.py          | 이미지 업로드, OCR, VLM, LLM 요약 및 문제생성 요청 처리               |
| 템플릿 엔진        | `index.html`, `upload_result.html` 등 Jinja-like 문법 사용 (`{% %}`, `{{ }}`) |
| FileSystemStorage | 업로드된 이미지를 로컬 파일 시스템(Mac) 내 `/media/` 디렉토리에 저장     |
| CSRF 토큰         | `{% csrf_token %}`으로 POST 요청 보안 처리                            |
| URL reverse       | `{% url 'image_upload' %}` 식의 URL 자동 생성                        |

<hr>

### **3. AI 기능 연동 (서버 사이드 Python 연동)**
| 기능                              | 사용 모듈                             | 설명                                                   |
|-----------------------------------|----------------------------------------|--------------------------------------------------------|
| **OCR**                           | `pytesseract`, `cv2` (OpenCV)          | 이미지에서 텍스트 인식 및 추출                         |
| **VLM (Vision-Language Model)**   | `vlm_main()`                           | 이미지 기반 텍스트 분석 (시각 정보 해석 등)            |
| **LLM 요약**                      | OpenAI GPT (`summarize_text`)          | GPT 모델을 통한 텍스트 요약                            |
| **LLM 문제생성**                  | OpenAI GPT (`generate_questions`)      | GPT 모델을 통한 퀴즈 자동 생성                         |
| **모델 API 연동**                | `openai`, `dotenv`                     | `.env`에 저장된 API 키를 불러와 OpenAI와 통신         |

<hr>

### **4. 서버/파일 구조 (Mac 기반)**

| 구성 요소             | 설명                                                       |
|-----------------------|------------------------------------------------------------|
| `main/static/`        | `css/`, `js/`, `images/` 등 정적 리소스 폴더               |
| `main/templates/`     | `index.html`, `upload_result.html` 등 HTML 템플릿 파일      |
| `main/views.py`       | Django View 로직 작성 파일                                 |
| `/media/`             | Mac 로컬 디렉토리에 업로드된 이미지 저장 디렉토리         |
| 상대 경로 import       | `from main.ai.ocr_only import main` 등으로 AI 기능 분리 관리 |

<hr>

🔴 **ai/ocr_only.py** 🔗 https://github.com/yewonseowill/aiprof/issues/12

<html>
<body>
<hr>
<h2> 기술 스택 및 주요 라이브러리</h2>

분류 | 라이브러리 | 역할 및 기능 설명
-- | -- | --
PDF 처리 | fitz (PyMuPDF) | PDF 파일 열기, 페이지 접근, 텍스트 추출, 이미지 렌더링 등
이미지 처리 | PIL.Image (Pillow) | OCR 전 이미지 객체로 변환
OCR | pytesseract | 이미지에서 한글 및 영어 텍스트 추출
시스템 제어 | sys, io | 인자 처리 및 바이너리 이미지 → 스트림 변환
언어 설정 | 'eng+kor' | 영어와 한글 동시 인식 가능하도록 OCR 언어 설정


<hr>

</body>
</html>

🔴 **ai/vlm.py** 🔗  https://github.com/yewonseowill/aiprof/issues/13

<html>
<body>
<hr>
 
분류 | 사용 라이브러리 | 설명
-- | -- | --
이미지 처리 | cv2 (OpenCV) | 이미지 불러오기, 흑백 변환, 블러링, 적응 임계처리 등
OCR | pytesseract | 전처리된 이미지로부터 텍스트 인식 (한글+영어)
시각화 | matplotlib.pyplot | 이미지 및 텍스트 시각화 (옵션)
텍스트 이미지화 | PIL.Image, ImageDraw, ImageFont | OCR 결과 텍스트를 이미지로 변환해 시각적으로 표현
기타 | numpy | 텍스트 이미지를 다룰 때 배열 조작에 활용 (옵션에서만 사용)


<hr>
</body>
</html>

🔴 **ai/make_quiz.py** 🔗  https://github.com/yewonseowill/aiprof/issues/11

<html>
<body>
<hr>
 
분류 | 사용 기술/라이브러리 | 설명
-- | -- | --
언어 | Python 3.x | 전체 구현 언어
LLM API | openai | GPT-3.5-turbo 모델을 이용하여 텍스트 요약 및 문제 생성
API 클라이언트 | OpenAI (from openai) | OpenAI(api_key=...)로 새로운 클라이언트 인스턴스 생성 (v1 SDK 방식)
환경 변수 관리 | python-dotenv (load_dotenv) | .env 파일에서 API 키를 불러오기 위한 라이브러리
환경 설정 | .env 파일 + os.getenv() | API 키를 안전하게 관리 및 호출
텍스트 처리 | 사용자 정의 함수 summarize_text, generate_questions | OCR로 추출된 텍스트 요약 및 문제 생성 담당
문제 포맷 | OX, 객관식 | 생성된 문제는 지정된 포맷에 맞게 정답 포함하여 출력
입출력 구조 | print() + __main__ 블록 | 콘솔 기반 실행 테스트용 예제 포함


<hr>
</body>
</html>


<hr>

📌 project 주요 화면

<br>

![스크린샷 2025-06-20 오후 8 38 01](https://github.com/user-attachments/assets/4088ec9c-4a4b-4877-bcf2-8984e62f0f3a)

<br>

![스크린샷 2025-06-20 오후 8 37 52](https://github.com/user-attachments/assets/0e8d9559-b6ee-4fd7-8507-ca2cf786d2e1)

![스크린샷 2025-06-20 오후 8 40 33](https://github.com/user-attachments/assets/46542d48-d9d5-431b-82c0-6a9405040d68)

<hr>

![2025-06-22 09 56 59](https://github.com/user-attachments/assets/edc46120-96e6-4665-9d22-b71862392e1a)


🟢 ## 파일 업로드 ## 🔗  https://github.com/yewonseowill/aiprof/issues/7

![스크린샷 2025-06-20 오후 9 15 11](https://github.com/user-attachments/assets/32c194d0-5b86-4378-a614-91217a6779e0)

1. **인터페이스 (HTML + JavaScript)**

- 웹 페이지에서 이미지를 선택한 후 업로드 버튼을 누름
- 업로드 페이지 템플릿: upload_form.html
- 업로드한 이미지는 form 태그를 통해 /upload/ 주소로 POST 전송
- 업로드한 이미지가 PDF이면 PDF 아이콘이, 이미지 파일이면 실제 이미지가 출력
- 업로드 이후에는 upload_result.html 템플릿이 렌더링되며, 버튼(ocr, vlm, summary, quiz)을 선택할 수 있는 화면이 나타남.

<hr>

2. **Django 서버** 

🔵 **urls.py**

```

path('upload/', views.image_upload, name='image_upload')

```

- /upload/ URL 요청이 들어오면 views.image_upload 함수로 연결됨

<br>

🔵 **views.py**

(1) image_upload
- 사용자가 업로드한 이미지 파일을 media/ 폴더에 저장
- 저장된 경로와 파일명을 템플릿에 전달하여, 이후 기능 요청 시 사용할 수 있도록 함.

```
image_file = request.FILES['image']
filename = fs.save(image_file.name, image_file)
return render(request, 'main/upload_result.html', {'file_url': file_url, 'filename': filename})

```

<hr>

![2025-06-22 09 56 45](https://github.com/user-attachments/assets/15a14b86-61ae-4c31-944f-a084dda3de9d)


🟢 ## OCR처리 ## 🔗  https://github.com/yewonseowill/aiprof/issues/6

![스크린샷 2025-06-20 오후 9 14 06](https://github.com/user-attachments/assets/37d3b2ad-a708-4031-b795-80dcab54cf2f)

**1. 인터페이스** 

- 웹 UI에서 이미지 또는 PDF를 업로드함.
- 업로드된 파일은 media/ 폴더에 저장되며, Django가 URL을 통해 접근할 수 있도록 함.
- UI에는 다음 기능 버튼이 있음.<br>
1-1. OCR: 이미지 또는 PDF의 텍스트를 추출<br>
1-2. VLM: 이미지 설명 생성 (이미지에만 사용 가능)<br>
1-3. LLM 요약: OCR/VLM 결과를 GPT로 요약<br>
1-4. LLM 문제: GPT로 문제 생성<br>

<hr>

**2. Django 서버**
<br>

🔵   **urls.py**

```
path('ocr/', views.ocr, name='ocr')
```

- 클라이언트에서 /ocr/ 주소로 요청을 보낼 수 있게 함
- 모든 기능(VLM, SUM, QUIZ 등)도 비슷한 방식으로 연결됨

🔵    **views.py**

- views.ocr() 함수는 클라이언트의 요청을 받고,
- /media/ 폴더 내 실제 파일 경로를 기준으로 OCR 처리를 시작

```
image_file = "/Users/.../media/" + request.POST['filename']
result_text = main(image_file)  # ocr_only.main() 호출
```
- 처리 결과는 문자열 형태로 응답 (HttpResponse(result_text))
 
🔵   **ocr_only.py(AI 처리 로직)**
- main() 함수는 확장자에 따라 다른 처리:
- pdf: extract_text_from_pdf(): PyMuPDF + PIL + Tesseract로 OCR
- 이미지: extract_text_from_image()로 직접 OCR 수행
- 결과는 정제된 텍스트 형태로 반환됨

```
if path.lower().endswith('.pdf'):
    text = extract_text_from_pdf(path)
else:
    text = extract_text_from_image(path)
```
<br>
<hr>

**3. 결과 전송 및 렌더링**

- 클라이언트가 받은 응답 텍스트는 resultArea에 표시됨


<hr>

![2025-06-22 09 56 36](https://github.com/user-attachments/assets/11e8825c-8bde-4315-9fe7-9148a837bb52)


🟢 ## VML처리 ## 🔗 https://github.com/yewonseowill/aiprof/issues/8
![스크린샷 2025-06-20 오후 9 32 11](https://github.com/user-attachments/assets/9f892505-aa41-483f-a5b0-135d9f940b4b)



**1.  사용자가 VLM 버튼 클릭**
- 업로드 후 보여지는 화면(upload_result.html)에서 VLM 버튼을 누르면 JavaScript가 작동함.
- 버튼을 누르면 파일이름을 함께  Django 서버로 보냄. 주소는  /vlm/ 

<hr>

**2. Django 서버 처리**

🔵  **urls.py**

```

path('vlm/', views.vlm, name='vlm')

```

🔵  **views.py**

```

def vlm(request):
    image_file = "media/..." + filename
    result_text = vlm_main(image_file)
    return HttpResponse(result_text)

```

- 서버는 전달받은 filename을 통해 읽어올 파일경로와 파일명을 만듦.
- vlm_main() 함수를 호출하여 이미지를 추출하고 텍스트로 요약함.

<hr>

**3. 이미지에서 텍스트 추출**

```

def vlm_main(image_file):
    image = cv2.imread(image_file)
    gray → blur → adaptiveThreshold 적용
    text = pytesseract.image_to_string(...)
    return text
```
- OpenCV로 이미지 전처리를 하고, pytesseract로 텍스트를 인식함.

<hr>

![image](https://github.com/user-attachments/assets/97777e4a-d813-4595-82b3-d7e39b405a72)


🟢 ## LLM(요약) 처리 ##  🔗 https://github.com/yewonseowill/aiprof/issues/9

![스크린샷 2025-06-20 오후 9 27 56](https://github.com/user-attachments/assets/5b510aba-2057-4d49-a5fc-92d87dbf2cb4)

**1. 요약 버튼 클릭**
- 버튼 ID: summaryBtn
- JavaScript에서 resultArea의 텍스트를 가져와 서버로 POST 전송

```

formData.append('result', result);
fetch('/sum/', { method: 'POST', body: formData, ... })

```

<hr>

**2. Django 서버의 views.py**

```

def sum(request):
    result = request.POST['result']
    result_text = summarize_text(result)
    return HttpResponse(result_text)

```

- 요약할 텍스트를 summarize_text() 함수에 전달

<hr>

**3. 요약 처리 (make_quiz.py)**

```

def summarize_text(text: str, model="gpt-3.5-turbo"):
    system_prompt = "너는 교육 내용을 요약하는 AI입니다..."
    user_prompt = f"다음은 OCR로 추출된 텍스트야...\n\n{text}"

    response = client.chat.completions.create(...)
    return response.choices[0].message.content.strip()

```
- 시스템 프롬프트와 사용자 입력을 기반으로 GPT가 3~7문장으로 요약
  
<hr>

🟢 ## LLM(문제출제) 처리 ##  🔗 https://github.com/yewonseowill/aiprof/issues/9

![스크린샷 2025-06-20 오후 9 30 25](https://github.com/user-attachments/assets/f5181d7b-ea94-475e-9919-6555efc6e44b)

**1. 문제 버튼 클릭**
- 요약된 결과를 resultArea에서 읽어 POST로 /quiz/ 전송

```

formData.append('result', result);
fetch('/quiz/', { method: 'POST', body: formData, ... })

```

<hr>

**2. Django 서버의 views.py**

```

def quiz(request):
    result = request.POST['result']
    result_text = generate_questions(result)
    return HttpResponse(result_text)

```

<hr>

**3. 문제 생성 처리 (make_quiz.py)**

```

def generate_questions(text: str, model="gpt-3.5-turbo"):
    system_prompt = "너는 문제를 출제하는 AI 선생님입니다."
    user_prompt = f"""
    다음 요약 내용을 바탕으로 문제를 만들어줘...
    (객관식), (OX문제) 포함
    """
    response = client.chat.completions.create(...)
    return response.choices[0].message.content.strip()

```



<hr>



