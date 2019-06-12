browser.ignoreSynchronization = true;

describe("Assignforce development, Test Curricula", function () {
  beforeAll(function () {
    browser.get("https://dev.assignforce.revaturelabs.com");
    var EC = protractor.ExpectedConditions;
    var email = element(by.name("email"));
    var pass = element(by.name("password"));
    var btn = element(by.name("submit"));
    var emailIsClickable = EC.elementToBeClickable(email);
    var passIsClickable = EC.elementToBeClickable(pass);
    var btnIsClickable = EC.elementToBeClickable(btn);
    browser.wait(emailIsClickable);
    email.sendKeys(browser.params.login.email);
    browser.wait(passIsClickable);
    pass.sendKeys(browser.params.login.password);
    browser.wait(btnIsClickable);
    btn.click();
  });

  it('Checking Curricula page', function () {
    let EC = protractor.ExpectedConditions;
    let currc = element(by.linkText('Curricula'));
    let curLink = EC.elementToBeClickable(currc);

    browser.wait(curLink)
    currc.click();
    expect(browser.getCurrentUrl()).toBe("https://dev.assignforce.revaturelabs.com/curricula");
  })

    it('Closing Expandable Tables', function () {

    let c1 = element(by.id('mat-expansion-panel-header-1'))
    c1.click();
    browser.sleep(1000);
    let curSub = element(by.id('cdk-accordion-child-1'));
    expect(curSub.isDisplayed()).toEqual(false);

    let c2 = element(by.id('mat-expansion-panel-header-2'))
    c2.click();
    browser.sleep(1000);
    let curSub2 = element(by.id('cdk-accordion-child-2'));
    expect(curSub2.isDisplayed()).toEqual(false);

    let c3 = element(by.id('mat-expansion-panel-header-3'))
    c3.click();
    browser.sleep(1000);
    let curSub3 = element(by.id('cdk-accordion-child-3'));
    expect(curSub3.isDisplayed()).toEqual(false);

    });


  afterAll(function () {
    var EC = protractor.ExpectedConditions;
    var logout = element(by.buttonText("Logout"));
    browser.wait(EC.elementToBeClickable(logout));
    logout.click();
  });
})

