describe("register", () => {
    it("empty-fields", () => {
        cy.visit('/');
        cy.get('li:nth-child(2)').click();
        cy.url().should('eq', 'http://localhost:3000/register');
        cy.get('button.btn-primary').click();
        cy.get('.text-red-500').should('has.text', 'All fields are required');
    })

    it("invalid-email", () => {
        cy.visit('/');
        cy.get('li:nth-child(2)').click();
        cy.url().should('eq', 'http://localhost:3000/register');
        cy.get('#name').type('Ankit Mishra');
        cy.get('#email').type('john.doe@gmail.com');
        cy.get('#password').type('ankit123');
        cy.get('button.btn-primary').click();
        cy.get('.text-red-500').should('has.text', 'Email already exists');
    })
})