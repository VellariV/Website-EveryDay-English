// UserModel 
export class UserModel {
  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password; // NOTE: plain text only for educational purposes
  }
}

// UserListModel 
export class UserListModel {
  constructor() {
    this.users = this._loadUsers();
    this.currentUserId = localStorage.getItem('currentUserId') || null;
    this.onChangeCallback = null;
  }

  //  Private helpers

  _loadUsers() {
    try {
      const saved = localStorage.getItem('users');
      if (saved) {
        return JSON.parse(saved).map(u => new UserModel(u));
      }
    } catch (e) {
      console.error('Error loading users:', e);
    }
    return [];
  }

  _saveUsers() {
    try {
      localStorage.setItem('users', JSON.stringify(this.users));
    } catch (e) {
      console.error('Error saving users:', e);
    }
  }

  _notify() {
    if (this.onChangeCallback) this.onChangeCallback(this);
  }

  //  Public API

  register(name, email, password) {
    if (!name || !email || !password) {
      return { success: false, error: 'Fill all gaps' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be not less than 6 characters' };
    }
    if (this.users.find(u => u.email === email)) {
      return { success: false, error: 'Email have already been registered' };
    }

    const user = new UserModel({
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password
    });

    this.users.push(user);
    this._saveUsers();
    this._notify();
    return { success: true, user };
  }

  login(email, password) {
    const user = this.users.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (!user) {
      return { success: false, error: 'Wrong email or password' };
    }

    this.currentUserId = user.id;
    localStorage.setItem('currentUserId', user.id);
    this._notify();
    return { success: true, user };
  }

  logout() {
    this.currentUserId = null;
    localStorage.removeItem('currentUserId');
    this._notify();
  }

  getCurrentUser() {
    if (!this.currentUserId) return null;
    return this.users.find(u => u.id === this.currentUserId) || null;
  }

  isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  initOnModelChange(callback) {
    this.onChangeCallback = callback;
    const handler = {
      set: (obj, prop, val) => {
        obj[prop] = val;
        if (prop !== 'onChangeCallback' && this.onChangeCallback) {
          this.onChangeCallback(this);
        }
        return true;
      }
    };
    return new Proxy(this, handler);
  }
}
