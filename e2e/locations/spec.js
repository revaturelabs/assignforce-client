browser.ignoreSynchronization = true;

describe("Assignforce development, test trainer", function() {

    var testHeadersLocations= [
        {id: 'mat-expansion-panel-header-1', path: '//*[@id="cdk-accordion-child-1"]/div'}
    ];

    var testHeadersSubLocations= [
        {id: 'mat-expansion-panel-header-2', path: '//*[@id="cdk-accordion-child-2"]/div'},
        {id: 'mat-expansion-panel-header-3', path: '//*[@id="cdk-accordion-child-3"]/div'},
        {id: 'mat-expansion-panel-header-4', path: '//*[@id="cdk-accordion-child-4"]/div'},
        {id: 'mat-expansion-panel-header-5', path: '//*[@id="cdk-accordion-child-5"]/div'},
        {id: 'mat-expansion-panel-header-6', path: '//*[@id="cdk-accordion-child-6"]/div'}
    ];

    var testLocations= [
        [{id: 'mat-expansion-panel-header-7', path: '//*[@id="cdk-accordion-child-7"]/div'},
        {id: 'mat-expansion-panel-header-8', path: '//*[@id="cdk-accordion-child-8"]/div'},
        {id: 'mat-expansion-panel-header-9', path: '//*[@id="cdk-accordion-child-9"]/div'},
        {id: 'mat-expansion-panel-header-10', path: '//*[@id="cdk-accordion-child-10"]/div'},
        {id: 'mat-expansion-panel-header-11', path: '//*[@id="cdk-accordion-child-11"]/div'},
        {id: 'mat-expansion-panel-header-12', path: '//*[@id="cdk-accordion-child-12"]/div'},
        {id: 'mat-expansion-panel-header-13', path: '//*[@id="cdk-accordion-child-13"]/div'}],

        [{id: 'mat-expansion-panel-header-14', path: '//*[@id="cdk-accordion-child-14"]/div'},
        {id: 'mat-expansion-panel-header-15', path: '//*[@id="cdk-accordion-child-15"]/div'}],

        [],

        [{id: 'mat-expansion-panel-header-16', path: '//*[@id="cdk-accordion-child-16"]/div'}],

        [{id: 'mat-expansion-panel-header-17', path: '//*[@id="cdk-accordion-child-17"]/div'},
        {id: 'mat-expansion-panel-header-18', path: '//*[@id="cdk-accordion-child-18"]/div'}]
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

        var btn= element(by.linkText("Locations"));
        var isClickable= EC.elementToBeClickable(btn);
        browser.wait(isClickable);
        btn.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/locations");
    });

    afterAll(function() {
        var EC= protractor.ExpectedConditions;
        var logout= element(by.buttonText("Logout"));
        browser.wait(EC.elementToBeClickable(logout));
        logout.click();
    });
    
    var k= 0;
    for (var i = 0; i < testHeadersLocations.length; i++) {
        (function (testHeadersLocations) {
            it('Should click the header dropdowns to hide them, then click to re-open', function () {
                var EC= protractor.ExpectedConditions;
                var btn= element(by.id(testHeadersLocations.id));
                var isClickable= EC.elementToBeClickable(btn);

                //closes and opens main location header
                browser.wait(isClickable);
                btn.click();
                browser.sleep(1000);
                browser.wait(protractor.ExpectedConditions.invisibilityOf(element(by.xpath(testHeadersLocations.path))));
                expect((element(by.xpath(testHeadersLocations.path))).isDisplayed()).toBe(false);

                browser.wait(isClickable);
                btn.click();
                browser.sleep(1000);
                browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.xpath(testHeadersLocations.path))));
                expect((element(by.xpath(testHeadersLocations.path))).isDisplayed()).toBe(true);

                //opens and closes sub-location headers
                for (var j = 0; j < testHeadersSubLocations.length; j++) {
                    (function (testHeadersSubLocations) {
                        var btn= element(by.id(testHeadersSubLocations.id));
                        var isClickable= EC.elementToBeClickable(btn);
                            
                        browser.wait(isClickable);
                        btn.click();
                        browser.sleep(1000);
                        browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.xpath(testHeadersSubLocations.path))));
                        expect((element(by.xpath(testHeadersSubLocations.path))).isDisplayed()).toBe(true);

                        //closes and opens each location header
                        while (k < testLocations.length) {
                            for(var l = 0; l < testLocations[k].length; l++) {
                                var locationBtn= element(by.id(testLocations[k][l].id));
                                var locationIsClickable= EC.elementToBeClickable(locationBtn);
                                    
                                browser.wait(locationIsClickable);
                                locationBtn.click();
                                browser.sleep(1000);
                                browser.wait(protractor.ExpectedConditions.invisibilityOf(element(by.xpath(testLocations[k][l].path))));
                                expect((element(by.xpath(testLocations[k][l].path))).isDisplayed()).toBe(false);
                                    
                                browser.wait(locationIsClickable);
                                locationBtn.click();
                                browser.sleep(1000);
                                browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.xpath(testLocations[k][l].path))));
                                expect((element(by.xpath(testLocations[k][l].path))).isDisplayed()).toBe(true);
                            }
                            k++;
                            break;
                        };
                        browser.wait(isClickable);
                        btn.click();
                        browser.sleep(1000);
                        browser.wait(protractor.ExpectedConditions.invisibilityOf(element(by.xpath(testHeadersSubLocations.path))));
                        expect((element(by.xpath(testHeadersSubLocations.path))).isDisplayed()).toBe(false);
                    })(testHeadersSubLocations[j]);
                };
            });
        })(testHeadersLocations[i]);
    };
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

    it("Should click the add location",function(){
        var EC = protractor.ExpectedConditions;
        var tab = element(by.linkText("Locations"));
        var locationName = element(by.xpath('//*[@tabindex="1"]'));
        var locationCity = element(by.xpath('//*[@tabindex="2"]'));
        var locationState = element(by.xpath('//*[@tabindex="3"]'));
        var cancelBtn = element(by.buttonText('Cancel'));
        var addBtn = element(by.buttonText('Add'));
        var locationAdd = element(by.xpath('//*[@id="mat-expansion-panel-header-1"]/span[1]/mat-panel-description/mat-icon'));
        var locationIsClickable = EC.elementToBeClickable(locationAdd);
 
        browser.wait(EC.elementToBeClickable(tab));
        tab.click();
        expect(browser.getCurrentUrl()).toBe("http://localhost:4200/locations");
        browser.wait(locationIsClickable);
        locationAdd.click();
        browser.sleep(2000);
        expect(element(by.xpath('//*[@class="cdk-overlay-pane"]')).isPresent()).toBe(true);
        cancelBtn.click();
        browser.sleep(2000);
        expect(element(by.xpath('//*[@class="cdk-overlay-pane"]')).isPresent()).toBe(false);
        browser.wait(EC.elementToBeClickable(locationAdd));
        locationAdd.click();
        browser.sleep(2000);
        browser.wait(EC.elementToBeClickable(locationName));
        locationName.click();
        locationName.sendKeys('The Deep');
        locationCity.click();
        locationCity.sendKeys('Tampa');
        locationState.click();
        locationState.sendKeys('Florida');
        browser.sleep(1000);
        addBtn.click();
        browser.sleep(2000);
        browser.wait(EC.elementToBeClickable(element(by.buttonText('Logout'))));
        expect(element(by.xpath('//h4[contains(text(), "The Deep")]')).getText()).toBe('The Deep  ');
    })
})