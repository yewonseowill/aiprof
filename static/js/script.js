document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadBox = document.getElementById('uploadBox');
    const uploadStatus = document.getElementById('uploadStatus');
    const preview = document.getElementById('preview');
    const clickGuide = document.getElementById('clickGuide');
    const sidebar = document.getElementById('sidebar');
    const resizer = document.getElementById('resizer');
    const resultArea = document.getElementById('resultArea');
    const answerSection = document.getElementById('answerSection');
    const ocrBtn = document.getElementById('ocrBtn');
    const summaryBtn = document.getElementById('summaryBtn');
    const quizBtn = document.getElementById('quizBtn');

    let uploadedText = '', ocrResult = '', summaryResult = '', quizQuestion = '';
    const buttons = [ocrBtn, summaryBtn, quizBtn];

    //alert("welcome-----------0")


    buttons.forEach(btn => btn?.addEventListener('click', () => {
        if (!uploadedText) return;
        buttons.forEach(b => b?.classList.remove('active'));
        btn.classList.add('active');
    }));

    uploadBox?.addEventListener('click', () => {
        if (!preview?.src || preview.style.display === 'none') fileInput.click();
        else {
            uploadBox.classList.toggle('fullscreen');
            sidebar.classList.toggle('fullscreen-hide');

        }
    });
    /*  uploadStatus?.addEventListener('click', () => fileInput.click());

      // Axios 기본 설정
      axios.defaults.withCredentials = true;  // 쿠키 포함  [oai_citation:0‡dhiwise.com](https://www.dhiwise.com/post/managing-secure-cookies-via-axios-interceptors?utm_source=chatgpt.com)
      axios.defaults.xsrfCookieName = 'csrftoken';
      axios.defaults.xsrfHeaderName = 'X-CSRFToken';  // 헤더 요청 키명  [oai_citation:1‡vsupalov.com](https://vsupalov.com/avoid-csrf-errors-axios-django/?utm_source=chatgpt.com)


      alert("welcome-----------")*/

    fileInput?.addEventListener('change', () => {
        /*    const file = fileInput.files?.[0];
            if (!file) return;

            // UI 처리
            uploadStatus?.removeAttribute('style');
            preview && (preview.style.display = 'block');
            clickGuide && (clickGuide.style.display = 'block');
            uploadBox?.classList.add('hide-text');

            const formData = new FormData();
            formData.append('image', file);

            alert("welcome")
            // Axios로 POST 전송
            axios.post('upload/', formData)
              .then(response => {
                console.log('서버 응답:', response.status);
                resultArea.innerHTML = response.data;
              })
              .catch(error => {
                console.error('업로드 실패:', error);
                resultArea.innerHTML = `<p style="color:red;">업로드 실패: ${error}</p>`;
              });*/

        const reader = new FileReader();
        reader.onload = () => {
            console.log("welcome-----------0");
            preview.src = reader.result;
            uploadedText = 'uploaded';
            ocrResult = `📄 [OCR] "${file.name}" 텍스트 인식 완료`;
            summaryResult = `📝 [요약] "${file.name}" 핵심 요약 문장`;
            quizQuestion = `🧠 [문제] "${file.name}" 기반 생성된 질문예시`;
            resultArea.innerHTML = `<p>${ocrResult}</p>`;
            answerSection.innerHTML = '';
            ocrBtn?.classList.add('active');
            buttons.forEach(b => b !== ocrBtn && b?.classList.remove('active'));
        };
        reader.readAsDataURL(file);
    });

    function showResult(text) {
        console.log("showResult ++++++++++++++++++++")
        axios.post('upload/', formData)
            .then(response => {
                console.log('서버 응답:', response.status);
                resultArea.innerHTML = response.data;
            })
            .catch(error => {
                console.error('업로드 실패:', error);
                resultArea.innerHTML = `<p style="color:red;">업로드 실패: ${error}</p>`;
            });

        if (!uploadedText) return alert('먼저 이미지를 업로드하세요.');
        resultArea.innerHTML = `<p>${text}</p>`;
        answerSection.innerHTML = '';
    }

    ocrBtn?.addEventListener('click', () => showResult(ocrResult));
    summaryBtn?.addEventListener('click', () => showResult(summaryResult));
    quizBtn?.addEventListener('click', () => {
        showResult(quizQuestion);
        answerSection.innerHTML = `
      <div style="display:flex;gap:.5rem;margin:1.5rem 0;">
        <input id="userAnswer" placeholder="예: 이 이미지는 ~~ 의미를 가집니다" style="flex:1;padding:.75rem;">
        <button id="submitAnswer" style="padding:.6rem 1.5rem;background:#38bdf8;color:#fff;">제출</button>
      </div><div id="feedback" style="margin-top:1rem;"></div>`;
        document.getElementById('submitAnswer')?.addEventListener('click', () => {
            const ua = document.getElementById('userAnswer')?.value.trim();
            const fb = document.getElementById('feedback');
            fb.innerHTML = ua
                ? (["이미지", "사진", "업로드"].some(k => ua.includes(k))
                    ? `<span style="color:green;">✅ 정답입니다!</span>`
                    : `<span style="color:orange;">🤔 핵심 단어 포함 시도해보세요.</span>`)
                : `<span style="color:red;">⚠️ 답을 입력해주세요.</span>`;
            document.getElementById('submitAnswer').disabled = true;
        });
    });

    if (resizer && sidebar) {
        let isResizing = false;
        resizer.addEventListener('mousedown', () => {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
        });
        document.addEventListener('mousemove', e => {
            if (isResizing) sidebar.style.width = Math.max(200, e.clientX) + 'px';
        });
        document.addEventListener('mouseup', () => {
            isResizing = false;
            document.body.style.cursor = 'default';
        });
    }

    ////////////////// OCR
    let ocrBtn2 = document.getElementById("ocrBtn");

    ocrBtn2.addEventListener('click', () => {
        alert("OCR 선택하셨습니다.");

        let filename = document.getElementById("filename").value;
        const formData = new FormData();
        formData.append('filename', filename);

        fetch('/ocr/', {
            method: 'POST',
            credentials: 'same-origin', // CSRF 쿠키 포함
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('서버 오류: ' + response.status);
                return response.text();
            })
            .then(data => {
                resultArea.innerHTML = `<pre>${data}</pre>`;
            })
            .catch(err => {
                resultArea.innerHTML = `<p style="color: red;">OCR 요청 실패: ${err.message}</p>`;
            });
    });
    //////////////////


    ////////////////// VLM
    let vlmBtn2 = document.getElementById("vlmBtn");

    vlmBtn2.addEventListener('click', () => {
        alert("VLM을 선택하셨습니다.");

        let filename = document.getElementById("filename").value;
        const formData = new FormData();
        formData.append('filename', filename);

        fetch('/vlm/', {
            method: 'POST',
            credentials: 'same-origin', // CSRF 쿠키 포함
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('서버 오류: ' + response.status);
                return response.text();
            })
            .then(data => {
                resultArea.innerHTML = `<pre>${data}</pre>`;
            })
            .catch(err => {
                resultArea.innerHTML = `<p style="color: red;">vlm 요청 실패: ${err.message}</p>`;
            });
    });
    //////////////////

    ////////////////// SUMMARIZE
    let sumBtn2 = document.getElementById("summaryBtn");

    sumBtn2.addEventListener('click', () => {
        alert("요약을 선택하셨습니다.");

        let result = document.getElementById("resultArea").textContent;
        const formData = new FormData();
        formData.append('result', result);

        fetch('/sum/', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin', // CSRF 쿠키 포함
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('서버 오류: ' + response.status);
                return response.text();
            })
            .then(data => {
                resultArea.innerHTML = `<pre>${data}</pre>`;
            })
            .catch(err => {
                resultArea.innerHTML = `<p style="color: red;">summary 요청 실패: ${err.message}</p>`;
            });
    });
    //////////////////

    ////////////////// QUIZ
    let quizBtn2 = document.getElementById("quizBtn");

    quizBtn2.addEventListener('click', () => {
        alert("퀴즈를 선택하셨습니다.");

        let result = document.getElementById("resultArea").textContent;
        const formData = new FormData();
        formData.append('result', result);

        fetch('/quiz/', {
            method: 'POST',
            body: formData,
            credentials: 'same-origin', // CSRF 쿠키 포함
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: formData
        })
            .then(response => {
                if (!response.ok) throw new Error('서버 오류: ' + response.status);
                return response.text();
            })
            .then(data => {
                resultArea.innerHTML = `<pre>${data}</pre>`;
            })
            .catch(err => {
                resultArea.innerHTML = `<p style="color: red;">quiz 요청 실패: ${err.message}</p>`;
            });
    });
    //////////////////


    ///////////////
    document.getElementById("ocrBtn").addEventListener('click', () => {
        const content = "📄 OCR 결과 예시 텍스트입니다.";
        updateResultArea(content, 'ocr');
    });

    document.getElementById("vlmBtn").addEventListener('click', () => {
        const content = "🖼️ VLM 이미지 설명 결과입니다.";
        updateResultArea(content, 'vlm');
    });

    document.getElementById("summaryBtn").addEventListener('click', () => {
        const content = "📝 요약 결과: 핵심 개념은...";
        updateResultArea(content, 'summary');
    });

    document.getElementById("quizBtn").addEventListener('click', () => {
        const content = "🧠 문제 예시: 다음 중 DBMS의 장점이 아닌 것은?\nA. ...";
        updateResultArea(content, 'quiz');
    });

    function updateResultArea(content, type) {
  const resultArea = document.getElementById("resultArea");

  // 기존 클래스 제거
  resultArea.className = "result-area";

  // 유형에 따라 클래스 추가
  switch (type) {
    case 'ocr':
      resultArea.classList.add('ocr-active');
      break;
    case 'vlm':
      resultArea.classList.add('vlm-active');
      break;
    case 'summary':
      resultArea.classList.add('llm-summary-active');
      break;
    case 'quiz':
      resultArea.classList.add('llm-quiz-active');
      break;
  }

  // fade-in 애니메이션 추가
  resultArea.classList.add('fade-in');

  // 텍스트 삽입
  resultArea.innerHTML = `<pre>${content}</pre>`;
}
    //////////////

    // CSRF 토큰 가져오는 함수 (Django용)
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [k, v] = cookie.trim().split('=');
            if (k === name) return decodeURIComponent(v);
        }
        return '';
    }

});