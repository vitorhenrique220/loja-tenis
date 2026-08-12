document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const eyeIcon = document.getElementById('eyeIcon');
  const errorAlert = document.getElementById('errorAlert');


  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

 
  const savedTheme = localStorage.getItem('zikka-theme');
  if (savedTheme === 'light') {
    enableLightTheme();
  } else {
    enableDarkTheme();
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('theme-light');
      if (isLight) {
        enableDarkTheme();
        localStorage.setItem('zikka-theme', 'dark');
      } else {
        enableLightTheme();
        localStorage.setItem('zikka-theme', 'light');
      }
    });
  }

  function enableLightTheme() {
    document.body.classList.add('theme-light');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  function enableDarkTheme() {
    document.body.classList.remove('theme-light');
    if (themeIcon) themeIcon.textContent = '🌙';
  }


  if (togglePasswordBtn && passwordInput && eyeIcon) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      
      eyeIcon.classList.toggle('fa-eye', !isPassword);
      eyeIcon.classList.toggle('fa-eye-slash', isPassword);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('email');
      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      hideError();

      if (!email || !password) {
        showError('Por favor, preencha todos os campos.');
        return;
      }

      if (!isValidEmail(email)) {
        showError('Por favor, insira um e-mail válido.');
        return;
      }

      if (password.length < 6) {
        showError('A senha deve ter pelo menos 6 caracteres.');
        return;
      }

      window.location.href = 'inicio.html';
    });
  }

  function showError(message) {
    if (errorAlert) {
      errorAlert.textContent = message;
      errorAlert.style.display = 'block';
    } else {
      alert(message);
    }
  }

  function hideError() {
    if (errorAlert) {
      errorAlert.style.display = 'none';
      errorAlert.textContent = '';
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
});
