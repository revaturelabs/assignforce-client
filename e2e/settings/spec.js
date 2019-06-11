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

        var btn= element(by.linkText("Settings"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/settings");
    });

    afterEach(function() {
        var EC= protractor.ExpectedConditions;
        var logout= element(by.buttonText("Logout"));
        browser.wait(EC.elementToBeClickable(logout));
        logout.click();
    });

    it("Should check the reset functionality on the settings tab", function() {
        var EC= protractor.ExpectedConditions;
        var trainersPerPage= element(by.xpath('//*[@id="mat-input-0"]'));
        var outgoingGrades= element(by.xpath('//*[@id="mat-input-1"]'));
        var candidatesIncoming= element(by.xpath('//*[@id="mat-input-2"]'));
        var minBatchSize= element(by.xpath('//*[@id="mat-input-3"]'));
        var maxBatchSize= element(by.xpath('//*[@id="mat-input-4"]'));
        var defaultBatchLength= element(by.xpath('//*[@id="mat-input-5"]'));
        var minDaysBetweenBatches= element(by.xpath('//*[@id="mat-input-6"]'));
        var defaultBatchPattern= element(by.xpath('//*[@id="mat-input-7"]'));
        var save= element(by.buttonText('SAVE'));
        var reset= element(by.buttonText('RESET'));
        
        browser.wait(EC.elementToBeClickable(trainersPerPage));
        trainersPerPage.click();
        trainersPerPage.clear();
        trainersPerPage.sendKeys('4');
        outgoingGrades.click();
        outgoingGrades.clear();
        outgoingGrades.sendKeys('4');
        candidatesIncoming.click();
        candidatesIncoming.clear();
        candidatesIncoming.sendKeys('4');
        minBatchSize.click();
        minBatchSize.clear();
        minBatchSize.sendKeys('4');
        maxBatchSize.click();
        maxBatchSize.clear();
        maxBatchSize.sendKeys('4');
        defaultBatchLength.click();
        defaultBatchLength.clear();
        defaultBatchLength.sendKeys('4');
        minDaysBetweenBatches.click();
        minDaysBetweenBatches.clear();
        minDaysBetweenBatches.sendKeys('4');
        defaultBatchPattern.click();
        defaultBatchPattern.clear();
        defaultBatchPattern.sendKeys('4');
        
        reset.click();
        browser.sleep(1000);
        expect(trainersPerPage.getAttribute('value')).toBe('5');
        expect(outgoingGrades.getAttribute('value')).toBe('30');
        expect(candidatesIncoming.getAttribute('value')).toBe('26');
        expect(minBatchSize.getAttribute('value')).toBe('10');
        expect(maxBatchSize.getAttribute('value')).toBe('20');
        expect(defaultBatchLength.getAttribute('value')).toBe('10');
        expect(minDaysBetweenBatches.getAttribute('value')).toBe('14');
        expect(defaultBatchPattern.getAttribute('value')).toBe('$y$m $mmm$d $c');

        //enter 4 trainers per page and save, check batches tab
        browser.wait(EC.elementToBeClickable(trainersPerPage));
        trainersPerPage.click();
        trainersPerPage.clear();
        trainersPerPage.sendKeys('4');
        save.click();

        var btn= element(by.linkText("Batches"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/batches");

        var page= element(by.xpath('//*[@id="trainersperpage"]'));
        browser.wait(EC.elementToBeClickable(page));
        expect(page.getAttribute('value')).toBe('4');
    });
})