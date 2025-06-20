from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def home(request):
    return render(request, 'main/index.html')

# main/views.py
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.conf import settings

def image_upload(request):
    if request.method == 'POST' and request.FILES.get('image'):
        print("업로드 요청 들어왔음.")
        image_file = request.FILES['image']
        fs = FileSystemStorage(location=settings.MEDIA_ROOT)  # Mac의 media/ 디렉토리에 저장
        filename = fs.save(image_file.name, image_file)
        file_url = fs.url(filename)
        print("=====================")
        print(file_url + "=================")
        return render(request, 'main/upload_result.html', {'file_url': file_url})
    return render(request, 'main/upload_form.html')