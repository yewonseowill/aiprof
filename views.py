from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
# main/views.py
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.conf import settings

# views.py
from django.http import HttpResponse
from main.ai.ocr_only import main  # 상대경로 import
from main.ai.vlm import vlm_main
from main.ai.make_quiz import summarize_text, generate_questions

@ensure_csrf_cookie
def home(request):
    return render(request, 'main/index.html')


def image_upload(request):
    if request.method == 'POST' and request.FILES.get('image'):
        print("업로드 요청 들어왔음.")
        image_file = request.FILES['image']
        fs = FileSystemStorage(location=settings.MEDIA_ROOT)  # Mac의 media/ 디렉토리에 저장
        filename = fs.save(image_file.name, image_file)
        file_url = fs.url(filename)
        print("=====================")
        print(file_url + "=================")
        return render(request, 'main/upload_result.html', {'file_url': file_url, 'filename': filename})
    return render(request, 'main/upload_form.html')


def ocr(request):
    if request.method == 'POST':
        print("ocr 요청 들어왔음.")
        image_file = "/Users/alicia/PycharmProjects/PythonProject/media/" + request.POST['filename']

        # OCR 처리
        result_text = main(image_file)

        # 결과 반환
        return HttpResponse(result_text)

    return HttpResponse("이미지 파일이 없습니다.", status=400)

def vlm(request):
    if request.method == 'POST':
        print("vlm 요청 들어왔음.")
        image_file = "/Users/alicia/PycharmProjects/PythonProject/media/" + request.POST['filename']

        # VLM 처리
        result_text = vlm_main(image_file)

        # 결과 반환
        return HttpResponse(result_text)

    return HttpResponse("이미지 파일이 없습니다.", status=400)

def sum(request):
    if request.method == 'POST':
        print("sum 요청 들어왔음.")
        result = request.POST['result']
        print(result)


        # VLM 처리
        result_text = summarize_text(result, model="gpt-3.5-turbo")

        # 결과 반환
        return HttpResponse(result_text)

    return HttpResponse("요약하는데 문제가 생김", status=500)

def quiz(request):
    if request.method == 'POST':
        print("quiz 요청 들어왔음.")
        result = request.POST['result']

        # VLM 처리
        result_text = generate_questions(result, model="gpt-3.5-turbo")

        # 결과 반환
        return HttpResponse(result_text)

    return HttpResponse("문제생성이 되지 않음.", status=500)
