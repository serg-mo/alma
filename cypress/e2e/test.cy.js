describe('Form Submission and Admin Table Check', () => {
  it('Fill out the form and see it in the list', () => {
    cy.visit('http://localhost:3000');

    // NOTE: this is the only reliable way to address the inputs that I have found so far
    cy.get('input[type="text"]').eq(0).type('John'); // First Name
    cy.get('input[type="text"]').eq(1).type('Doe');  // Last Name
    cy.get('input[type="text"]').eq(2).type('john.doe@example.com'); // Email
    cy.get('input[type="text"]').eq(3).type('linkedin.com/in/johndoe'); // LinkedIn
    cy.get('input[type="radio"][value="O1"]').check(); // Visas
    cy.get('input[type="text"]').eq(4).type('USA'); // Country

    cy.wait(1000)
    cy.contains('Submit').click();

    cy.contains('Thank you', { matchCase: false }).should('be.visible');
    cy.contains('Admin').click();
    cy.wait(2000); // wait for mock auth

    // table has at least one row
    cy.get('table').find('tbody tr').should('have.length.greaterThan', 0);
  });
});
