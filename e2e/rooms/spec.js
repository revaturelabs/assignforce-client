browser.ignoreSynchronization = true;

describe("Assignforce development", function() {
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

      it("should click on room selector", function(){
        var EC= protractor.ExpectedConditions;
        var btn= element(by.linkText("Room Scheduler"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/room-scheduler");

        var btn = element(by.xpath('//*[@id="mat-select-0"]/div/div[1]'));
        var btn2 = element(by.xpath('//*[@id="mat-option-0"]/span'));
        var isClickable = EC.elementToBeClickable(btn);
        var isClickable2 = EC.elementToBeClickable(btn2);
        browser.wait(isClickable, 5000);
        btn.click();
        browser.wait(isClickable2, 5000);
        btn2.click();
        expect(element(by.xpath('/html/body/app-root/app-room-scheduler/div')).isDisplayed()).toBe(true);
      });

      it("should click on year up", function() {
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[1]/button[2]'));
        var isClickable = EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        browser.sleep(1000);
        expect(element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[1]/span')).getText()).toBe('2020');
      });

      it("should click on year down", function() {
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[1]/button[1]'));
        var isClickable = EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        browser.sleep(1000);
        expect(element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[1]/span')).getText()).toBe('2019');
      });

      it("should click on month up", function() {
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[2]/button[2]'));
        var isClickable = EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        browser.sleep(1000);
        expect(element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[2]/span')).getText()).toBe('July');
      });

      it("should click on month down", function() {
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[2]/button[1]'));
        var isClickable = EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        browser.sleep(1000);
        expect(element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[2]/span')).getText()).toBe('June');
      });

      it("should click on week up", function() {
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[3]/button[2]'));
        var isClickable = EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        browser.sleep(1000);
        expect(element(by.xpath('/html/body/app-root/app-room-scheduler/div/mat-table/mat-header-row/mat-header-cell[4]')).getText()).toBe('Monday 17');
      });

      it("should click on week down", function() {
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('/html/body/app-root/app-room-scheduler/div/div[3]/button[1]'));
        var isClickable = EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        browser.sleep(1000);
        expect(element(by.xpath('/html/body/app-root/app-room-scheduler/div/mat-table/mat-header-row/mat-header-cell[4]')).getText()).toBe('Monday 10');
      });
     
      it("should click on add event", function(){
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('/html/body/app-root/app-room-scheduler/div/button/span'));
        var isClickable = EC.elementToBeClickable(btn);
        browser.wait(isClickable, 5000);
        btn.click();
        expect(element(by.xpath('//*[@id="mat-dialog-0"]')).isDisplayed()).toBe(true);
      });

      it("should click on add event and start date field manual", function(){
        var EC = protractor.ExpectedConditions;
        var btn = element(by.xpath('/html/body/app-root/app-room-scheduler/div/button/span'));
        var btn2 = element(by.buttonText('Cancel'));
        var isClickable = EC.elementToBeClickable(btn);
        var isClickable2 = EC.elementToBeClickable(btn2);
        browser.wait(isClickable, 5000);
        btn.click();
        browser.sleep(1000);
        expect(element(by.xpath('//*[@id="mat-dialog-0"]')).isDisplayed()).toBe(true);
        browser.wait(isClickable2, 5000);
        btn2.click();
        browser.sleep(1000);
        expect(element(by.xpath('//*[@id="mat-dialog-0"]')).isPresent()).toBe(false);
      });

      it("should click on add event manual", function(){
        var EC = protractor.ExpectedConditions;
        var Submit = element(by.xpath('//*[@id="mat-dialog-0"]/add-event-form/form/mat-dialog-actions/button[2]'));
        var RoomSelect = element(by.xpath('//*[@id="mat-select-1"]/div/div[1]'));
        var Room = element(by.xpath('//*[@id="mat-option-6"]'));
        var BatchSelect = element(by.xpath('//*[@id="batchSeletor"]/div/div[1]'));
        var Batch = element(by.xpath('//*[@id="mat-option-12"]'));
        var RoomisClickable = EC.elementToBeClickable(Room);
        var BatchisClickable = EC.elementToBeClickable(Batch);
        var cancelButton = element(by.buttonText('Cancel'));
     
        //Test format
        element(by.xpath('//*[@formcontrolname="startDate"]')).sendKeys('Mar 25, 2019');
        expect(element(by.xpath('//*[@formcontrolname="startDate"]')).getAttribute('aria-invalid')).toBe('false');
        element(by.xpath('//*[@formcontrolname="endDate"]')).sendKeys('July 20, 2019');
        expect(element(by.xpath('//*[@formcontrolname="endDate"]')).getAttribute('aria-invalid')).toBe('false');
        RoomSelect.click();
        browser.wait(RoomisClickable, 5000);
        Room.click();
        expect(RoomSelect.getAttribute('aria-invalid')).toBe(null);
        BatchSelect.click();
        browser.wait(BatchisClickable, 5000);
        Batch.click();
        expect(BatchSelect.getAttribute('aria-invalid')).toBe(null);
        Submit.click();
        browser.sleep(1000);
        expect(element(by.xpath('/html/body/app-root/app-room-scheduler/div/mat-table/mat-row[2]/mat-cell[4]'))).toBe('1903 Mar25 Java');

        //hit cancel to close window (this should be taken out in the future when they fix Add Event button to close window and update)
        browser.wait(EC.elementToBeClickable(cancelButton));
        cancelButton.click();
        browser.sleep(1000);
        expect(element(by.xpath('//*[@id="mat-dialog-0"]')).isPresent()).toBe(false);
      });

      it("should click on add event manual", function(){
        var EC = protractor.ExpectedConditions;
        var Submit = element(by.xpath('//*[@id="mat-dialog-0"]/add-event-form/form/mat-dialog-actions/button[2]/span'));
        var RoomSelect = element(by.xpath('//*[@id="mat-select-1"]/div/div[1]/span'));
        var Room = element(by.xpath('//*[@id="mat-option-6"]/span'));
        var BatchSelect = element(by.xpath('//*[@id="mat-select-2"]/div/div[1]/span'));
        var Batch = element(by.xpath('//*[@id="mat-option-12"]/span'));
        var StartSelect = element(by.xpath('//*[@id="mat-dialog-0"]/add-event-form/form/mat-dialog-content/mat-form-field[1]/div/div[1]/div[2]/mat-datepicker-toggle/button'));
        var StartDate = element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-month-view/table/tbody/tr[2]/td[3]/div'));
        var EndSelect = element(by.xpath('//*[@id="mat-dialog-0"]/add-event-form/form/mat-dialog-content/mat-form-field[2]/div/div[1]/div[2]/mat-datepicker-toggle/button'));
        var EndDate = element(by.xpath('//*[@id="mat-datepicker-1"]/div[2]/mat-month-view/table/tbody/tr[2]/td[6]/div'));
        var RoomisClickable = EC.elementToBeClickable(Room);
        var BatchisClickable = EC.elementToBeClickable(Batch);
        var StartisClickable = EC.elementToBeClickable(StartDate);
        var EndisClickable = EC.elementToBeClickable(EndDate);
        var cancelButton = element(by.buttonText('Cancel'));
     
        //Test format
        browser.wait(EC.elementToBeClickable(StartSelect), 5000);
        StartSelect.click();
        browser.wait(EC.elementToBeClickable(StartDate), 5000);
        StartDate.click();
        expect(StartSelect.getAttribute('aria-invalid')).toBe(null);
        browser.wait(EC.elementToBeClickable(EndSelect));
        EndSelect.click();
        browser.wait(EndisClickable, 5000);
        EndDate.click();
        expect(EndSelect.getAttribute('aria-invalid')).toBe(null);
        browser.wait(EC.elementToBeClickable(RoomSelect));
        RoomSelect.click();
        browser.wait(RoomisClickable, 5000);
        Room.click();
        expect(RoomSelect.getAttribute('aria-invalid')).toBe(null);
        browser.wait(EC.elementToBeClickable(BatchSelect));
        BatchSelect.click();
        browser.wait(BatchisClickable, 5000);
        Batch.click();
        expect(BatchSelect.getAttribute('aria-invalid')).toBe(null);
        browser.wait(EC.elementToBeClickable(Submit));
        Submit.click();
        expect(element(by.xpath('/html/body/app-root/app-room-scheduler/div/mat-table/mat-row[2]/mat-cell[4]'))).toBe('1903 Mar25 Java');

        //hit cancel to close window (this should be taken out in the future when they fix Add Event button to close window and update)
        browser.wait(EC.elementToBeClickable(cancelButton));
        cancelButton.click();
        browser.sleep(1000);
        expect(element(by.xpath('//*[@id="mat-dialog-0"]')).isPresent()).toBe(false);
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