
// searches the pagination if theres more than 5 matters
function searchForMatter(bill: string) {
  cy.get('body').then(($body) => {
    if ($body.find(`[role="option"]:contains(${bill})`).length > 0) {
      cy.get('[role="option"]')
        .contains(`${bill}`)
        .click()
    } else {
      cy.contains('Next').click()
      cy.wait(500)
      searchForMatter(bill)
    }
  });
}

describe('Billings E2E Interactions',() => {
    before(() => {
        //Makes cypress ignore Hydration and ResizeObserver errors
        Cypress.on('uncaught:exception', (err) => {
          if (
            err.message.includes('Hydration failed') ||
            err.message.includes('ResizeObserver loop')
          ) {
            return false
          }
          return true
        })

        cy.signUp('Test User', 'test@testdomain.com', 'testPassword')
        cy.task('confirmUserEmail', 'test@testdomain.com')
        
        cy.login("test@testdomain.com", "testPassword");
        cy.wait(5000);
        cy.visit("/matters").wait(5000);

        // Creates matter for billings
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
        
        // Creates 2nd matter for filter by matter
        cy.contains("Add Matter").click();
        cy.wait(300);

        cy.get('input[placeholder="Case Name"]').type('2nd Matter for Filter', {
            delay: 100,
        })
        cy.get('input[placeholder="Case Number"]').type('FILTER-094', {
            delay: 100,
        })
        cy.get('button[type="submit"]').contains('Create Matter').click()
        cy.wait(500)

    })

    beforeEach(() => {
        cy.login("test@testdomain.com", "testPassword");
        cy.wait(5000);
        cy.visit("/billings").wait(5000);
    })


    // Field Validation
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
            searchForMatter('Mock matter for billings')
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
            searchForMatter('Mock matter for billings')
            cy.get('input[placeholder="Enter bill name"]').type('Test Bill', {
                delay: 100,
            })
            cy.get('button[id="saveBtn"]').contains('Save').click()
            cy.contains("Amount is required. Please enter an amount.").should("exist");
        })

        it("should show a validation error when only Matter and Amount is entered", () => {
            cy.get('#matter').click()
            searchForMatter('Mock matter for billings')
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

    //Create Bill
    describe("should create a bill with statuses", () => {
      beforeEach(() => {
        cy.viewport(1280, 800)
        cy.contains("Add Bill").click();
        cy.wait(300);
      })

      it('should create a bill with unpaid status', () => {
        cy.get('#matter').click()
        searchForMatter('Mock matter for billings')
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
        searchForMatter('Mock matter for billings')
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
        searchForMatter('Mock matter for billings')
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
        searchForMatter('Mock matter for billings')
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


    //Create bill via Create New
    describe(`Creating matters using the "Create New" from different locations`, () => {
      it('should create a bill using Create New button from billings page', () => {
        cy.viewport(1280, 800)
        cy.contains('Create New').click({force:true})
        cy.wait(300)
        cy.contains("New Bill").click({force:true});
        cy.wait(300);
        cy.get('#matter').click({force:true})
        searchForMatter('Mock matter for billings')
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
        cy.contains('Create New').click({force:true})
        cy.wait(300)
        cy.contains("New Bill").click({force:true});
        cy.wait(300);
        cy.get('#matter').click({force:true})
        searchForMatter('Mock matter for billings')
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
        cy.contains('Create New').click({force:true})
        cy.wait(300)
        cy.contains("New Bill").click({force:true});
        cy.wait(300);
        cy.get('#matter').click({force:true})
        searchForMatter('Mock matter for billings')
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

    //Editing a bill
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
        cy.contains('Updated Bill Name').should('be.visible')
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
        cy.get('#status').click()
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
        cy.get('textarea[id="remarks"]').type('Updated Bill with added remarks', {
          delay: 100
        })
        cy.get('button[id="saveBtn"]').contains('Save').click()
        cy.wait(500)
        cy.contains('Updated Bill with added remarks').should('be.visible')
      })
    })

    //Deleting Bills
    describe('When deleting existing bills', () => {
      beforeEach(() =>  {
        cy.viewport(1280, 800)
      })

      it('should delete the updated bill', () => {
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

      it('should delete the Bill with remarks', () => {
        cy.contains('Bill with remarks')
        cy.contains('Bill with remarks')
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

      it('should delete the Bill without remarks', () => {
        cy.contains('Bill without remarks')
        cy.contains('Bill without remarks')
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


      it('should delete the Create New Billings', () => {
        cy.contains('Create New Billings')
        cy.contains('Create New Billings')
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

      it('should delete the Create New Tasks', () => {
        cy.contains('Create New Tasks')
        cy.contains('Create New Tasks')
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

      it('should delete the Create New Matters', () => {
        cy.contains('Create New Matters')
        cy.contains('Create New Matters')
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


    describe('Creates Bills for filtering', () => {
            
        beforeEach(() => {
          cy.viewport(1280, 800)
          cy.wait(300)
        })

        it('should create a bill assigned to "Mock matter for billings" with paid status', () => {
          cy.contains("Add Bill").click();
          cy.wait(300);
          cy.get('#matter').click()
          searchForMatter('Mock matter for billings')
          cy.get('input[placeholder="Enter bill name"]').type('Test Bill 1', {
            delay: 100,
          })
          cy.get('input[placeholder="Enter amount"]').type('1000', {
            delay: 100,
          })
          cy.get('#status').click()
          cy.wait(300)
          cy.get('[role="option"]').contains('Paid').click()
          cy.get('button[id="saveBtn"]').contains('Save Bill').click()
          cy.wait(2000)
        })

        it('should create a bill assigned to "Mock matter for billings" with unpaid status', () => {
          cy.contains("Add Bill").click();
          cy.wait(300);
          cy.get('#matter').click()
          searchForMatter('Mock matter for billings')
          cy.get('input[placeholder="Enter bill name"]').type('Test Bill 2', {
            delay: 100,
          })
          cy.get('input[placeholder="Enter amount"]').type('1000', {
            delay: 100,
          })
          cy.get('#status').click()
          cy.wait(300)
          cy.get('[role="option"]').contains('Unpaid').click()
          cy.get('button[id="saveBtn"]').contains('Save Bill').click()
          cy.wait(2000)
        })


        //Bills assigned to different matter
        it('should create a bill assigned to "2nd Matter for Filter" with paid status', () => {
          cy.contains("Add Bill").click();
          cy.wait(300);
          cy.get('#matter').click()
          searchForMatter('2nd Matter for Filter')
          cy.get('input[placeholder="Enter bill name"]').type('Test Bill 3', {
            delay: 100,
          })
          cy.get('input[placeholder="Enter amount"]').type('1000', {
            delay: 100,
          })
          cy.get('#status').click()
          cy.wait(300)
          cy.get('[role="option"]').contains('Paid').click()
          cy.get('button[id="saveBtn"]').contains('Save Bill').click()
          cy.wait(2000)
        })


        it('should create a bill assigned to "2nd Matter for Filter" with unpaid status', () => {
          cy.contains("Add Bill").click();
          cy.wait(300);
          cy.get('#matter').click()
          searchForMatter('2nd Matter for Filter')
          cy.get('input[placeholder="Enter bill name"]').type('Test Bill 4', {
            delay: 100,
          })
          cy.get('input[placeholder="Enter amount"]').type('1000', {
            delay: 100,
          })
          cy.get('#status').click()
          cy.wait(300)
          cy.get('[role="option"]').contains('Unpaid').click()
          cy.get('button[id="saveBtn"]').contains('Save Bill').click()
          cy.wait(2000)
        })

    })

    //Filtering Bills
    describe('When using filters', () => {
      beforeEach(()=>{
        cy.viewport(1280, 800)
        cy.wait(300)
      })
      //All Bills
      it('should filter all bills with all matters', () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        cy.contains("All").click({force:true});
        cy.wait(300);
        cy.contains('All Bills').click({force:true});
        cy.wait(500)
        cy.contains('Test Bill 1').should('be.visible')
        cy.contains('Test Bill 2').should('be.visible')
        cy.contains('Test Bill 3').should('be.visible')
        cy.contains('Test Bill 4').should('be.visible')
      })


      it('should filter all bills for Mock matter for billings', () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        searchForMatter('Mock matter for billings')
        cy.wait(300);
        cy.contains('All Bills').click({force:true});
        cy.wait(500)
        cy.contains('Test Bill 1').should('be.visible')
        cy.contains('Test Bill 2').should('be.visible')
        cy.contains('Test Bill 3').should('not.exist')
        cy.contains('Test Bill 4').should('not.exist')
      })

      it('should filter all bills for 2nd Matter for Filter', () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        searchForMatter('2nd Matter for Filter')
        cy.wait(300);
        cy.contains('All Bills').click({force:true});
        cy.wait(500)
        cy.contains('Test Bill 1').should('not.exist')
        cy.contains('Test Bill 2').should('not.exist')
        cy.contains('Test Bill 3').should('be.visible')
        cy.contains('Test Bill 4').should('be.visible')
      })

      //Paid Bills
      it('should filter paid bills with all matters', () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        cy.contains("All").click({force:true});
        cy.wait(300);
        cy.contains("Paid").click({force:true});
        cy.wait(500)
        cy.contains('Test Bill 1').should('be.visible')
        cy.contains('Test Bill 2').should('not.exist')
        cy.contains('Test Bill 3').should('be.visible')
        cy.contains('Test Bill 4').should('not.exist')
      })

      it('should filter paid bills for Mock matter for billings', () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        searchForMatter('Mock matter for billings')
        cy.wait(300);
        cy.contains("Paid").click({force:true});
        cy.wait(500)
        cy.contains('Test Bill 1').should('be.visible')
        cy.contains('Test Bill 2').should('not.exist')
        cy.contains('Test Bill 3').should('not.exist')
        cy.contains('Test Bill 4').should('not.exist')
      })

      it('should filter paid bills for 2nd Matter for Filter', () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        searchForMatter('2nd Matter for Filter')
        cy.wait(300);
        cy.contains("Paid").click({force:true});
        cy.wait(500)
        cy.contains('Test Bill 1').should('not.exist')
        cy.contains('Test Bill 2').should('not.exist')
        cy.contains('Test Bill 3').should('be.visible')
        cy.contains('Test Bill 4').should('not.exist')
      })

      //Unpaid
      it('should filter unpaid bills with all matters', () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        cy.contains("All").click({force:true});
        cy.wait(300);
        cy.contains("Unpaid").click({force:true});
        cy.wait(500)
        cy.contains('Test Bill 1').should('not.exist')
        cy.contains('Test Bill 2').should('be.visible')
        cy.contains('Test Bill 3').should('not.exist')
        cy.contains('Test Bill 4').should('be.visible')
      })

      it('should filter unpaid bills for Mock matter for billings', () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        searchForMatter('Mock matter for billings')
        cy.wait(300);
        cy.contains("Unpaid").click({force:true});
        cy.wait(500)
        cy.contains('Test Bill 1').should('not.exist')
        cy.contains('Test Bill 2').should('be.visible')
        cy.contains('Test Bill 3').should('not.exist')
        cy.contains('Test Bill 4').should('not.exist')
      })

      it('should filter unpaid bills for 2nd Matter for Filter', () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        searchForMatter('2nd Matter for Filter')
        cy.wait(300);
        cy.contains("Unpaid").click({force:true});
        cy.wait(500)
        cy.contains('Test Bill 1').should('not.exist')
        cy.contains('Test Bill 2').should('not.exist')
        cy.contains('Test Bill 3').should('not.exist')
        cy.contains('Test Bill 4').should('be.visible')
      })
    })

    //Revenue Header
    //This will fail if there are other bills in the system other than these four [Test Bill 1 to 4].
    describe('Revenue Header values', () => {
      beforeEach(()=>{
        cy.viewport(1280, 800)
        cy.wait(300)
      })

      it(('should show 4000 with all four bills active'), () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        cy.contains("All").click({force:true});
        cy.wait(300);
        cy.contains('All Bills').click({force:true});
        cy.wait(500)
        cy.contains('4,000').should('be.visible')
      })

      it(('should show 2000 with only paid bills active'), () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        cy.contains("All").click({force:true});
        cy.wait(300);
        cy.contains('Paid').click({force:true});
        cy.wait(500)
        cy.contains('2,000').should('be.visible')
      })

      it(('should show 2000 with only unpaid bills active'), () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        cy.contains("All").click({force:true});
        cy.wait(300);
        cy.contains('Unpaid').click({force:true});
        cy.wait(500)
        cy.contains('2,000').should('be.visible')
      })

      it(('should show 1000 with only a paid bill from a specific matter is shown'), () => {
        cy.get('#filter-matter-pc').click({force:true})
        cy.wait(300)
        searchForMatter('Mock matter for billings')
        cy.wait(300);
        cy.contains('Paid').click({force:true});
        cy.wait(500)
        cy.contains('1,000').should('be.visible')
      })
    })

  after(() => {
    // Delete Test User
    cy.task('deleteUser', 'test@testdomain.com')
    // Clean up the bills via matter. Deleting the matter also deletes all bills assigned to it.
    const mattersToDelete = [
      "Mock matter for billings",
      "2nd Matter for Filter"
    ];
    mattersToDelete.forEach((matterName) => {
      cy.task("deleteMatter", matterName);
    });
  })
})