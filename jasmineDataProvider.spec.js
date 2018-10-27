require('../Utilities/customLocators.js');
var HomePage =  require('../Pages/home.page.js');
var BankManagerPage = require('../Pages/bankManager.page.js');
var Base = require('../Utilities/base.js');
var AddCustomerPage = require('../Pages/addCustomer.page.js');
var Customers = require('../Pages/customers.page.js');
var BankData = require('../TestData/bankData.json')

var using = require('jasmine-data-provider')


fdescribe('Jasmine Data Provider ', () => {

    beforeAll(function(){
        Base.navigateToUrl();
        HomePage.managerLoginButton.click();
        AddCustomerPage.goToAddCustomer();
    });

    function dataProvider(){
        return [
        {fName:"Elon", lName:'Musk',pCode:'334455'},
        {fName:"Warren", lName:'Buffet',pCode:'112233'},
        {fName:"Amanico", lName:'Ortega',pCode:'112233'}
    ]};

    using(dataProvider, function(data){
        it('should add customer: '+data.fName+' '+data.lName, () => {            
            AddCustomerPage.firstNameInputBox.sendKeys(data.fName);
            AddCustomerPage.lastNameInputBox.sendKeys(data.lName);
            AddCustomerPage.postalCodeInputBox.sendKeys(data.pCode);
            AddCustomerPage.formAddCustomerButton.click();
            expect(browser.switchTo().alert().getText()).
            toContain('Customer added successfully with customer id :');
            browser.switchTo().alert().accept();
            BankManagerPage.customerButton.click();
            expect(Customers.getLastRowValue(1).getText()).toEqual(data.fName);
            expect(Customers.getLastRowValue(2).getText()).toEqual(data.lName);
            expect(Customers.getLastRowValue(3).getText()).toEqual(data.pCode);
            AddCustomerPage.goToAddCustomer();
        });    
    });               
});