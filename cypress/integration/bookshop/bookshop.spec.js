

describe("When the site loads", function () {


    it('Should Display Correct Title', function () {
        cy.server();
        cy.route('**/Books/*').as('getUsers')
        cy.visit("http://localhost:4004/vue/index.html");
        cy.get("h1:first-of-type").first().then(function ($header) {
            expect($header[0].innerText).to.equal("Capire Books");
        });
    });


    it('Should Display Search Input Box', function () {
        cy.get("input").first().should('have.attr', 'placeholder', 'Search...')
    }); 
}
)

describe("When the user search for books", function () {

    it('Should Display Correct Results', function () {
        cy.get("input").first().type("Raven");
        cy.get('#books tbody > tr')
            .each(($el) => {
                cy.wrap($el).contains("Raven");
            })
    })
});


