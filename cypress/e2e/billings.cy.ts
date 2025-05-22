// searches the pagination if theres more than 5 matters
function searchForMatter() {
  cy.get('body').then(($body) => {
    if ($body.find('[role="option"]:contains("Mock matter for billings")').length > 0) {
      cy.get('[role="option"]')
        .contains('Mock matter for billings')
        .click()
    } else {
      cy.contains('Next').click()
      cy.wait(500)
      searchForMatter()
    }
  });
}

describe('Billings E2E Interactions',() => {
    before(() => {
        //Makes cypress ignore the error caused by Date.now() mismatch time e.g 10:01 and 10:02
        Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Hydration failed')) {
            return false;
        }
        return true;
        });

        cy.signUp('Test User', 'test@testdomain.com', 'testPassword')
        cy.task('confirmUserEmail', 'test@testdomain.com')

        cy.login("test@testdomain.com", "testPassword");
        cy.wait(5000);
        cy.visit("/matters").wait(5000);

        cy.contains("Add Matter").click();
        cy.wait(300);

        cy.get('input[placeholder="Case Name"]').type('Mock matter for billings', {
            delay: 100,
        })
        cy.get('input[placeholder="Case Number"]').type('MOCK-498', {
            delay: 100,
        })
        cy.get('#client-name').type('John Doe', {
            delay: 100,
        })
        cy.get('#status').click()
        cy.wait(300)
        cy.get('[role="option"]').contains('Open').click()
        cy.get('button[type="submit"]').contains('Create Matter').click()
        cy.wait(500)
    })

    beforeEach(() => {
        cy.login("test@testdomain.com", "testPassword");

        cy.visit('/', {
        onBeforeLoad(win) {
            cy.stub(win.Date, 'now').returns(1747824000000);
        }})

        cy.wait(5000);
        cy.visit("/billings").wait(5000);

    })


    //----------This is good----------

    // describe("Creating bills with validation", () => {
    //     beforeEach(() => {
    //         cy.viewport(1280, 800) // forces desktop view. Cypress can't see the add button since its hidden in smaller screens
    //         cy.contains('Add Bill').click()
    //         cy.wait(300);
    //     })

    //     it("should validate required fields", () => {
    //         cy.get('button[id="saveBtn"]').contains("Save").click();
    //         cy.contains("Matter is required. Please select a matter.").should("exist");
    //         cy.contains("Name is required. Please enter a bill name.").should("exist");
    //         cy.contains("Amount is required. Please enter an amount.").should("exist");
    //         cy.wait(3000);
    //     })

    //     it("should show a validation error when only the Matter is selected", () => {
    //         cy.get('select[id="matter"]').select(0)
    //         cy.get('button[id="saveBtn"]').contains('Save').click()
    //         cy.contains("Name is required. Please enter a bill name.").should("exist");
    //         cy.contains("Amount is required. Please enter an amount.").should("exist");
    //     })

    //     it("should show a validation error when only Name is entered", () => {
    //         cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
    //             delay: 100,
    //         })
    //         cy.get('button[id="saveBtn"]').contains("Save").click();
    //         cy.contains("Matter is required. Please select a matter.").should("exist");
    //         cy.contains("Amount is required. Please enter an amount.").should("exist");
    //     })

    //     it("should show a validation error when only Amount is entered", () => {
    //         cy.get('input[placeholder="Enter amount"]').type('13000', {
    //             delay: 100,
    //         })
    //         cy.get('button[id="saveBtn"]').contains("Save").click();
    //         cy.contains("Matter is required. Please select a matter.").should("exist");
    //         cy.contains("Name is required. Please enter a bill name.").should("exist");
    //     })

    //     it("should show a validation error when only Matter and Name is entered", () => {
    //         cy.get('select[id="matter"]').select(0)
    //         cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
    //             delay: 100,
    //         })
    //         cy.get('button[id="saveBtn"]').contains('Save').click()
    //         cy.contains("Amount is required. Please enter an amount.").should("exist");
    //     })

    //     it("should show a validation error when only Matter and Amount is entered", () => {
    //         cy.get('select[id="matter"]').select(0)
    //         cy.get('input[placeholder="Enter amount"]').type('13000', {
    //             delay: 100,
    //         })
    //         cy.get('button[id="saveBtn"]').contains("Save").click();
    //         cy.contains("Name is required. Please enter a bill name.").should("exist");

    //     })

    //     it("should show a validation error when only Amount and Name is entered", () => {
    //         cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
    //             delay: 100,
    //         })
    //         cy.get('input[placeholder="Enter amount"]').type('13000', {
    //             delay: 100,
    //         })
    //         cy.get('button[id="saveBtn"]').contains("Save").click();
    //         cy.contains("Matter is required. Please select a matter.").should("exist");
    //     })
    // })

    describe("should create a bill with statuses", () => {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.contains("Add Bill").click();
            cy.wait(300);
        })

        it('should create a bill with unpaid status', () => {
            cy.get('#matter').click()
            searchForMatter()
            cy.get('input[placeholder="Enter bill name"]').type('Unpaid Test Bill', {
                delay: 100,
            })
            cy.get('input[placeholder="Enter amount"]').type('1000', {
                delay: 100,
            })
            cy.get('#status').click()
            cy.wait(300)
            cy.get('[role="option"]').contains('Unpaid').click()
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('Unpaid Test Bill').should('be.visible')
        })

        it('should create a bill with paid status', () => {
            cy.get('#matter').click()
            searchForMatter()
            cy.get('input[placeholder="Enter bill name"]').type('Paid Test Bill', {
                delay: 100,
            })
            cy.get('input[placeholder="Enter amount"]').type('1000', {
                delay: 100,
            })
            cy.get('#status').click()
            cy.wait(300)
            cy.get('[role="option"]').contains('Paid').click()
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('Paid Test Bill').should('be.visible')
        })
    })

    // describe("should create a bill with or without remarks", () => {
    //     beforeEach(() => {
    //         cy.viewport(1280, 800)
    //         cy.contains("Add Bill").click();
    //         cy.wait(300);
    //     })

    //     it('should create a bill with remarks', () => {
    //         cy.get('#matter').click()
    //         searchForMatter()
    //         cy.get('input[placeholder="Enter bill name"]').type('Bill with remarks', {
    //             delay: 100,
    //         })
    //         cy.get('input[placeholder="Enter amount"]').type('1000', {
    //             delay: 100,
    //         })
    //         cy.get('#status').click()
    //         cy.wait(300)
    //         cy.get('[role="option"]').contains('Unpaid').click()
    //         cy.get('textarea[id="remarks"]').type('Bill with added remarks', {delay: 100})
    //         cy.get('button[id="saveBtn"]').contains('Save').click()
    //         cy.wait(500)
    //         cy.contains('Bill with added remarks').should('be.visible')
    //     })

    //     it('should create a bill without remarks', () => {
    //         cy.get('#matter').click()
    //         searchForMatter()
    //         cy.get('input[placeholder="Enter bill name"]').type('Bill without remarks', {
    //             delay: 100,
    //         })
    //         cy.get('input[placeholder="Enter amount"]').type('1000', {
    //             delay: 100,
    //         })
    //         cy.get('#status').click()
    //         cy.wait(300)
    //         cy.get('[role="option"]').contains('Unpaid').click()
    //         cy.get('button[id="saveBtn"]').contains('Save').click()
    //         cy.wait(500)
    //         cy.contains('--No remarks--').should('be.visible')
    //     })
    // })

//     describe(`Creating matters using the "Create New" from different locations`, () => {
//         it('should create a bill using Create New button from billings page', () => {
//             cy.viewport(1280, 800)
//             cy.contains('Create New').click()
//             cy.wait(300)
//             cy.contains("New Bill").click();
//             cy.wait(300);
//             cy.get('#matter').click()
//             searchForMatter()
//             cy.get('input[placeholder="Enter bill name"]').type('Create New Billings', {
//                 delay: 100,
//             })
//             cy.get('input[placeholder="Enter amount"]').type('1000', {
//                 delay: 100,
//             })
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             cy.contains('Create New Billings').should('be.visible')
//         })



//         it('should create a bill from tasks page and return to billings', () => {
//             cy.visit('/tasks')
//             cy.wait(500)
//             cy.viewport(1280, 800)
//             cy.contains('Create New').click()
//             cy.wait(300)
//             cy.contains("New Bill").click();
//             cy.wait(300);
//             cy.get('#matter').click()
//             searchForMatter()
//             cy.get('input[placeholder="Enter bill name"]').type('Create New Tasks', {
//                 delay: 100,
//             })
//             cy.get('input[placeholder="Enter amount"]').type('1000', {
//                 delay: 100,
//             })
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             cy.visit('/billings')
//             cy.wait(500)
//             cy.contains('Create New Tasks').should('be.visible')
//         })



//         it('should create a bill from matters page and return to billings', () => {
//             cy.visit('/matters')
//             cy.wait(500)
//             cy.viewport(1280, 800)
//             cy.contains('Create New').click()
//             cy.wait(300)
//             cy.contains("New Bill").click();
//             cy.wait(300);
//             cy.get('#matter').click()
//             searchForMatter()
//             cy.get('input[placeholder="Enter bill name"]').type('Create New Matters', {
//                 delay: 100,
//             })
//             cy.get('input[placeholder="Enter amount"]').type('1000', {
//                 delay: 100,
//             })
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             cy.visit('/billings')
//             cy.wait(500)
//             cy.contains('Create New Matters').should('be.visible')
//         })
//   })

    describe('When updating existing bills', () => {
        it('should update the Bill Name', () => {
            cy.contains('tr', 'Paid Test Bill')
            .within(() => {
                cy.get('#radix-«r0»').scrollIntoView().click()
            })
            cy.contains('Edit').click()
            cy.get('input[value="Paid Test Bill"]').clear().type('Updated Bill Name', { delay: 100 })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('Updated Bill Name').scrollIntoView().should('be.visible')
        })

        it('should show an error when editing name but field is left empty', () => {
            cy.contains('tr', 'Updated Bill Name')
            .within(() => {
                cy.get('#radix-«r0»').scrollIntoView().click()
            })
            cy.contains('Edit').click()
            cy.get('input[value="Updated Bill Name"]').clear()
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains("Name is required. Please enter a bill name.").should("exist");
        })



        it('should update the Amount', () => {
            cy.contains('tr', 'Updated Bill Name')
            .within(() => {
                cy.get('#radix-«r0»').scrollIntoView().click()
            })
            cy.contains('Edit').click()
            cy.get('input[value="1000"]').clear().type('2500', { delay: 100 })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('2500').should('be.visible')
        })

        it('should show an error when editing amount but field is left empty', () => {
            cy.contains('tr', 'Updated Bill Name')
            .within(() => {
                cy.get('#radix-«r0»').scrollIntoView().click()
            })
            cy.contains('Edit').click()
            cy.get('input[value="2500"]').clear()
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains("Amount is required. Please enter an amount.").should("exist");
        })

        it('should update the Status', () => {
            cy.contains('tr', 'Updated Bill Name')
            .within(() => {
                cy.get('#radix-«r0»').scrollIntoView().click()
            })
            cy.contains('Edit').click()
            cy.get('#status').click()
            cy.wait(300)
            cy.get('[role="option"]').contains('Paid').click()
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('Updated Paid Bill').should('be.visible')
        })

        it('should update the Remarks', () => {
            cy.contains('tr', 'Updated Bill Name')
            .within(() => {
                cy.get('#radix-«r0»').scrollIntoView().click()
            })
            cy.contains('Edit').click()
            cy.get('textarea[id="remarks"]').type('Updated Bill with added remarks', {
                delay: 100
            })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('Updated Bill with added remarks').should('be.visible')
        })
    })











    after(() => {
        // Delete Test User
        cy.task('deleteUser', 'test@testdomain.com')
        // Clean up the bills via matter. Deleting the matter also deletes all bills assigned to it.
        cy.task('deleteMatter', 'Mock matter for billings')
    })
})