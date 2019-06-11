browser.ignoreSynchronization = true;

describe("Assignforce development, Test Profile", function () {
  beforeAll(function () {
    browser.get("localhost:4200/login");
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



  it("Checking Profile page", function () {
        let EC = protractor.ExpectedConditions;
        let profile = element(by.linkText('Profile'));
        let profileLink = EC.elementToBeClickable(profile);
        browser.wait(profileLink)
        profile.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/profile/test.trainer@revature.com");

        /// testing to see if name and email renders on the page
        let name = element(by.id('profileName'));
        expect(name.element(by.tagName('h1')).getText()).toEqual('Brian Alvarez');
        expect(name.element(by.tagName('h4')).getText()).toEqual('Email: test.trainer@revature.com');

        // testing to see if the image is there
        let image = element(by.id('displayImage '));
        expect(image.getAttribute("src")).toBe("https://app.revature.com/core/resources/download/default/interns/image?t=1486138020884");



        // testing Unavailability form

        let start = element(by.id('mat-input-0'))
        let end = element(by.id('mat-input-1'))
        let description = element(by.id('mat-input-2'))
        let buttonBtn = element(by.className('mat-raised-button'));
        expect(buttonBtn.getAttribute("ng-reflect-disabled")).toBe("true");
        start.sendKeys("06/21/2019");
        end.sendKeys("08/25/2019")
        description.sendKeys("I am sick!")
        expect(buttonBtn.getAttribute("ng-reflect-disabled")).toBe("false");
        buttonBtn.click();


        let profileButton = element(by.xpath('//*[@id="profileDiv"]/mat-card/mat-toolbar-row/mat-toolbar/button'));
        profileButton.click();

        let fname = element(by.xpath('//*[@id="profileName"]//form/mat-form-field[1]//input'));
        fname.clear().then(function () {
          fname.sendKeys("August");
        })

        browser.sleep(5000);

        let lname = element(by.xpath('//*[@id="profileName"]//form/mat-form-field[2]//input'))
        lname.clear().then(function () {

          lname.sendKeys("Nunez");
        })

        let campus = element(by.id('mat-select-0'))
        campus.sendKeys("MSU");

        profileButton.click();

        expect(name.element(by.tagName('h1')).getText()).toEqual('August Nunez');
        expect(name.element(by.tagName('h4')).getText()).toEqual('Email: test.trainer@revature.com');

        ////////////Skill section of profile

        let skillButton = element(by.xpath('//*[@id="profileContent "]/div[2]/app-skills/mat-toolbar-row/mat-toolbar/button'));
        skillButton.click();

        browser.sleep(5000)

        let buttonsClicked = element(by.tagName("mat-select"));
        buttonsClicked.click();

        let skills = element(by.className("mat-option-text"));
        skills.click()

        browser.sleep(5000)


        let trainers = element(by.linkText('Trainers'));
        trainers.click(); 

    });


  afterAll(function () {
    var EC = protractor.ExpectedConditions;
    var logout = element(by.buttonText("Logout"));
    browser.wait(EC.elementToBeClickable(logout));
    logout.click();
  });
})