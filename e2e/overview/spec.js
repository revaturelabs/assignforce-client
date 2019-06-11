browser.ignoreSynchronization = true;

describe("Assignforce development, test trainer", function() {

    var testTabs= [
        {tab: 'Overview', url: 'overview'},
        {tab: 'Batches', url: 'batches'},
        {tab: 'Locations', url: 'locations'},
        {tab: 'Curricula', url: 'curricula'},
        {tab: 'Trainers', url: 'trainers'},
        {tab: 'Profile', url: 'profile/test.trainer@revature.com'},
        {tab: 'Reports', url: 'reports'},
        {tab: 'Settings', url: 'settings'},
        {tab: 'Room Scheduler', url: 'room-scheduler'}
    ];

    var testSortOverview= [
        {col: 'Name', path: "//*[@id=\"cdk-accordion-child-0\"]/div/div/mat-table/mat-row[1]/mat-cell[1]", noSort: '1903 Mar25 Java', asc: '1903 Mar11 .NET', desc: '1906 Jun17 Java'},
        {col: 'Curriculum', path: "//*[@id=\"cdk-accordion-child-0\"]/div/div/mat-table/mat-row[1]/mat-cell[2]", noSort: 'Java', asc: 'Java', desc: 'SDET'},
        {col: 'Trainer', path: '//*[@id="cdk-accordion-child-0"]/div/div/mat-table/mat-row[1]/mat-cell[3]', noSort: 'August Duet', asc: 'August Duet', desc: 'Ryan Lessley'},
        {col: 'CoTrainer', path: '//*[@id="cdk-accordion-child-0"]/div/div/mat-table/mat-row[1]/mat-cell[4]', noSort: 'Fred Belotte', asc: '', desc: 'Fred Belotte'},
        {col: 'Location', path: '//*[@id="cdk-accordion-child-0"]/div/div/mat-table/mat-row[1]/mat-cell[5]', noSort: 'USF', asc: '', desc: 'GMU'},
        {col: 'Building', path: '//*[@id="cdk-accordion-child-0"]/div/div/mat-table/mat-row[1]/mat-cell[6]', noSort: 'Muma', asc: '', desc: 'Johnson Center'},
        {col: 'Room', path: '//*[@id="cdk-accordion-child-0"]/div/div/mat-table/mat-row[1]/mat-cell[7]', noSort: '1300', asc: '', desc: '1300'},
        {col: 'Start Date', path: '//*[@id="cdk-accordion-child-0"]/div/div/mat-table/mat-row[1]/mat-cell[8]', noSort: 'Mar 25, 2019', asc: 'Mar 11, 2019', desc: 'Jun 17, 2019'},
        {col: 'End Date', path: '//*[@id="cdk-accordion-child-0"]/div/div/mat-table/mat-row[1]/mat-cell[9]', noSort: 'May 31, 2019', asc: 'May 17, 2019', desc: 'Aug 23, 2019'}
    ];

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

        var btn= element(by.linkText("Overview"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/overview");
    });

    afterAll(function() {
        var EC= protractor.ExpectedConditions;
        var logout= element(by.buttonText("Logout"));
        browser.wait(EC.elementToBeClickable(logout));
        logout.click();
    });

    it("Should click filter by year button, choose each option", function() {
        var EC= protractor.ExpectedConditions;
        var selection= element(by.css("mat-icon[title='Filter by year']"));
        var isClickable= EC.elementToBeClickable(selection);
        browser.wait(isClickable);
        selection.click();

        browser.sleep(1000);
        var yearOption1= element(by.buttonText("2016"));
        var isClickable= EC.elementToBeClickable(yearOption1);
        browser.wait(isClickable);
        yearOption1.click();
        expect(element(by.xpath("//*[@id=\"cdk-accordion-child-0\"]/div/div/mat-table/mat-row/mat-cell[1]")).getText()).toBe("1601 Jan01 Java");

        selection.click();
        browser.sleep(1000);
        var yearOption3= element(by.buttonText("2020"));
        var isClickable= EC.elementToBeClickable(yearOption3);
        browser.wait(isClickable);
        yearOption3.click();
        expect(element(by.xpath("//*[@id=\"cdk-accordion-child-0\"]/div/div/mat-table/mat-row/mat-cell[1]")).getText()).toBe("2001 Jan01 SDET");

        selection.click();
        browser.sleep(1000);
        var yearOption2= element(by.buttonText("2019"));
        var isClickable= EC.elementToBeClickable(yearOption2);
        browser.wait(isClickable);
        yearOption2.click();
        expect(element(by.xpath("//*[@id=\"cdk-accordion-child-0\"]/div/div/mat-table/mat-row/mat-cell[1]")).getText()).toBe("1903 Mar25 Java");
    });

    for (var i = 0; i < testSortOverview.length; i++) {
        (function (testSortOverview) {
            it('Should click each sort tab on overview table', function () {
                var EC= protractor.ExpectedConditions;
                var sort= element(by.buttonText(testSortOverview.col));
                var isClickable= EC.elementToBeClickable(sort);
                browser.wait(isClickable);
                sort.click();
                expect(element(by.xpath(testSortOverview.path)).getText()).toBe(testSortOverview.asc);
                browser.wait(isClickable);
                sort.click();
                expect(element(by.xpath(testSortOverview.path)).getText()).toBe(testSortOverview.desc);
                browser.wait(isClickable);
                sort.click();
                expect(element(by.xpath(testSortOverview.path)).getText()).toBe(testSortOverview.noSort);
            });
        })(testSortOverview[i]);
    };

    it("Should click the filter by progress button, choose each option", function() {
        var EC= protractor.ExpectedConditions;
        var progress= element(by.css("mat-icon[title='Filter by progress']"));
        var isClickable= EC.elementToBeClickable(progress);
        browser.wait(isClickable);
        progress.click();

        browser.sleep(1000);
        var progressOption1= element(by.buttonText("In Progress"));
        var isClickable= EC.elementToBeClickable(progressOption1);
        browser.wait(isClickable);
        progressOption1.click();
        expect(element(by.xpath("//*[@id=\"mat-expansion-panel-header-0\"]/span/mat-panel-title/span")).getText()).toBe("Batches In Progress for 2019");

        progress.click();
        browser.sleep(1000);
        var progressOption2= element(by.buttonText("Beginning within two weeks"));
        var isClickable= EC.elementToBeClickable(progressOption2);
        browser.wait(isClickable);
        progressOption2.click();
        expect(element(by.xpath("//*[@id=\"mat-expansion-panel-header-0\"]/span/mat-panel-title/span")).getText()).toBe("Batches Starting Soon for 2019");

        progress.click();
        browser.sleep(1000);
        var progressOption3= element(by.buttonText("All"));
        var isClickable= EC.elementToBeClickable(progressOption3);
        browser.wait(isClickable);
        progressOption3.click();
        expect(element(by.xpath("//*[@id=\"mat-expansion-panel-header-0\"]/span/mat-panel-title/span")).getText()).toBe("All Batches for 2019");
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