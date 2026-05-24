import { test as base} from '@playwright/test';
import { AllPages } from './pages/AllPages';


type MyFixtures = {
    app: AllPages;
    loggedInApp: AllPages;
};


export const test = base.extend<MyFixtures>({
  app: async ({ page }, use) => {
    const app = new AllPages(page);
    await page.goto('/');
    await use(app);
  },
  loggedInApp: async ({ app }, use) => {
    await app.LoginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');
    await use(app);
  }
});
