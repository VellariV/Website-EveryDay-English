import { UserListModel } from './model/UserModel.js';
import { DeckModel }     from './model/DeckModel.js';
import { AuthController } from './controller/AuthController.js';
import { AppController }  from './controller/AppController.js';

//  Init models 
const userListModel = new UserListModel();

//  Init Auth controller 
const authController = new AuthController(userListModel);

//  Detect current page and init page-specific logic
const page = window.location.pathname.split('/').pop() || 'index.html';

switch (page) {
  case 'app.html':
  case '': {
    const currentUser = userListModel.getCurrentUser();
    const deckModel   = new DeckModel(currentUser?.id ?? null);
    new AppController(deckModel);
    break;
  }

  case 'login.html':
    authController.initLoginPage();
    break;

  case 'register.html':
    authController.initRegisterPage();
    break;

  case 'profile.html':
    authController.initProfilePage();
    break;

  default:
    break;
}
