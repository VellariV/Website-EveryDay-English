import { AuthView } from '../view/AuthView.js';

export class AuthController {
  constructor(userListModel) {
    this.model = userListModel;
    this.view = new AuthView();

    this.view.renderNav(this.model.getCurrentUser());

    this.view.bindLogout(() => this._handleLogout());
  }

  //  Login page 
  initLoginPage() {
    // If already logged in — go to app
    if (this.model.isLoggedIn()) {
      window.location.href = './app.html';
      return;
    }

    this.view.bindLoginSubmit(({ email, password }) => {
      this.view.clearLoginError();
      const result = this.model.login(email, password);
      if (result.success) {
        window.location.href = './app.html';
      } else {
        this.view.showLoginError(result.error);
      }
    });
  }

  //  Register page 
  initRegisterPage() {
    // If already logged in — go to app
    if (this.model.isLoggedIn()) {
      window.location.href = './app.html';
      return;
    }

    this.view.bindRegisterSubmit(({ name, email, password }) => {
      this.view.clearRegisterError();
      const result = this.model.register(name, email, password);
      if (result.success) {
        // Auto-login after registration
        this.model.login(email, password);
        window.location.href = './app.html';
      } else {
        this.view.showRegisterError(result.error);
      }
    });
  }

  // Profile page 
  initProfilePage() {
    const user = this.model.getCurrentUser();

    const progressKey = user ? `deck_progress_${user.id}` : 'deck_progress_guest';
    let learnedToday = 0;
    try {
      const saved = localStorage.getItem(progressKey);
      if (saved) learnedToday = JSON.parse(saved).learned || 0;
    } catch (e) { /* ignore */ }

    this.view.renderProfile(user, learnedToday);
  }

  //  Logout 
  _handleLogout() {
    this.model.logout();
    window.location.href = './login.html';
  }
}
