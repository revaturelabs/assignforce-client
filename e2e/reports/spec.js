browser.ignoreSynchronization = true;

describe("Assignforce development, test trainer", function() {
    beforeAll(function() {
        browser.get("localhost:4200/login");
        var EC= protractor.ExpectedConditions;
        var email= element(by.name("email"));
        var pass= element(by.name("password"));
        var btn= element(by.name("submit"));
        var emailIsClickable= EC.elementToBeClickable(email);
        var passIsClickable= EC.elementToBeClickable(pass);
        var btnIsClickable= EC.elementToBeClickable(btn);
        browser.wait(emailIsClickable);
        email.sendKeys(browser.params.login.email);
        browser.wait(passIsClickable);
        pass.sendKeys(browser.params.login.password);
        browser.wait(btnIsClickable);
        btn.click();
    });

    afterAll(function() {
        var EC= protractor.ExpectedConditions;
        var logout= element(by.buttonText("Logout"));
        browser.wait(EC.elementToBeClickable(logout));
        logout.click();
    });

    it("should click Reports tab", function() {
        var EC= protractor.ExpectedConditions;
        btn = element(by.linkText("Reports"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/reports");
      });
     
      it("should click on dropdown", function(){
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('//*[@id=\"mat-expansion-panel-header-1\"]'));
        var isClickable = EC.elementToBeClickable(btn);
        browser.wait(isClickable, 5000);
        btn.click();
        browser.sleep(1000);
        expect(element(by.xpath('//*[@id=\"mat-expansion-panel-header-1\"]')).getCssValue("height")).toBe('64px');
      });

      it("should click on the .NET button on the first graph", function() {
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('//*[text()=".NET"]'));
        var isClickable = EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        expect(element(by.xpath('//*[text()=".NET"]/..')).getCssValue('fill')).toBe('rgb(51, 51, 51)');
        btn.click();
        browser.sleep(1000);
        expect(element(by.xpath('//*[text()=".NET"]/..')).getAttribute('fill')).toBe(null);
      });
})


describe("Assignforce development, svp", function() {
    beforeEach(function() {
        browser.get("localhost:4200/login");

        var EC= protractor.ExpectedConditions;
        var email= element(by.name("email"));
        var pass= element(by.name("password"));
        var btn= element(by.name("submit"));
        var emailIsClickable= EC.elementToBeClickable(email);
        var passIsClickable= EC.elementToBeClickable(pass);
        var btnIsClickable= EC.elementToBeClickable(btn);

        browser.wait(emailIsClickable);
        email.sendKeys(browser.params.svpLogin.email);
        browser.wait(passIsClickable);
        pass.sendKeys(browser.params.login.password);
        browser.wait(btnIsClickable);
        btn.click();
    });

    afterEach(function() {
        var EC= protractor.ExpectedConditions;
        var logout= element(by.buttonText("Logout"));
        browser.wait(EC.elementToBeClickable(logout));
        logout.click();
    });
})