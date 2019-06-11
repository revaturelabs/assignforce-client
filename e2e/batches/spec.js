browser.ignoreSynchronization = true;

describe("Assignforce development, test trainer", function() {

    var testSortBatches= [
        {col: 'Name', path: "//*[@id=\"cdk-accordion-child-1\"]/div/div/mat-table/mat-row[1]/mat-cell[1]", noSort: '1903 Mar25 Java', asc: '1601 Jan01 Java', desc: '2001 Jan01 SDET'},
        {col: 'Curriculum', path: "//*[@id=\"cdk-accordion-child-1\"]/div/div/mat-table/mat-row[1]/mat-cell[2]", noSort: 'Java', asc: 'Java', desc: 'SDET'},
        {col: 'Trainer/Cotrainer', path: '//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[3]', noSort: 'August Duet\nFred Belotte', asc: 'August Duet\nFred Belotte', desc: 'Yuvi Damodaran'},
        {col: 'Location', path: '//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[4]', noSort: 'USF', asc: '', desc: 'GMU'},
        {col: 'Building', path: '//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[5]', noSort: 'Muma', asc: '', desc: 'Johnson Center'},
        {col: 'Room', path: '//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[6]', noSort: '1300', asc: '', desc: '1300'},
        {col: 'Class Size', path: '//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[7]', noSort: '40', asc: '40', desc: '10'},
        {col: 'StartDate', path: '//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[8]', noSort: '03/25/2019', asc: '01/02/2016', desc: '01/02/2020'},
        {col: 'EndDate', path: '//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[9]', noSort: '05/31/2019', asc: '03/12/2016', desc: '03/07/2020'}
    ];

    var testHeadersBatches= [
        {id: 'mat-expansion-panel-header-1', path: '//*[@id=\"cdk-accordion-child-1\"]'},
        {id: 'mat-expansion-panel-header-2', path: '//*[@id=\"cdk-accordion-child-2\"]'}
    ];

    var testCurriculumDropdownBatches= [
        {option: 'Any', path: '//*[@id="mat-option-0"]', value: 'August D.'},
        {option: '.NET', path: '//*[@id="mat-option-1"]', value: 'No trainers'},
        {option: 'Java', path: '//*[@id="mat-option-2"]', value: 'August D.'},
        {option: 'SDET', path: '//*[@id="mat-option-3"]', value: 'No trainers'},
        {option: 'Custom', path: '//*[@id="mat-option-4"]', value: 'No trainers'},
        {option: 'Appian', path: '//*[@id="mat-option-5"]', value: 'No trainers'},
        {option: 'Capital One', path: '//*[@id="mat-option-6"]', value: 'No trainers'},
        {option: 'Testing', path: '//*[@id="mat-option-7"]', value: 'No trainers'},
        {option: 'Testing2', path: '//*[@id="mat-option-8"]', value: 'No trainers'},
        {option: 'name', path: '//*[@id="mat-option-9"]', value: 'No trainers'},
        {option: 'Big Data', path: '//*[@id="mat-option-10"]', value: 'No trainers'},
        {option: 'Dynamics CRM', path: '//*[@id="mat-option-11"]', value: 'No trainers'},
        {option: 'PEGA', path: '//*[@id="mat-option-12"]', value: 'No trainers'},
        {option: 'Oracle Fusion', path: '//*[@id="mat-option-13"]', value: 'No trainers'},
        {option: 'GO', path: '//*[@id="mat-option-14"]', value: 'No trainers'},
        {option: 'Salesforce', path: '//*[@id="mat-option-15"]', value: 'No trainers'},
        {option: 'BA', path: '//*[@id="mat-option-16"]', value: 'No trainers'},
        {option: 'Test.t', path: '//*[@id="mat-option-17"]', value: 'No trainers'},
        {option: 'Test.x', path: '//*[@id="mat-option-18"]', value: 'No trainers'},
        {option: 'Test.y', path: '//*[@id="mat-option-19"]', value: 'No trainers'},
        {option: 'Test.c', path: '//*[@id="mat-option-20"]', value: 'No trainers'},
        {option: 'Test.a', path: '//*[@id="mat-option-21"]', value: 'No trainers'},
        {option: 'Test.b', path: '//*[@id="mat-option-22"]', value: 'No trainers'},
        {option: 'newCurric', path: '//*[@id="mat-option-23"]', value: 'No trainers'},
        {option: 'another test', path: '//*[@id="mat-option-24"]', value: 'No trainers'}
    ];

    var testLocationDropdownBatches= [
        {option: 'Any', path: '//*[@id="mat-option-25"]', value: 'August D.'},
        {option: 'USF', path: '//*[@id="mat-option-26"]', value: 'No trainers'},
        {option: 'GMU', path: '//*[@id="mat-option-27"]', value: 'August D.'},
        {option: 'Tampa', path: '//*[@id="mat-option-28"]', value: 'No trainers'},
        {option: 'MSU', path: '//*[@id="mat-option-29"]', value: 'No trainers'},
        {option: 'Ottawa University', path: '//*[@id="mat-option-30"]', value: 'No trainers'}
    ];

    var testBuildingDropdownBatches= [
        {option: 'Any', path: '//*[@id="mat-option-31"]', value: 'August D.'},
        {option: 'Chicago', path: '//*[@id="mat-option-32"]', value: 'No trainers'},
        {option: 'ASU Building 1', path: '//*[@id="mat-option-33"]', value: 'No trainers'},
        {option: 'SPS', path: '//*[@id="mat-option-34"]', value: 'No trainers'},
        {option: 'Queens', path: '//*[@id="mat-option-35"]', value: 'No trainers'},
        {option: 'Detroit', path: '//*[@id="mat-option-36"]', value: 'No trainers'},
        {option: '11730 Plaza American Drive(HQ)', path: '//*[@id="mat-option-37"]', value: 'No trainers'},
        {option: 'Muma', path: '//*[@id="mat-option-38"]', value: 'No trainers'},
        {option: 'Johnson Center', path: '//*[@id="mat-option-39"]', value: 'August D.'},
        {option: 'NEC', path: '//*[@id="mat-option-40"]', value: 'No trainers'},
        {option: 'Enterprise', path: '//*[@id="mat-option-41"]', value: 'No trainers'},
        {option: 'Batty Nuggets', path: '//*[@id="mat-option-42"]', value: 'No trainers'},
        {option: 'Happy Times', path: '//*[@id="mat-option-43"]', value: 'No trainers'},
        {option: 'John Lennon', path: '//*[@id="mat-option-44"]', value: 'No trainers'},
        {option: 'Administration', path: '//*[@id="mat-option-45"]', value: 'No trainers'},
        {option: 'testing 2.0', path: '//*[@id="mat-option-46"]', value: 'No trainers'},
        {option: 'Brown Hall', path: '//*[@id="mat-option-47"]', value: 'No trainers'},
        {option: 'Behan Hall', path: '//*[@id="mat-option-48"]', value: 'No trainers'},
        {option: 'Marshall Student Center', path: '//*[@id="mat-option-49"]', value: 'No trainers'},
    ];

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
        email.sendKeys(browser.params.login.email);
        browser.wait(passIsClickable);
        pass.sendKeys(browser.params.login.password);
        browser.wait(btnIsClickable);
        btn.click();

        var btn= element(by.linkText("Batches"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/batches");
    });

    afterEach(function() {
        var EC= protractor.ExpectedConditions;
        var logout= element(by.buttonText("Logout"));
        browser.wait(EC.elementToBeClickable(logout));
        logout.click();
    });
    
    for (var i = 0; i < testHeadersBatches.length; i++) {
        (function (testHeadersBatches) {
            it('Should click the header dropdowns to hide them, then click to re-open', function () {
                var EC= protractor.ExpectedConditions;
                var btn= element(by.id(testHeadersBatches.id));
                var isClickable= EC.elementToBeClickable(btn);

                browser.wait(isClickable);
                btn.click();
                browser.wait(protractor.ExpectedConditions.invisibilityOf(element(by.xpath(testHeadersBatches.path))));
                expect((element(by.xpath(testHeadersBatches.path))).isDisplayed()).toBe(false);

                browser.wait(isClickable);
                btn.click();
                browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.xpath(testHeadersBatches.path))));
                expect((element(by.xpath(testHeadersBatches.path))).isDisplayed()).toBe(true);
            });
        })(testHeadersBatches[i]);
    };

    for (var i = 0; i < testSortBatches.length; i++) {
        (function (testSortBatches) {
            it('Should click each sort tab on Batches tables', function () {
                var EC= protractor.ExpectedConditions;
                var sort= element(by.buttonText(testSortBatches.col));
                var isClickable= EC.elementToBeClickable(sort);
                browser.wait(isClickable);
                sort.click();
                expect(element(by.xpath(testSortBatches.path)).getText()).toBe(testSortBatches.asc);
                browser.wait(isClickable);
                sort.click();
                expect(element(by.xpath(testSortBatches.path)).getText()).toBe(testSortBatches.desc);
                browser.wait(isClickable);
                sort.click();
                expect(element(by.xpath(testSortBatches.path)).getText()).toBe(testSortBatches.noSort);
            });
        })(testSortBatches[i]);
    };

    it("Should open the calendar view and test the month and year arrow buttons", function() {
        var EC= protractor.ExpectedConditions;
        //select the start day via the calendar option
        var startDate= element(by.xpath('//*[@id="cdk-accordion-child-2"]/div/app-batches-timeline/app-batches-timeline-filter/form/div/div/mat-form-field[1]/div/div[1]/div[2]/mat-datepicker-toggle/button'));
        browser.wait(EC.elementToBeClickable(startDate));
        startDate.click();

        //check current month
        var currentMonth= element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-month-view/table/tbody/tr[1]/td[1]'));
        browser.wait(EC.elementToBeClickable(currentMonth));
        expect(currentMonth.getText()).toBe('MAR');

        //click next button and check next month
        var next= element(by.xpath('//*[@id="mat-datepicker-0"]/div[1]/div/button[3]'));
        browser.wait(EC.elementToBeClickable(next));
        next.click();
        var currentMonth= element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-month-view/table/tbody/tr[1]/td[1]'));
        browser.wait(EC.elementToBeClickable(currentMonth));
        expect(currentMonth.getText()).toBe('APR');

        //click back button and check previous month
        var prev= element(by.xpath('//*[@id="mat-datepicker-0"]/div[1]/div/button[2]'));
        browser.wait(EC.elementToBeClickable(next));
        prev.click();
        var currentMonth= element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-month-view/table/tbody/tr[1]/td[1]'));
        browser.wait(EC.elementToBeClickable(currentMonth));
        expect(currentMonth.getText()).toBe('MAR');

        //click year selector button
        var yearSelector= element(by.xpath('//*[@id="mat-datepicker-0"]/div[1]/div/button[1]'));
        browser.wait(EC.elementToBeClickable(yearSelector));
        yearSelector.click();

        //check first year in list
        var currentYear= element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-multi-year-view/table/tbody/tr[1]/td[1]/div'));
        browser.wait(EC.elementToBeClickable(currentYear));
        expect(currentYear.getText()).toBe('2016');

        //check first year in next list
        next.click();
        var currentYear= element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-multi-year-view/table/tbody/tr[1]/td[1]/div'));
        browser.wait(EC.elementToBeClickable(currentYear));
        expect(currentYear.getText()).toBe('2040');

        //check first year in prev list
        prev.click();
        var currentYear= element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-multi-year-view/table/tbody/tr[1]/td[1]/div'));
        browser.wait(EC.elementToBeClickable(currentYear));
        expect(currentYear.getText()).toBe('2016');

        //click out of calendar frame
        (element(by.xpath('/html/body/div/div[1]'))).click();
    });

    it("Should type the start date check the timeline graph for change", function() {
        var EC= protractor.ExpectedConditions;
        //type out start date
        var startDate= element(by.xpath('//*[@id="startDate"]'));
        browser.wait(EC.elementToBeClickable(startDate));
        startDate.click();
        startDate.clear();
        startDate.sendKeys('3/5/2019');
        startDate.sendKeys(protractor.Key.ENTER);
        browser.sleep(1000);
        //check the timeline graph
        expect(element(by.xpath('//*[@text-anchor="end"]')).getText()).toBe('Mar 14');
    });

    it("Should change the start date check the timeline graph for change", function() {
        var EC= protractor.ExpectedConditions;
        //select the start day via the calendar option
        var startDate= element(by.xpath('//*[@id="cdk-accordion-child-2"]/div/app-batches-timeline/app-batches-timeline-filter/form/div/div/mat-form-field[1]/div/div[1]/div[2]/mat-datepicker-toggle/button'));
        browser.wait(EC.elementToBeClickable(startDate));
        startDate.click();
        var yearSelector= element(by.xpath('//*[@id="mat-datepicker-0"]/div[1]/div/button[1]'));
        browser.wait(EC.elementToBeClickable(yearSelector));
        yearSelector.click();
        var yearOption1= element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-multi-year-view/table/tbody/tr[1]/td[3]/div'));
        browser.wait(EC.elementToBeClickable(yearOption1));
        yearOption1.click();
        var monthOption1= element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-year-view/table/tbody/tr[3]/td[2]/div'));
        browser.wait(EC.elementToBeClickable(monthOption1));
        monthOption1.click();
        var dayOption1= element(by.xpath('//*[@id="mat-datepicker-0"]/div[2]/mat-month-view/table/tbody/tr[1]/td[3]/div'));
        browser.wait(EC.elementToBeClickable(dayOption1));
        dayOption1.click();
        //check the input field
        expect(element(by.xpath('//*[@id="startDate"]')).getAttribute('value')).toBe('6/2/2018');
        //check the timeline graph
        browser.sleep(1000);
        expect(element(by.tagName('text')).getText()).toBe('July');
    });

    for (var i = 0; i < testCurriculumDropdownBatches.length; i++) {
        (function (testCurriculumDropdownBatches) {
            it('Should click and check each option on the curriculum dropdown for the batch timeline', function () {
                var EC= protractor.ExpectedConditions;
                var curriculumDropdown= element(by.xpath('//*[@id="curriculum"]'));
                var curriculumOptions= element(by.xpath(testCurriculumDropdownBatches.path));
                var isClickable= EC.elementToBeClickable(curriculumDropdown);
                browser.wait(isClickable);
                curriculumDropdown.click();
                var isClickable= EC.elementToBeClickable(curriculumOptions);
                browser.wait(isClickable);
                browser.actions().mouseMove(curriculumOptions).perform();
                curriculumOptions.click();
                expect(element(by.xpath('//*[@id="trainer-names-bg"]')).getText()).toBe(testCurriculumDropdownBatches.value);
            });
        })(testCurriculumDropdownBatches[i]);
    };

    for (var i = 0; i < testLocationDropdownBatches.length; i++) {
        (function (testLocationDropdownBatches) {
            it('Should click and check each option on the location dropdown for the batch timeline', function () {
                var EC= protractor.ExpectedConditions;
                var locationDropdown= element(by.xpath('//*[@id="location"]'));
                var locationOptions= element(by.xpath(testLocationDropdownBatches.path));
                var isClickable= EC.elementToBeClickable(locationDropdown);
                browser.wait(isClickable);
                locationDropdown.click();
                var isClickable= EC.elementToBeClickable(locationOptions);
                browser.wait(isClickable);
                locationOptions.click();
                expect(element(by.xpath('//*[@id="trainer-names-bg"]')).getText()).toBe(testLocationDropdownBatches.value);
            });
        })(testLocationDropdownBatches[i]);
    };

    for (var i = 0; i < testBuildingDropdownBatches.length; i++) {
        (function (testBuildingDropdownBatches) {
            it('Should click and check each option on the building dropdown for the batch timeline', function () {
                var EC= protractor.ExpectedConditions;
                var buildingDropdown= element(by.xpath('//*[@id="building"]'));
                var buildingOptions= element(by.xpath(testBuildingDropdownBatches.path));
                var isClickable= EC.elementToBeClickable(buildingDropdown);
                browser.wait(isClickable);
                buildingDropdown.click();
                var isClickable= EC.elementToBeClickable(buildingOptions);
                browser.wait(isClickable);
                browser.actions().mouseMove(buildingOptions).perform();
                buildingOptions.click();
                expect(element(by.xpath('//*[@id="trainer-names-bg"]')).getText()).toBe(testBuildingDropdownBatches.value);
            });
        })(testBuildingDropdownBatches[i]);
    };

    it("Should click the batches buttons and check the timeline", function() {
        var EC= protractor.ExpectedConditions;
        var btn= element(by.xpath('//*[@id="hideconcluded"]/label/div'));
        //check to make sure the concluded batches aren't showing
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[2]')).isPresent()).toBe(false);
        //check to make sure the concluded batches are showing
        browser.wait(EC.elementToBeClickable(btn));
        btn.click();
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[2]')).isPresent()).toBe(true);
        browser.wait(EC.elementToBeClickable(btn));
        btn.click();

        var btn= element(by.xpath('//*[@id="hidebatchless"]/label/div'));
        //check to make sure the batchless trainers aren't showing
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[5]')).isPresent()).toBe(false);
        //check to make sure the batchless trainers are showing
        browser.wait(EC.elementToBeClickable(btn));
        btn.click();
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[5]')).isPresent()).toBe(true);

        //type out amount of trainers per page
        var trainersPerPage= element(by.xpath('//*[@id="trainersperpage"]'));
        //check that 6 trainers aren't on this page
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[6]')).isPresent()).toBe(false);
        browser.wait(EC.elementToBeClickable(trainersPerPage));
        trainersPerPage.click();
        trainersPerPage.clear();
        trainersPerPage.sendKeys('6');
        trainersPerPage.sendKeys(protractor.Key.ENTER);
        //check that 6 trainers are on this page
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[6]')).isPresent()).toBe(true);

        //click the next page button for trainers per page
        var nextPage= element(by.xpath('//*[@id="nextpage"]'));
        browser.wait(EC.elementToBeClickable(nextPage));
        nextPage.click();
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[1]')).getText()).toBe('Richard O.');

        //click the last page button for trainers per page
        var lastPage= element(by.xpath('//*[@id="lastpage"]'));
        browser.wait(EC.elementToBeClickable(lastPage));
        lastPage.click();
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[1]')).getText()).toBe('sfsd d.');

        //click the previous page button for the trainers per page
        var prevPage= element(by.xpath('//*[@id="previouspage"]'));
        browser.wait(EC.elementToBeClickable(prevPage));
        prevPage.click();
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[1]')).getText()).toBe('Satish R.');

        //click the first page button for the trainers per page
        var firstPage= element(by.xpath('//*[@id="firstpage"]'));
        browser.wait(EC.elementToBeClickable(firstPage));
        firstPage.click();
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[1]')).getText()).toBe('August D.');

        //type the page number of trainers per page
        var page= element(by.xpath('//*[@id="currentpage"]'));
        browser.wait(EC.elementToBeClickable(page));
        page.click();
        page.clear();
        page.sendKeys('3');
        page.sendKeys(protractor.Key.ENTER);
        //check that the timeline is on page 3
        expect(element(by.xpath('//*[@id="trainer-names-bg"]/span[1]')).getText()).toBe('Trevin C.');
    });

    it("Should click and drag the timeline bar button", function() {
        //drag and drop the bar to alter the timeline graph, check top date on timeline
        var line= element(by.xpath('//*[@class="today"]'));
        var target= element(by.xpath('//*[@id="trainer-names-bg"]'));
        browser.actions().dragAndDrop(line, target).perform();
        expect(element(by.xpath('//*[@text-anchor="end"]')).getText()).toBe('Mon 10');
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

        var btn= element(by.linkText("Batches"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/batches");
    });

    afterEach(function() {
        var EC= protractor.ExpectedConditions;
        var logout= element(by.buttonText("Logout"));
        browser.wait(EC.elementToBeClickable(logout));
        logout.click();
    });

    it("Should create a new batch", function() {
        var EC= protractor.ExpectedConditions;
        var core= element(by.xpath('//*[@id="mat-select-3"]'));
        browser.wait(EC.elementToBeClickable(core));
        core.click();
        browser.sleep(1000);
        var coreChoice= element(by.xpath('//*[@id="mat-option-1"]'));
        browser.wait(EC.elementToBeClickable(coreChoice));
        coreChoice.click();
        var datepicker= element(by.xpath('//*[@id="cdk-accordion-child-3"]/div/app-batch-form/form/div[2]/mat-form-field[1]/div/div[1]/div[2]/mat-datepicker-toggle/button'));
        browser.wait(EC.elementToBeClickable(datepicker));
        datepicker.click();
        browser.sleep(1000);
        var dateOption= element(by.xpath('//*[@id="mat-datepicker-2"]/div[2]/mat-month-view/table/tbody/tr[2]/td[2]/div'));
        browser.wait(EC.elementToBeClickable(dateOption));
        dateOption.click();
        var trainer= element(by.xpath('//*[@id="mat-select-5"]'));
        browser.wait(EC.elementToBeClickable(trainer));
        trainer.click();
        browser.sleep(1000);
        var trainerOption= element(by.xpath('//*[@id="mat-option-12"]'));
        browser.wait(EC.elementToBeClickable(trainerOption));
        trainerOption.click();
        var cotrainer= element(by.xpath('//*[@id="mat-select-6"]'));
        browser.wait(EC.elementToBeClickable(cotrainer));
        cotrainer.click();
        browser.sleep(1000);
        var cotrainerOption= element(by.xpath('//*[@id="mat-option-47"]'));
        browser.wait(EC.elementToBeClickable(cotrainerOption));
        cotrainerOption.click();
        var targetSize= element(by.xpath('//*[@id="mat-input-7"]'));
        browser.wait(EC.elementToBeClickable(targetSize));
        targetSize.click();
        targetSize.clear();
        targetSize.sendKeys('11');
        browser.sleep(1000);
        var location= element(by.id('mat-select-7'));
        browser.wait(EC.elementToBeClickable(location));
        location.click();
        browser.sleep(1000);
        var locationOption= element(by.xpath('//mat-option[@id="mat-select-80"|@id="mat-select-123"]'));
        browser.wait(EC.elementToBeClickable(locationOption));
        locationOption.click();
        var building= element(by.xpath('//*[@id="mat-select-8"]'));
        browser.wait(EC.elementToBeClickable(building));
        building.click();
        browser.sleep(1000);
        var buildingOption= element(by.xpath('//*[@id="mat-option-179"]'));
        buildingOption.click();
        var room= element(by.xpath('//*[@id="mat-select-9"]'));
        browser.wait(EC.elementToBeClickable(room));
        room.click();
        browser.sleep(1000);
        var roomOption= element(by.xpath('//*[@id="mat-option-185"]'));
        roomOption.click();
        var submit= element(by.buttonText('Submit'));
        submit.click();
        expect(element(by.xpath('//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[8]/mat-cell[3]')).getText()).toBe('August Duet\nFred Belotte');

        browser.wait(EC.elementToBeClickable(location));
        location.click();
        browser.wait(EC.elementToBeClickable(locationOption));
        locationOption.click();
        var cancel= element(by.buttonText('Cancel'));
        cancel.click();
        expect(location.getAttribute('value')).toBe(null);
    });

    it("Should delete a batch", function() {
        var EC= protractor.ExpectedConditions;
        //checks the value of 'Room' field before deleting
        var room= element(by.xpath('//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[6]'));
        var roomValue= room.getText();
        var deleteBtn= element(by.xpath('//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[10]/button[2]'));
        deleteBtn.click();

        //currently the delete doesn't refresh the page, swapping tabs to refresh it
        var btn= element(by.linkText("Overview"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/overview");

        var btn= element(by.linkText("Batches"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/batches");

        var cancel= element(by.buttonText('Cancel'));
        browser.wait(EC.elementToBeClickable(cancel));
        expect(element(by.xpath('//*[@id="cdk-accordion-child-5"]/div/div/mat-table/mat-row[1]/mat-cell[6]')).getText()).toBeFalsy(roomValue);
    });

    it("Should edit a batch", function() {
        var EC= protractor.ExpectedConditions;
        var editBtn= element(by.xpath('//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[10]/button[1]'));
        browser.wait(EC.elementToBeClickable(editBtn));
        editBtn.click();
        var room= element(by.xpath('//*[@id="mat-select-9"]'));
        browser.wait(EC.elementToBeClickable(room));
        room.click();
        browser.sleep(1000);
        var roomOption= element(by.xpath('//*[@id="mat-option-185"]'));
        browser.wait(EC.elementToBeClickable(roomOption));
        roomOption.click();
        var submit= element(by.buttonText('Submit'));
        submit.click();
        expect(element(by.xpath('//*[@id="cdk-accordion-child-1"]/div/div/mat-table/mat-row[1]/mat-cell[6]')).getText()).toBe('1701 E');
    });
})