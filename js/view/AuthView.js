export class AuthView {
  constructor() {
    this.elNavLinks = document.getElementById('nav-links');
    this.elLoginForm    = document.getElementById('login-form');
    this.elRegisterForm = document.getElementById('register-form');
    this.elLoginError    = document.getElementById('login-error');
    this.elRegisterError = document.getElementById('register-error');
    this.elProfileName   = document.getElementById('profile-name');
    this.elProfileEmail  = document.getElementById('profile-email');
    this.elProfileStats  = document.getElementById('profile-stats');
    this.elBtnLogout     = document.getElementById('btn-logout');
  }

  //  Nav: show guest or logged-in state
  renderNav(user) {
    if (!this.elNavLinks) return;

    if (user) {
      this.elNavLinks.innerHTML = `
        <a href="./app.html"     class="nav-link">Start</a>
        <a href="./profile.html" class="nav-link">Profile</a>
        <a href="./index.html"   class="nav-link">About us</a>
        <button id="btn-logout-nav"
          class="w-48 text-center text-white text-2xl bg-pink-400 py-2 px-4 rounded-full hover:bg-pink-500 hover:scale-110 transition-all">
          Log Out
        </button>
        <span class="text-white text-sm font-semibold text-center">👋 ${user.name}</span>
      `;
    } else {
      this.elNavLinks.innerHTML = `
        <a href="./app.html"      class="nav-link">Start</a>
        <a href="./register.html" class="nav-link">Register</a>
        <a href="./login.html"    class="nav-link">Login</a>
        <a href="./profile.html"  class="nav-link">Profile</a>
        <a href="./index.html"    class="nav-link">About us</a>
      `;
    }
  }

  //  Login form
  showLoginError(message) {
    if (this.elLoginError) {
      this.elLoginError.textContent = message;
      this.elLoginError.classList.remove('hidden');
    }
  }

  clearLoginError() {
    if (this.elLoginError) {
      this.elLoginError.classList.add('hidden');
      this.elLoginError.textContent = '';
    }
  }

  getLoginData() {
    return {
      email:    document.getElementById('login-email')?.value || '',
      password: document.getElementById('login-password')?.value || ''
    };
  }

  bindLoginSubmit(handler) {
    if (this.elLoginForm) {
      this.elLoginForm.addEventListener('submit', e => {
        e.preventDefault();
        handler(this.getLoginData());
      });
    }
  }

  //  Register form
  showRegisterError(message) {
    if (this.elRegisterError) {
      this.elRegisterError.textContent = message;
      this.elRegisterError.classList.remove('hidden');
    }
  }

  clearRegisterError() {
    if (this.elRegisterError) {
      this.elRegisterError.classList.add('hidden');
      this.elRegisterError.textContent = '';
    }
  }

  getRegisterData() {
    return {
      name:     document.getElementById('register-name')?.value || '',
      email:    document.getElementById('register-email')?.value || '',
      password: document.getElementById('register-password')?.value || ''
    };
  }

  bindRegisterSubmit(handler) {
    if (this.elRegisterForm) {
      this.elRegisterForm.addEventListener('submit', e => {
        e.preventDefault();
        handler(this.getRegisterData());
      });
    }
  }

  //  Profile page
  renderProfile(user, learnedToday = 0) {
    const guestMsg  = document.getElementById('guest-message');
    const btnLogout = document.getElementById('btn-logout');
    const avatar    = document.getElementById('profile-avatar');

    if (!user) {
      if (this.elProfileName)  this.elProfileName.textContent  = 'Guest';
      if (this.elProfileEmail) this.elProfileEmail.textContent = 'Not logged in';
      if (this.elProfileStats) this.elProfileStats.textContent = 'Log in to track your progress';
      if (avatar)    avatar.textContent = '?';
      if (guestMsg)  guestMsg.classList.remove('hidden');
      if (btnLogout) btnLogout.classList.add('hidden');
      return;
    }

    if (this.elProfileName)  this.elProfileName.textContent  = user.name;
    if (this.elProfileEmail) this.elProfileEmail.textContent = user.email;
    if (this.elProfileStats) {
      this.elProfileStats.textContent = `${learnedToday} words learned today`;
    }

    if (avatar) avatar.textContent = user.name.charAt(0).toUpperCase();
    if (guestMsg) guestMsg.classList.add('hidden');
  }

  bindLogout(handler) {
   
    if (this.elBtnLogout) {
      this.elBtnLogout.addEventListener('click', handler);
    }
  
    document.addEventListener('click', e => {
      if (e.target.id === 'btn-logout-nav') handler();
    });
  }
}
