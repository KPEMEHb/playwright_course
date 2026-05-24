import { LoginPage } from "./Login.page";
import { AccountPage } from "./Account.page";
import { Page } from "@playwright/test";
import { CheckoutPage } from "./Checkout.page";
import { HomePage } from "./Home.page";
import { ProductPage } from "./Product.page";

export class AllPages {
    LoginPage: LoginPage;
    AccountPage: AccountPage;
    CheckoutPage: CheckoutPage;
    HomePage: HomePage;
    ProductPage: ProductPage;

    constructor(page: Page) {
        this.LoginPage = new LoginPage(page);
        this.AccountPage = new AccountPage(page);
        this.CheckoutPage = new CheckoutPage(page);
        this.HomePage = new HomePage(page);
        this.ProductPage = new ProductPage(page);
    }
}