browser.ignoreSynchronization = true;

describe("Assignforce development, Test Trainer", function () {
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

    it('Checking Trainers', function () {

      let EC = protractor.ExpectedConditions;
      let trainers = element(by.linkText('Trainers'));
      let trainerLink = EC.elementToBeClickable(trainers);
      browser.wait(trainerLink)
      trainers.click();

      expect(browser.getCurrentUrl()).toBe("https://dev.assignforce.revaturelabs.com/trainers");
  
    })

    it("Should check the trainers profile page", function () {

      // $$("mat-list-item").then(function (item) {
      //   expect(item.length).toBeGreaterThan(1);
      // })

      let EC = protractor.ExpectedConditions;
      let trainer = element(by.className('mat-line'));
      let tLink = EC.elementToBeClickable(trainer);
      browser.wait(tLink)
      trainer.click();


      let name = element(by.id('profileName'));
      expect(name.element(by.tagName('h1')).getText()).toEqual('Abhishek Bhalerao');
      expect(name.element(by.tagName('h4')).getText()).toEqual('Email: abhishek.bhalerao@revature.com');

      browser.sleep(3000)
      let image = element(by.id('displayImage '));
      expect(image.getAttribute("src")).toBe("https://app.revature.com/core/resources/download/default/interns/image?t=1486138020884");


      //let skills = element(by.className('md-list-item mat-button ng-star-inserted'));
      $$(".md-list-item").then(function (item) {
        expect(item.length).toBeGreaterThan(0);
      })


    });




  afterAll(function () {
    var EC = protractor.ExpectedConditions;
    var logout = element(by.buttonText("Logout"));
    browser.wait(EC.elementToBeClickable(logout));
    logout.click();
  });
})