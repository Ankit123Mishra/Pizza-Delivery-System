describe("login tests", () => {
    it("adminLogin", () => {
        cy.visit('/');
        cy.get('li:nth-child(3)').click();
        cy.url().should('eq', 'http://localhost:3000/login');
        cy.fixture('admin').then((json) => {
            cy.log(json.email);
            cy.get('input[name="email"]').type(json.email);
            cy.get('input[name="password"]').type(json.password);
        });
        cy.get('button.btn-primary').click();
        cy.url().should('eq', 'http://localhost:3000/admin/orders');
    })

    it("userLogin", () => {
        cy.visit('/');
        cy.get('li:nth-child(3)').click();
        cy.url().should('eq', 'http://localhost:3000/login');
        cy.fixture('user').then((json) => {
            cy.log(json.email);
            cy.get('input[name="email"]').type(json.email);
            cy.get('input[name="password"]').type(json.password);
        });
        cy.get('button.btn-primary').click();
        cy.url().should('eq', 'http://localhost:3000/customer/orders');
    })
})