describe("orders", () => {
    it("cart-update", () => {
        cy.visit('/');
        var cart_count = cy.get('#cartCounter').text;
        cart_count = cart_count ? cart_count : 0;
        cy.get(':nth-child(1) > .text-center > .justify-around > .add-to-cart').click();
        cy.get(':nth-child(2) > .text-center > .justify-around > .add-to-cart').click();
        cy.get('#cartCounter').should('have.text', cart_count + 2);
    })
})