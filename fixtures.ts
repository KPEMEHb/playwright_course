import { test as base} from '@playwright/test';
import { AllPages } from './pages/AllPages';
//import { LoginPage } from './pages/Login.page';


type MyFixtures = {
    app: AllPages;
    loggedInApp: AllPages;
};

let token: string;
export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await page.goto('/');
    await use(app);
  },
  loggedInApp: async ({ app, request }, use) => {
    const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
      data: {
        'email': 'customer@practicesoftwaretesting.com',
        'password': 'welcome01'
      }
    });
    const jsonData = await response.json();
    token = jsonData.access_token;

    await app.LoginPage.page.goto('/');

    await app.HomePage.page.evaluate((token) => {
      localStorage.setItem('auth-token', token);
    }, token);

    await app.HomePage.page.reload();

    await use(app);
  }
});
