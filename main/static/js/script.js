document.addEventListener('DOMContentLoaded', () => {
  const fileInput     = document.getElementById('fileInput');
  const uploadBox     = document.getElementById('uploadBox');
  const uploadStatus  = document.getElementById('uploadStatus');
  const preview       = document.getElementById('preview');
  const clickGuide    = document.getElementById('clickGuide');
  const sidebar       = document.getElementById('sidebar');
  const resizer       = document.getElementById('resizer');
  const resultArea    = document.getElementById('resultArea');
  const answerSection = document.getElementById('answerSection');
  const ocrBtn        = document.getElementById('ocrBtn');
  const summaryBtn    = document.getElementById('summaryBtn');
  const quizBtn       = document.getElementById('quizBtn');

  let uploadedText = '', ocrResult = '', summaryResult = '', quizQuestion = '';
  const buttons = [ocrBtn, summaryBtn, quizBtn];

  alert("welcome-----------0")


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
  uploadStatus?.addEventListener('click', () => fileInput.click());

  // Axios 기본 설정
  axios.defaults.withCredentials = true;  // 쿠키 포함  [oai_citation:0‡dhiwise.com](https://www.dhiwise.com/post/managing-secure-cookies-via-axios-interceptors?utm_source=chatgpt.com)
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.xsrfHeaderName = 'X-CSRFToken';  // 헤더 요청 키명  [oai_citation:1‡vsupalov.com](https://vsupalov.com/avoid-csrf-errors-axios-django/?utm_source=chatgpt.com)


  alert("welcome-----------")

  fileInput?.addEventListener('change', () => {
    const file = fileInput.files?.[0];
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
      });

    const reader = new FileReader();
    reader.onload = () => {
      console.log("welcome-----------0");
      preview.src = reader.result;
      uploadedText = 'uploaded';
      ocrResult     = `📄 [OCR] "${file.name}" 텍스트 인식 완료`;
      summaryResult = `📝 [요약] "${file.name}" 핵심 요약 문장`;
      quizQuestion  = `🧠 [문제] "${file.name}" 기반 생성된 질문예시`;
      resultArea.innerHTML = `<p>${ocrResult}</p>`;
      answerSection.innerHTML = '';
      ocrBtn?.classList.add('active');
      buttons.forEach(b => b !== ocrBtn && b?.classList.remove('active'));
    };
    reader.readAsDataURL(file);
  });

  function showResult(text) {
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
        ? (["이미지","사진","업로드"].some(k => ua.includes(k))
           ? `<span style="color:green;">✅ 정답입니다!</span>`
           : `<span style="color:orange;">🤔 핵심 단어 포함 시도해보세요.</span>`)
        : `<span style="color:red;">⚠️ 답을 입력해주세요.</span>`;
      document.getElementById('submitAnswer').disabled = true;
    });
  });

  if (resizer && sidebar) {
    let isResizing = false;
    resizer.addEventListener('mousedown', () => {
      isResizing = true; document.body.style.cursor = 'col-resize';
    });
    document.addEventListener('mousemove', e => {
      if (isResizing) sidebar.style.width = Math.max(200, e.clientX) + 'px';
    });
    document.addEventListener('mouseup', () => {
      isResizing = false; document.body.style.cursor = 'default';
    });
  }
});