<<<<<<< Updated upstream
// searches the pagination if theres more than 5 matters
function searchForMatter() {
  cy.get('body').then(($body) => {
    if ($body.find('[role="option"]:contains("Mock matter for billings")').length > 0) {
      cy.get('[role="option"]')
        .contains('Mock matter for billings')
=======

// searches the pagination if theres more than 5 matters
function searchForMatter(bill: string) {
  cy.get('body').then(($body) => {
    if ($body.find(`[role="option"]:contains(${bill})`).length > 0) {
      cy.get('[role="option"]')
        .contains(`${bill}`)
>>>>>>> Stashed changes
        .click()
    } else {
      cy.contains('Next').click()
      cy.wait(500)
<<<<<<< Updated upstream
      searchForMatter()
=======
      searchForMatter(bill)
>>>>>>> Stashed changes
    }
  });
}

<<<<<<< Updated upstream
=======
// searches for the bill by scrolling down
 function findBill(
  bill: string,
  options?: {
    container?: string;
    delay?: number;
  }
): void {
  const {
    container = '[data-cy="scroll-container"]',
    delay = 300,
  } = options || {};

  cy.get(container).then(($el) => {
    if ($el.find(`:contains("${bill}")`).length > 0) {
      cy.contains(bill).should('be.visible');
    } else {
      cy.get(container)
        .scrollTo('bottom', { duration: 300, ensureScrollable: false })
        .wait(delay)
        .then(() => findBill(bill, options));
    }
  });
}
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

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
        cy.get('button[type="submit"]').contains('Create Matter').click()
        cy.wait(500)
=======
        
        // cy.login("test@testdomain.com", "testPassword");
        // cy.wait(5000);
        // cy.visit("/matters").wait(5000);

        // // Creates matter for billings
        // cy.contains("Add Matter").click();
        // cy.wait(300);

        // cy.get('input[placeholder="Case Name"]').type('Mock matter for billings', {
        //     delay: 100,
        // })
        // cy.get('input[placeholder="Case Number"]').type('MOCK-498', {
        //     delay: 100,
        // })
        // cy.get('button[type="submit"]').contains('Create Matter').click()
        // cy.wait(500)
        
        // // Creates 2nd matter for filter by matter
        // cy.contains("Add Matter").click();
        // cy.wait(300);

        // cy.get('input[placeholder="Case Name"]').type('2nd Matter for Filter', {
        //     delay: 100,
        // })
        // cy.get('input[placeholder="Case Number"]').type('FILTER-094', {
        //     delay: 100,
        // })
        // cy.get('button[type="submit"]').contains('Create Matter').click()
        // cy.wait(500)

>>>>>>> Stashed changes
    })

    beforeEach(() => {
        cy.login("test@testdomain.com", "testPassword");
        cy.wait(5000);
        cy.visit("/billings").wait(5000);
    })


    //----------This is good----------

<<<<<<< Updated upstream
    describe("Creating bills with validation", () => {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.contains('Add Bill').click()
            cy.wait(300);
        })

        it("should validate required fields", () => {
            cy.get('button[id="saveBtn"]').contains("Save").click();
            cy.contains("Matter is required. Please select a matter.").should("exist");
            cy.contains("Name is required. Please enter a bill name.").should("exist");
            cy.contains("Amount is required. Please enter an amount.").should("exist");
            cy.wait(3000);
        })

        it("should show a validation error when only the Matter is selected", () => {
            cy.get('#matter').click()
            searchForMatter()
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.contains("Name is required. Please enter a bill name.").should("exist");
            cy.contains("Amount is required. Please enter an amount.").should("exist");
        })

        it("should show a validation error when only Name is entered", () => {
            cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
                delay: 100,
            })
            cy.get('button[id="saveBtn"]').contains("Save").click();
            cy.contains("Matter is required. Please select a matter.").should("exist");
            cy.contains("Amount is required. Please enter an amount.").should("exist");
        })

        it("should show a validation error when only Amount is entered", () => {
            cy.get('input[placeholder="Enter amount"]').type('13000', {
                delay: 100,
            })
            cy.get('button[id="saveBtn"]').contains("Save").click();
            cy.contains("Matter is required. Please select a matter.").should("exist");
            cy.contains("Name is required. Please enter a bill name.").should("exist");
        })

        it("should show a validation error when only Matter and Name is entered", () => {
            cy.get('#matter').click()
            searchForMatter()
            cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
                delay: 100,
            })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.contains("Amount is required. Please enter an amount.").should("exist");
        })

        it("should show a validation error when only Matter and Amount is entered", () => {
            cy.get('#matter').click()
            searchForMatter()
            cy.get('input[placeholder="Enter amount"]').type('13000', {
                delay: 100,
            })
            cy.get('button[id="saveBtn"]').contains("Save").click();
            cy.contains("Name is required. Please enter a bill name.").should("exist");

        })

        it("should show a validation error when only Amount and Name is entered", () => {
            cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
                delay: 100,
            })
            cy.get('input[placeholder="Enter amount"]').type('13000', {
                delay: 100,
            })
            cy.get('button[id="saveBtn"]').contains("Save").click();
            cy.contains("Matter is required. Please select a matter.").should("exist");
        })
    })

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

    describe("should create a bill with or without remarks", () => {
        beforeEach(() => {
            cy.viewport(1280, 800)
            cy.contains("Add Bill").click();
            cy.wait(300);
        })

        it('should create a bill with remarks', () => {
            cy.get('#matter').click()
            searchForMatter()
            cy.get('input[placeholder="Enter bill name"]').type('Bill with remarks', {
                delay: 100,
            })
            cy.get('input[placeholder="Enter amount"]').type('1000', {
                delay: 100,
            })
            cy.get('#status').click()
            cy.wait(300)
            cy.get('[role="option"]').contains('Unpaid').click()
            cy.get('textarea[id="remarks"]').type('Bill with added remarks', {delay: 100})
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('Bill with added remarks').should('be.visible')
        })

        it('should create a bill without remarks', () => {
            cy.get('#matter').click()
            searchForMatter()
            cy.get('input[placeholder="Enter bill name"]').type('Bill without remarks', {
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
            cy.contains('No remarks').should('be.visible')
        })
    })

    describe(`Creating matters using the "Create New" from different locations`, () => {
        it('should create a bill using Create New button from billings page', () => {
            cy.viewport(1280, 800)
            cy.contains('Create New').click()
            cy.wait(300)
            cy.contains("New Bill").click();
            cy.wait(300);
            cy.get('#matter').click()
            searchForMatter()
            cy.get('input[placeholder="Enter bill name"]').type('Create New Billings', {
                delay: 100,
            })
            cy.get('input[placeholder="Enter amount"]').type('1000', {
                delay: 100,
            })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('Create New Billings').should('be.visible')
        })



        it('should create a bill from tasks page and return to billings', () => {
            cy.visit('/tasks')
            cy.wait(500)
            cy.viewport(1280, 800)
            cy.contains('Create New').click()
            cy.wait(300)
            cy.contains("New Bill").click();
            cy.wait(300);
            cy.get('#matter').click()
            searchForMatter()
            cy.get('input[placeholder="Enter bill name"]').type('Create New Tasks', {
                delay: 100,
            })
            cy.get('input[placeholder="Enter amount"]').type('1000', {
                delay: 100,
            })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.visit('/billings')
            cy.wait(500)
            cy.contains('Create New Tasks').should('be.visible')
        })



        it('should create a bill from matters page and return to billings', () => {
            cy.visit('/matters')
            cy.wait(500)
            cy.viewport(1280, 800)
            cy.contains('Create New').click()
            cy.wait(300)
            cy.contains("New Bill").click();
            cy.wait(300);
            cy.get('#matter').click()
            searchForMatter()
            cy.get('input[placeholder="Enter bill name"]').type('Create New Matters', {
                delay: 100,
            })
            cy.get('input[placeholder="Enter amount"]').type('1000', {
                delay: 100,
            })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.visit('/billings')
            cy.wait(500)
            cy.contains('Create New Matters').should('be.visible')
        })
  })

    describe('When updating existing bills', () => {
        beforeEach(() =>  {
            cy.viewport(1280, 800)
        })
        it('should update the Bill Name', () => {
            cy.contains('Paid Test Bill')
            cy.contains('Paid Test Bill')
                .parents('[data-testid^="billing-row"]')
                .within(() => {
                    cy.get('[data-testid="billing-options-btn"]').click({ force: true })
                })
            cy.contains('Edit').click()
            cy.wait(500)
            cy.get('input[value="Paid Test Bill"]').clear().type('Updated Bill Name', { delay: 100 })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('Updated Bill Name').scrollIntoView().should('be.visible')
        })

        it('should show an error when editing name but field is left empty', () => {
            cy.contains('Updated Bill Name')
            cy.contains('Updated Bill Name')
                .parents('[data-testid^="billing-row"]')
                .within(() => {
                    cy.get('[data-testid="billing-options-btn"]').click({ force: true })
                })
            cy.contains('Edit').click()
            cy.get('input[value="Updated Bill Name"]').clear()
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains("Name is required. Please enter a bill name.").should("exist");
        })

        it('should update the Amount', () => {
            cy.contains('Updated Bill Name')
            cy.contains('Updated Bill Name')
                .parents('[data-testid^="billing-row"]')
                .within(() => {
                    cy.get('[data-testid="billing-options-btn"]').click({ force: true })
                })
            cy.contains('Edit').click()
            cy.get('input[value="1000"]').clear().type('500', { delay: 100 })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('500').should('be.visible')
        })

        it('should show an error when editing amount but field is left empty', () => {
            cy.contains('Updated Bill Name')
            cy.contains('Updated Bill Name')
                .parents('[data-testid^="billing-row"]')
                .within(() => {
                    cy.get('[data-testid="billing-options-btn"]').click({ force: true })
                })
            cy.contains('Edit').click()
            cy.get('input[value="500"]').clear()
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains("Amount is required. Please enter an amount.").should("exist");
        })

        it('should update the Status', () => {
            cy.contains('Updated Bill Name')
            cy.contains('Updated Bill Name')
                .parents('[data-testid^="billing-row"]')
                .within(() => {
                    cy.get('[data-testid="billing-options-btn"]').click({ force: true })
                })
            cy.contains('Edit').click()
            cy.get('#edit-status').click()
            cy.wait(300)
            cy.get('[role="option"]').contains('Unpaid').click()
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('unpaid').should('be.visible')
        })

        it('should update the Remarks', () => {
            cy.contains('Updated Bill Name')
            cy.contains('Updated Bill Name')
                .parents('[data-testid^="billing-row"]')
                .within(() => {
                    cy.get('[data-testid="billing-options-btn"]').click({ force: true })
                })
            cy.contains('Edit').click()
            cy.get('textarea[id="edit-remarks"]').type('Updated Bill with added remarks', {
                delay: 100
            })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.wait(500)
            cy.contains('Updated Bill with added remarks').should('be.visible')
        })
    })

    describe('When deleting existing bills', () => {
        beforeEach(() =>  {
            cy.viewport(1280, 800)
        })

        it('should delete thr updated bill', () => {
            cy.contains('Updated Bill Name')
            cy.contains('Updated Bill Name')
                .parents('[data-testid^="billing-row"]')
                .within(() => {
                    cy.get('[data-testid="billing-options-btn"]').click({ force: true })
                })
            cy.contains('Delete').click()
            cy.wait(500)
            cy.contains('Delete').click()
            cy.wait(500)
            cy.contains("Bill deleted successfully!").should("exist");
        })

        it('should delete the unpaid bill', () => {
            cy.contains('Unpaid Test Bill')
            cy.contains('Unpaid Test Bill')
                .parents('[data-testid^="billing-row"]')
                .within(() => {
                    cy.get('[data-testid="billing-options-btn"]').click({ force: true })
                })
            cy.contains('Delete').click()
            cy.wait(500)
            cy.contains('Delete').click()
            cy.wait(500)
            cy.contains("Bill deleted successfully!").should("exist");
        })
    
    })


    // describe('When deleting existing bills', () => {
    //     beforeEach(() =>  {
    //         cy.viewport(1280, 800)
    //         cy.get('#matter').click()
    //         searchForMatter()
    //     })

    //     it('should create a bill with unpaid status', () => {
    //         cy.get('input[placeholder="Enter bill name"]').type('Unpaid Test Bill', {
=======
//     describe("Creating bills with validation", () => {
//         beforeEach(() => {
//             cy.viewport(1280, 800)
//             cy.contains('Add Bill').click()
//             cy.wait(300);
//         })

//         it("should validate required fields", () => {
//             cy.get('button[id="saveBtn"]').contains("Save").click();
//             cy.contains("Matter is required. Please select a matter.").should("exist");
//             cy.contains("Name is required. Please enter a bill name.").should("exist");
//             cy.contains("Amount is required. Please enter an amount.").should("exist");
//             cy.wait(3000);
//         })

//         it("should show a validation error when only the Matter is selected", () => {
//             cy.get('#matter').click()
//             searchForMatter('Mock matter for billings')
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.contains("Name is required. Please enter a bill name.").should("exist");
//             cy.contains("Amount is required. Please enter an amount.").should("exist");
//         })

//         it("should show a validation error when only Name is entered", () => {
//             cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
//                 delay: 100,
//             })
//             cy.get('button[id="saveBtn"]').contains("Save").click();
//             cy.contains("Matter is required. Please select a matter.").should("exist");
//             cy.contains("Amount is required. Please enter an amount.").should("exist");
//         })

//         it("should show a validation error when only Amount is entered", () => {
//             cy.get('input[placeholder="Enter amount"]').type('13000', {
//                 delay: 100,
//             })
//             cy.get('button[id="saveBtn"]').contains("Save").click();
//             cy.contains("Matter is required. Please select a matter.").should("exist");
//             cy.contains("Name is required. Please enter a bill name.").should("exist");
//         })

//         it("should show a validation error when only Matter and Name is entered", () => {
//             cy.get('#matter').click()
//             searchForMatter('Mock matter for billings')
//             cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
//                 delay: 100,
//             })
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.contains("Amount is required. Please enter an amount.").should("exist");
//         })

//         it("should show a validation error when only Matter and Amount is entered", () => {
//             cy.get('#matter').click()
//             searchForMatter('Mock matter for billings')
//             cy.get('input[placeholder="Enter amount"]').type('13000', {
//                 delay: 100,
//             })
//             cy.get('button[id="saveBtn"]').contains("Save").click();
//             cy.contains("Name is required. Please enter a bill name.").should("exist");

//         })

//         it("should show a validation error when only Amount and Name is entered", () => {
//             cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
//                 delay: 100,
//             })
//             cy.get('input[placeholder="Enter amount"]').type('13000', {
//                 delay: 100,
//             })
//             cy.get('button[id="saveBtn"]').contains("Save").click();
//             cy.contains("Matter is required. Please select a matter.").should("exist");
//         })
//     })

//     describe("should create a bill with statuses", () => {
//         beforeEach(() => {
//             cy.viewport(1280, 800)
//             cy.contains("Add Bill").click();
//             cy.wait(300);
//         })

//         it('should create a bill with unpaid status', () => {
//             cy.get('#matter').click()
//             searchForMatter('Mock matter for billings')
//             cy.get('input[placeholder="Enter bill name"]').type('Unpaid Test Bill', {
//                 delay: 100,
//             })
//             cy.get('input[placeholder="Enter amount"]').type('1000', {
//                 delay: 100,
//             })
//             cy.get('#status').click()
//             cy.wait(300)
//             cy.get('[role="option"]').contains('Unpaid').click()
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             findBill('Unpaid Test Bill')
//         })

//         it('should create a bill with paid status', () => {
//             cy.get('#matter').click()
//             searchForMatter('Mock matter for billings')
//             cy.get('input[placeholder="Enter bill name"]').type('Paid Test Bill', {
//                 delay: 100,
//             })
//             cy.get('input[placeholder="Enter amount"]').type('1000', {
//                 delay: 100,
//             })
//             cy.get('#status').click()
//             cy.wait(300)
//             cy.get('[role="option"]').contains('Paid').click()
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             findBill('Paid Test Bill')
//         })
//     })

//     describe("should create a bill with or without remarks", () => {
//         beforeEach(() => {
//             cy.viewport(1280, 800)
//             cy.contains("Add Bill").click();
//             cy.wait(300);
//         })

//         it('should create a bill with remarks', () => {
//             cy.get('#matter').click()
//             searchForMatter('Mock matter for billings')
//             cy.get('input[placeholder="Enter bill name"]').type('Bill with remarks', {
//                 delay: 100,
//             })
//             cy.get('input[placeholder="Enter amount"]').type('1000', {
//                 delay: 100,
//             })
//             cy.get('#status').click()
//             cy.wait(300)
//             cy.get('[role="option"]').contains('Unpaid').click()
//             cy.get('textarea[id="remarks"]').type('Bill with added remarks', {delay: 100})
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             findBill('Bill with added remarks')
//         })

//         it('should create a bill without remarks', () => {
//             cy.get('#matter').click()
//             searchForMatter('Mock matter for billings')
//             cy.get('input[placeholder="Enter bill name"]').type('Bill without remarks', {
//                 delay: 100,
//             })
//             cy.get('input[placeholder="Enter amount"]').type('1000', {
//                 delay: 100,
//             })
//             cy.get('#status').click()
//             cy.wait(300)
//             cy.get('[role="option"]').contains('Unpaid').click()
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             findBill('No remarks')
//         })
//     })

//     describe(`Creating matters using the "Create New" from different locations`, () => {
//         it('should create a bill using Create New button from billings page', () => {
//             cy.viewport(1280, 800)
//             cy.contains('Create New').click({force:true})
//             cy.wait(300)
//             cy.contains("New Bill").click({force:true});
//             cy.wait(300);
//             cy.get('#matter').click({force:true})
//             searchForMatter('Mock matter for billings')
//             cy.get('input[placeholder="Enter bill name"]').type('Create New Billings', {
//                 delay: 100,
//             })
//             cy.get('input[placeholder="Enter amount"]').type('1000', {
//                 delay: 100,
//             })
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)

//             findBill('Create New Billings')
//         })



//         it('should create a bill from tasks page and return to billings', () => {
//             cy.visit('/tasks')
//             cy.wait(500)
//             cy.viewport(1280, 800)
//             cy.contains('Create New').click({force:true})
//             cy.wait(300)
//             cy.contains("New Bill").click({force:true});
//             cy.wait(300);
//             cy.get('#matter').click({force:true})
//             searchForMatter('Mock matter for billings')
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
//             findBill('Create New Tasks')
//         })



//         it('should create a bill from matters page and return to billings', () => {
//             cy.visit('/matters')
//             cy.wait(500)
//             cy.viewport(1280, 800)
//             cy.contains('Create New').click({force:true})
//             cy.wait(300)
//             cy.contains("New Bill").click({force:true});
//             cy.wait(300);
//             cy.get('#matter').click({force:true})
//             searchForMatter('Mock matter for billings')
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
//             findBill('Create New Matters')
//         })
//   })

//     describe('When updating existing bills', () => {
//         beforeEach(() =>  {
//             cy.viewport(1280, 800)
//         })
//         it('should update the Bill Name', () => {
//             cy.contains('Paid Test Bill')
//             cy.contains('Paid Test Bill')
//                 .parents('[data-testid^="billing-row"]')
//                 .within(() => {
//                     cy.get('[data-testid="billing-options-btn"]').click({ force: true })
//                 })
//             cy.contains('Edit').click()
//             cy.wait(500)
//             cy.get('input[value="Paid Test Bill"]').clear().type('Updated Bill Name', { delay: 100 })
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             findBill('Updated Bill Name')
//             cy.contains('Updated Bill Name').scrollIntoView().should('be.visible')
//         })

//         it('should show an error when editing name but field is left empty', () => {
//             cy.contains('Updated Bill Name')
//             cy.contains('Updated Bill Name')
//                 .parents('[data-testid^="billing-row"]')
//                 .within(() => {
//                     cy.get('[data-testid="billing-options-btn"]').click({ force: true })
//                 })
//             cy.contains('Edit').click()
//             cy.get('input[value="Updated Bill Name"]').clear()
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             cy.contains("Name is required. Please enter a bill name.").should("exist");
//         })

//         it('should update the Amount', () => {
//             cy.contains('Updated Bill Name')
//             cy.contains('Updated Bill Name')
//                 .parents('[data-testid^="billing-row"]')
//                 .within(() => {
//                     cy.get('[data-testid="billing-options-btn"]').click({ force: true })
//                 })
//             cy.contains('Edit').click()
//             cy.get('input[value="1000"]').clear().type('500', { delay: 100 })
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             cy.contains('500').should('be.visible')
//         })

//         it('should show an error when editing amount but field is left empty', () => {
//             cy.contains('Updated Bill Name')
//             cy.contains('Updated Bill Name')
//                 .parents('[data-testid^="billing-row"]')
//                 .within(() => {
//                     cy.get('[data-testid="billing-options-btn"]').click({ force: true })
//                 })
//             cy.contains('Edit').click()
//             cy.get('input[value="500"]').clear()
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             cy.contains("Amount is required. Please enter an amount.").should("exist");
//         })

//         it('should update the Status', () => {
//             cy.contains('Updated Bill Name')
//             cy.contains('Updated Bill Name')
//                 .parents('[data-testid^="billing-row"]')
//                 .within(() => {
//                     cy.get('[data-testid="billing-options-btn"]').click({ force: true })
//                 })
//             cy.contains('Edit').click()
//             cy.get('#edit-status').click()
//             cy.wait(300)
//             cy.get('[role="option"]').contains('Unpaid').click()
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             cy.contains('unpaid').should('be.visible')
//         })

//         it('should update the Remarks', () => {
//             cy.contains('Updated Bill Name')
//             cy.contains('Updated Bill Name')
//                 .parents('[data-testid^="billing-row"]')
//                 .within(() => {
//                     cy.get('[data-testid="billing-options-btn"]').click({ force: true })
//                 })
//             cy.contains('Edit').click()
//             cy.get('textarea[id="edit-remarks"]').type('Updated Bill with added remarks', {
//                 delay: 100
//             })
//             cy.get('button[id="saveBtn"]').contains('Save').click()
//             cy.wait(500)
//             cy.contains('Updated Bill with added remarks').should('be.visible')
//         })
//     })

//     describe('When deleting existing bills', () => {
//         beforeEach(() =>  {
//             cy.viewport(1280, 800)
//         })

//         it('should delete thr updated bill', () => {
//             cy.contains('Updated Bill Name')
//             cy.contains('Updated Bill Name')
//                 .parents('[data-testid^="billing-row"]')
//                 .within(() => {
//                     cy.get('[data-testid="billing-options-btn"]').click({ force: true })
//                 })
//             cy.contains('Delete').click()
//             cy.wait(500)
//             cy.contains('Delete').click()
//             cy.wait(500)
//             cy.contains("Bill deleted successfully!").should("exist");
//         })

//         it('should delete the unpaid bill', () => {
//             cy.contains('Unpaid Test Bill')
//             cy.contains('Unpaid Test Bill')
//                 .parents('[data-testid^="billing-row"]')
//                 .within(() => {
//                     cy.get('[data-testid="billing-options-btn"]').click({ force: true })
//                 })
//             cy.contains('Delete').click()
//             cy.wait(500)
//             cy.contains('Delete').click()
//             cy.wait(500)
//             cy.contains("Bill deleted successfully!").should("exist");
//         })
    
//     })


    // describe('Creates Bills for filtering', () => {
            
    //     beforeEach(() => {
    //         cy.viewport(1280, 800)
    //         cy.contains("Add Bill").click();
    //         cy.wait(300);
    //     })

    //     it('should create a bill assigned to "Mock matter for billings" with paid status', () => {
    //         cy.get('#matter').click()
    //         searchForMatter('Mock matter for billings')
    //         cy.get('input[placeholder="Enter bill name"]').type('Test Bill 1', {
    //             delay: 100,
    //         })
    //         cy.get('input[placeholder="Enter amount"]').type('1000', {
    //             delay: 100,
    //         })
    //         cy.get('#status').click()
    //         cy.wait(300)
    //         cy.get('[role="option"]').contains('Paid').click()
    //         cy.get('button[id="saveBtn"]').contains('Save').click()
    //     })

    //     it('should create a bill assigned to "Mock matter for billings" with unpaid status', () => {
    //         cy.get('#matter').click()
    //         searchForMatter('Mock matter for billings')
    //         cy.get('input[placeholder="Enter bill name"]').type('Test Bill 2', {
    //             delay: 100,
    //         })
    //         cy.get('input[placeholder="Enter amount"]').type('1000', {
    //             delay: 100,
    //         })
    //         cy.get('#status').click()
    //         cy.wait(300)
    //         cy.get('[role="option"]').contains('Unpaid').click()
    //         cy.get('button[id="saveBtn"]').contains('Save').click()
    //     })


    //     //Bills assigned to different matter
    //     it('should create a bill assigned to "2nd Matter for Filter" with paid status', () => {
    //         cy.get('#matter').click()
    //         searchForMatter('2nd Matter for Filter')
    //         cy.get('input[placeholder="Enter bill name"]').type('Test Bill 3', {
    //             delay: 100,
    //         })
    //         cy.get('input[placeholder="Enter amount"]').type('1000', {
    //             delay: 100,
    //         })
    //         cy.get('#status').click()
    //         cy.wait(300)
    //         cy.get('[role="option"]').contains('Paid').click()
    //         cy.get('button[id="saveBtn"]').contains('Save').click()
    //     })


    //     it('should create a bill assigned to "2nd Matter for Filter" with unpaid status', () => {
    //         cy.get('#matter').click()
    //         searchForMatter('2nd Matter for Filter')
    //         cy.get('input[placeholder="Enter bill name"]').type('Test Bill 4', {
>>>>>>> Stashed changes
    //             delay: 100,
    //         })
    //         cy.get('input[placeholder="Enter amount"]').type('1000', {
    //             delay: 100,
    //         })
    //         cy.get('#status').click()
    //         cy.wait(300)
    //         cy.get('[role="option"]').contains('Unpaid').click()
    //         cy.get('button[id="saveBtn"]').contains('Save').click()
<<<<<<< Updated upstream
    //         cy.wait(500)
    //         cy.contains('Unpaid Test Bill').should('be.visible')
    //     })

    
    // })

=======
    //     })

    // })

    describe('When using filters', () => {
        before(()=>{
            cy.viewport(1280, 800)
            cy.wait(300)
        })

         it('should filter all bills with all matters', () => {
            cy.get('#filter-matter-pc').click({force:true})
            cy.wait(300)
            cy.contains("All").click({force:true});
            cy.wait(300);
            cy.contains("All Bills").click({force:true});
            cy.wait(500)
            cy.contains('Test Bill 1').should('be.visible')
            cy.contains('Test Bill 2').should('be.visible')
            cy.contains('Test Bill 3').should('be.visible')
            cy.contains('Test Bill 4').should('be.visible')
         })
        //  it('should filter all bills for Mock matter for billings', () => {})
        //  it('should filter all bills for 2nd Matter for Filter', () => {})

        //  it('should filter paid bills with all matters', () => {})
        //  it('should filter paid bills for Mock matter for billings', () => {})
        //  it('should filter paid bills for 2nd Matter for Filter', () => {})

        //  it('should filter unpaid bills with all matters', () => {})
        //  it('should filter unpaid bills for Mock matter for billings', () => {})
        //  it('should filter unpaid bills for 2nd Matter for Filter', () => {})
    })
>>>>>>> Stashed changes










    after(() => {
        // Delete Test User
        cy.task('deleteUser', 'test@testdomain.com')
        // Clean up the bills via matter. Deleting the matter also deletes all bills assigned to it.
<<<<<<< Updated upstream
        cy.task('deleteMatter', 'Mock matter for billings')
=======
        const mattersToDelete = [
          "Mock matter for billings",
          "2nd Matter for Filter"
        ];
        mattersToDelete.forEach((matterName) => {
          cy.task("deleteMatter", matterName);
        });
>>>>>>> Stashed changes
    })
})