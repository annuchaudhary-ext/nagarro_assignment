// import login from '../src/login';
// const login = require("../src/login.js");

var credResultset = {
    valid: false,
    data: {
        email: false,
        password: false
    }
}

describe("My Sample Login App || Check For Valid Credentials", function() { 
    it("should return false when incorrect credentials entered", function() {

        const {email, password} = ['chaudharyannu7@gmail.com' , 'Annu@1212'];
        
        expect(checkIfCredentialsValid(email, password)).toBe(false);

    });
    it("should return true when correct credentials entered", function() {

        const {email, password} = ['chaudharyannu7@gmail.com' , 'Annu@1234'];
        
        expect(checkIfCredentialsValid(email, password)).toBe(false);

    });
});

describe("My Sample Login App || Check For Credentials Input Ranges", function() { 

    afterEach( function () {
        credResultset.valid = false;
        credResultset.data.email = false;
        credResultset.data.password = false;
    });

    it("should return false when invalid email password entered", function() {

        const email = 'chaudharyangmail.com'; 
        const password = 'alsdjsalk';
        
        expect(validateEmailPassword(email, password)).toEqual(credResultset);

    });
    it("should return valid is false when invalid email entered", function() {

        const email = 'chaudharyangmail.com'; 
        const password = 'Annu@1234';
        
        credResultset.data.password = true;

        expect(validateEmailPassword(email, password)).toEqual(credResultset);
    });

    it("should return false when invalid password entered", function() {

        const email = 'haudharyannu7@gmail.com'; 
        const password = '543234';

        credResultset.data.email = true;

        expect(validateEmailPassword(email, password)).toEqual(credResultset);

    });

    it("should return true when valid email password entered", function() {

        const email = 'chaudharyannu7@gmail.com'; 
        const password = 'Annu@1234';

        credResultset.valid = true;
        credResultset.data.email = true;
        credResultset.data.password = true;
        
        expect(validateEmailPassword(email, password)).toEqual(credResultset);

    });
});

describe("My Sample Login App ||  HTML Side Test || Check For Successfull Form Submit", function() { 
    it("should return false when invalid email entered", function() {

        const email = 'chaudharyannmail.com'; 
        const password = 'Annu@1234';

        const loginForm = document.forms['loginForm'];
        loginForm[0].value = email;
        loginForm[1].value = password;
        const event = { preventDefault: function() {}};
        spyOn(event, 'preventDefault').and.callFake(function() {});
        expect(onLoginFormSubmit(event)).toBe(false);
        expect(document.querySelectorAll("span[class=error]").length).toEqual(1);
        expect(document.getElementById("emailError")).toBeDefined();

    });

    it("should return false when invalid password entered", function() {

        const email = 'chaudharyannu7@gmail.com'; 
        const password = 'annu';

        const loginForm = document.forms['loginForm'];
        loginForm[0].value = email;
        loginForm[1].value = password;
        const event = { preventDefault: function() {}};
        spyOn(event, 'preventDefault').and.callFake(function() {});
        expect(onLoginFormSubmit(event)).toBe(false);
        expect(document.querySelectorAll("span[class=error]").length).toEqual(1);
        expect(document.getElementById("passwordError")).toBeDefined();

    });

    it("should return false when invalid email and password entered", function() {

        const email = 'chaudharyannugmail.com'; 
        const password = 'annu';

        const loginForm = document.forms['loginForm'];
        loginForm[0].value = email;
        loginForm[1].value = password;
        const event = { preventDefault: function() {}};
        spyOn(event, 'preventDefault').and.callFake(function() {});
        expect(onLoginFormSubmit(event)).toBe(false);
        expect(document.querySelectorAll("span[class=error]").length).toEqual(2);
        expect(document.getElementById("emailError")).toBeDefined();
        expect(document.getElementById("passwordError")).toBeDefined();

    });

    it("should return flase when incorrect email and password entered", function() {

        const email = 'chaudharyannu7@gmail.com'; 
        const password = 'Annu@1212';

        const loginForm = document.forms['loginForm'];
        loginForm[0].value = email;
        loginForm[1].value = password;
        const event = { preventDefault: function() {}};
        spyOn(event, 'preventDefault').and.callFake(function() {});
        expect(onLoginFormSubmit(event)).toBe(false);
        expect(document.getElementById("incorrectCredError")).toBeDefined();

    });

    it("should store token in localStorage when correct email and password entered", function() {

        const email = 'chaudharyannu7@gmail.com'; 
        const password = 'Annu@1234';

        const loginForm = document.forms['loginForm'];
        loginForm[0].value = email;
        loginForm[1].value = password;
        const event = { preventDefault: function() {}};
        spyOn(event, 'preventDefault').and.callFake(function() {});
        // expect(onLoginFormSubmit(event)).toBe(true);
        expect(localStorage.getItem("authToken")).toBeDefined();
        // expect(document.URL).toEqual("file:///D:/Code/src/index.html");
    });
});