describe("Matters E2E Interactions", () => {
  // Common setup for all tests
  beforeEach(() => {
    cy.login("test@testdomain.com", "testPassword");
    cy.visit("/matters");
    // Add initial delay to ensure page is fully loaded
    cy.wait(500);
  });

  describe("Creating matters with validation", () => {
    beforeEach(() => {
      cy.contains("Add Matter").click();
      cy.wait(300);
    });

    it("should validate required fields", () => {
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.contains("Matter name is required").should("be.visible");
      cy.contains("Case number is required").should("be.visible");
    });

    it("should show validation error when only matter name is provided", () => {
      cy.get('input[placeholder="Case Name"]').type("Incomplete Matter", {
        delay: 100,
      });
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.contains("Case number is required").should("be.visible");
    });

    it("should show validation error when only case number is provided", () => {
      cy.get('input[placeholder="Case Number"]').type("INCOMPLETE-123", {
        delay: 100,
      });
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.contains("Matter name is required").should("be.visible");
    });
  });

  describe("Creating matters with different statuses", () => {
    beforeEach(() => {
      cy.contains("Add Matter").click();
      cy.wait(300);
    });

    it("should create an open matter", () => {
      cy.get('input[placeholder="Case Name"]').type("Open Matter Test", {
        delay: 100,
      });
      cy.get('input[placeholder="Case Number"]').type("OPEN-123", {
        delay: 100,
      });
      cy.get("#client-name").type("John Doe", {
        delay: 100,
      });
      cy.get("#status").click();
      cy.wait(300);
      cy.get('[role="option"]').contains("Open").click();
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.wait(500);
      cy.contains("Open Matter Test").should("be.visible");
    });
  });

  it("should create a pending matter", () => {
    cy.get('input[placeholder="Case Name"]').type("Pending Matter Test", {
      delay: 100,
    });
    cy.get('input[placeholder="Case Number"]').type("PENDING-123", {
      delay: 100,
    });
    cy.get("#status").click();
    cy.wait(300);
    cy.get('[role="option"]').contains("Pending").click();
    cy.get('button[type="submit"]').contains("Create Matter").click();
    cy.wait(500);
    cy.contains("Pending Matter Test").should("be.visible");
  });

  it("should create a closed matter", () => {
    cy.get('input[placeholder="Case Name"]').type("Closed Matter Test", {
      delay: 100,
    });
    cy.get('input[placeholder="Case Number"]').type("CLOSED-123", {
      delay: 100,
    });
    cy.get("#status").click();
    cy.wait(300);
    cy.get('[role="option"]').contains("Closed").click();
    cy.get('button[type="submit"]').contains("Create Matter").click();
    cy.wait(500);
    cy.contains("Closed Matter Test").should("be.visible");
  });

  describe.only("Creating matters with client information", () => {
    beforeEach(() => {
      cy.contains("Add Matter").click();
      cy.wait(300);
    });

    it("should create a matter with a client name", () => {
      cy.get('input[placeholder="Case Name"]').type("Matter with Client", {
        delay: 100,
      });
      cy.get('input[placeholder="Case Number"]').type("CLIENT-123", {
        delay: 100,
      });
      cy.get("#client-name").type("Alice Johnson", {
        delay: 100,
      });
      cy.get("#status").click();
      cy.wait(300);
      cy.get('[role="option"]').contains("Open").click();
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.wait(500);
      cy.contains("Matter with Client").should("be.visible");
    });

    it("should create a matter without a client name", () => {
      cy.get('input[placeholder="Case Name"]').type("Matter Without Client", {
        delay: 100,
      });
      cy.get('input[placeholder="Case Number"]').type("NO-CLIENT-123", {
        delay: 100,
      });
      cy.get("#status").click();
      cy.wait(300);
      cy.get('[role="option"]').contains("Open").click();
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.wait(500);
      cy.contains("Matter Without Client").should("be.visible");
    });
  });

  describe(`Creating matters using the "Create New" from different locations`, () => {
    it("should create matter using Create New button from matters page", () => {
      cy.contains("Create New").click();
      cy.wait(300);
      cy.contains("New Matter").click();
      cy.wait(300);
      cy.get('input[placeholder="Case Name"]')
        .should("be.visible")
        .type("Create New Button Matter", { delay: 100 });
      cy.get('input[placeholder="Case Number"]').type("NEW-BTN-123", {
        delay: 100,
      });
      cy.get("#client-name").type("John Smith", {
        delay: 100,
      });
      cy.get("#status").click();
      cy.wait(300);
      cy.get('[role="option"]').contains("Open").click();
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.wait(500);
      cy.contains("Create New Button Matter").should("be.visible");
    });

    it("should create matter from tasks page and return to matters", () => {
      cy.visit("/tasks");
      cy.wait(500);
      cy.contains("Create New").click();
      cy.wait(300);
      cy.contains("New Matter").click();
      cy.wait(300);
      cy.get('input[placeholder="Case Name"]')
        .should("be.visible")
        .type("Task Page Matter", { delay: 100 });
      cy.get('input[placeholder="Case Number"]').type("TASK-123", {
        delay: 100,
      });
      cy.get("#status").click();
      cy.wait(300);
      cy.get('[role="option"]').contains("Open").click();
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.wait(500);
      cy.visit("/matters");
      cy.wait(500);
      cy.contains("Task Page Matter").should("be.visible");
    });

    it("should create matter from billings page and return to matters", () => {
      cy.visit("/billings");
      cy.wait(500);
      cy.contains("Create New").click();
      cy.wait(300);
      cy.contains("New Matter").click();
      cy.wait(300);
      cy.get('input[placeholder="Case Name"]')
        .should("be.visible")
        .type("Billings Page Matter", { delay: 100 });
      cy.get('input[placeholder="Case Number"]').type("BILLINGS-123", {
        delay: 100,
      });
      cy.get("#status").click();
      cy.wait(300);
      cy.get('[role="option"]').contains("Open").click();
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.wait(500);
      cy.visit("/matters");
      cy.wait(500);
      cy.contains("Billings Page Matter").should("be.visible");
    });
  });

  describe("Interacting with existing matters", () => {
    it("should show matter details with Open status", () => {
      cy.contains("Open Matter Test").click();
      cy.wait(500);
      cy.get('span[data-slot="badge"]')
        .contains("Open")
        .should("have.class", "bg-green-100")
        .and("have.class", "text-green-800");
    });

    it("should show matter details with Pending status", () => {
      cy.contains("Pending Matter Test").click();
      cy.wait(500);
      cy.get('span[data-slot="badge"]')
        .contains("Pending")
        .should("have.class", "bg-yellow-100")
        .and("have.class", "text-yellow-800");
    });

    it("should show matter details with Closed status and date", () => {
      cy.contains("Closed Matter Test").click();
      cy.wait(500);
      cy.get('span[data-slot="badge"]')
        .contains("Closed")
        .should("have.class", "bg-gray-100")
        .and("have.class", "text-gray-800");
    });

    it("should show default client name as 'To be determined'", () => {
      cy.contains("Matter Without Client").click();
      cy.wait(500);
      cy.contains("To be determined").should("be.visible");
    });

    it("should show client name for matter with client", () => {
      cy.contains("Matter with Client").click();
      cy.wait(500);
      cy.contains("Alice Johnson").should("be.visible");
    });
  });

  describe("When updating existing matters", () => {
    describe("Status and date changes", () => {
      it("should update open matter to closed and show close date", () => {
        cy.contains("Open Matter Test").click();
        cy.wait(1000); // Wait for matter details to load

        // Find Case Details card and click its edit button
        cy.contains("Case Details")
          .parent()
          .find('button[aria-label="Edit"]')
          .should("be.visible")
          .click();
        cy.wait(500); // Wait for edit mode

        // Change status to closed
        cy.get(
          ":nth-child(2) > :nth-child(2) > .space-y-1 > .border-input"
        ).click();
        cy.wait(200);
        cy.get('[role="option"]').contains("Closed").click();

        // Save changes
        cy.wait(500); // Wait before saving
        cy.get('button[aria-label="Save"]').click();
        cy.wait(1000); // Wait for save to complete

        // Verify status change and close date in Case Details card
        cy.get('span[data-slot="badge"]')
          .contains("Closed")
          .should("have.class", "bg-gray-100")
          .and("have.class", "text-gray-800");

        const today = new Date().toLocaleDateString();
        cy.contains("Close Date")
          .parent()
          .should("be.visible")
          .find("p")
          .should("contain", today);
      });
    });

    describe("Client information validation", () => {
      beforeEach(() => {
        cy.contains("Matter with Client").click();
        cy.contains("Case Details")
          .parent()
          .find('button[aria-label="Edit"]')
          .should("be.visible")
          .click();
        cy.wait(500);
      });

      it("should show error for invalid email format", () => {
        cy.get('input[placeholder="Client Email"]')
          .clear()
          .type("invalid-email");
        cy.get('button[aria-label="Save"]').click();
        cy.contains("Invalid email").should("be.visible");
      });

      it("should show error for invalid phone format", () => {
        cy.get('input[placeholder="Client Phone"]')
          .clear()
          .type("invalid-phone");
        cy.get('button[aria-label="Save"]').click();
        cy.contains(
          "Phone can only contain numbers and symbols, max 15 characters"
        ).should("be.visible");
      });
    });

    describe("Client information updates", () => {
      it("should update 'To be determined' client to actual client", () => {
        cy.contains("Matter Without Client").click();

        cy.contains("Case Details")
          .parent()
          .find('button[aria-label="Edit"]')
          .should("be.visible")
          .click();
        cy.wait(500);

        // Update client information
        cy.get('input[placeholder="Client Name"]').clear().type("John Smith");
        cy.get('input[placeholder="Client Phone"]').type("123-456-7890");
        cy.get('input[placeholder="Client Email"]').type("john@example.com");
        cy.get('input[placeholder="Client Address"]').type("123 Main St");

        // Save changes
        cy.get('button[aria-label="Save"]').click();

        // Verify updates
        cy.contains("John Smith").should("be.visible");
        cy.contains("123-456-7890").should("be.visible");
        cy.contains("john@example.com").should("be.visible");
        cy.contains("123 Main St").should("be.visible");
      });

      describe("Opposing council information validation", () => {
        beforeEach(() => {
          cy.contains("Matter with Client").click();
          cy.contains("Opposing Council")
            .parent()
            .find('button[aria-label="Edit"]')
            .should("be.visible")
            .click();
          cy.wait(500);
        });

        it("should show error for invalid email format", () => {
          cy.get('input[placeholder="Email address"]')
            .clear()
            .type("invalid-email");
          cy.get('button[aria-label="Save"]').click();
          cy.contains("Invalid email").should("be.visible");
        });

        it("should show error for invalid phone format", () => {
          cy.get('input[placeholder="Phone number"]')
            .clear()
            .type("invalid-phone");
          cy.get('button[aria-label="Save"]').click();
          cy.contains(
            "Phone can only contain numbers and symbols, max 15 characters"
          ).should("be.visible");
        });
      });

      describe("Court details validation", () => {
        beforeEach(() => {
          cy.contains("Matter with Client").click();
          cy.contains("Court Details")
            .parent()
            .find('button[aria-label="Edit"]')
            .should("be.visible")
            .click();
          cy.wait(500);
        });

        it("should show error for invalid phone format", () => {
          cy.get('input[placeholder="Phone"]').clear().type("invalid-phone");
          cy.get('button[aria-label="Save"]').click();
          cy.contains(
            "Phone can only contain numbers and symbols, max 15 characters"
          ).should("be.visible");
        });

        it("should show error for invalid email format", () => {
          cy.get('input[placeholder="Email address"]')
            .clear()
            .type("invalid-email");
          cy.get('button[aria-label="Save"]').click();
          cy.contains("Invalid email").should("be.visible");
        });
      });

      describe.only("Complete matter information updates", () => {
        beforeEach(() => {
          cy.contains("Matter with Client").click();
          cy.wait(500);
        });

        it("should update court details successfully", () => {
          // Edit court details
          cy.contains("Court Details")
            .parent()
            .find('button[aria-label="Edit"]')
            .should("be.visible")
            .click();
          cy.wait(500);

          cy.get('input[placeholder="Court Name"]')
            .clear()
            .type("Superior Court");
          cy.get('input[placeholder="Phone"]').clear().type("555-123-4567");
          cy.get('input[placeholder="Email address"]')
            .clear()
            .type("court@example.gov");

          cy.get('button[aria-label="Save"]').click();
          cy.wait(500);

          // Verify updates
          cy.contains("Superior Court").should("be.visible");
          cy.contains("555-123-4567").should("be.visible");
          cy.contains("court@example.gov").should("be.visible");
        });

        it("should update opposing council details successfully", () => {
          // Edit opposing council details
          cy.contains("Opposing Council")
            .parent()
            .find('button[aria-label="Edit"]')
            .should("be.visible")
            .click();
          cy.wait(500);

          cy.get('input[placeholder="Opposing council name"]')
            .clear()
            .type("Jane Smith, Esq.");
          cy.get('input[placeholder="Phone number"]')
            .clear()
            .type("555-987-6543");
          cy.get('input[placeholder="Email address"]')
            .clear()
            .type("jsmith@lawfirm.com");
          cy.get('input[placeholder="Address"]').clear().type("789 Legal Blvd");

          cy.get('button[aria-label="Save"]').click();
          cy.wait(500);

          // Verify updates
          cy.contains("Jane Smith, Esq.").should("be.visible");
          cy.contains("555-987-6543").should("be.visible");
          cy.contains("jsmith@lawfirm.com").should("be.visible");
          cy.contains("789 Legal Blvd").should("be.visible");
        });

        it("should update all matter details comprehensively", () => {
          // Update case details first
          cy.contains("Case Details")
            .parent()
            .find('button[aria-label="Edit"]')
            .should("be.visible")
            .click();
          cy.wait(500);

          // Update client information
          cy.get('input[placeholder="Client Name"]')
            .clear()
            .type("Robert Johnson");
          cy.get('input[placeholder="Client Phone"]')
            .clear()
            .type("555-111-2222");
          cy.get('input[placeholder="Client Email"]')
            .clear()
            .type("rjohnson@email.com");
          cy.get('input[placeholder="Client Address"]')
            .clear()
            .type("123 Client St");

          cy.get('button[aria-label="Save"]').click();
          cy.wait(1000);

          // Update opposing council details
          cy.contains("Opposing Council")
            .parent()
            .find('button[aria-label="Edit"]')
            .should("be.visible")
            .click();
          cy.wait(500);

          cy.get('input[placeholder="Opposing council name"]')
            .clear()
            .type("Patricia Lee, Esq.");
          cy.get('input[placeholder="Phone number"]')
            .clear()
            .type("555-333-4444");
          cy.get('input[placeholder="Email address"]')
            .clear()
            .type("plee@lawfirm.com");
          cy.get('input[placeholder="Address"]')
            .clear()
            .type("456 Attorney Ave");

          cy.get('button[aria-label="Save"]').click();
          cy.wait(1000);

          // Update court details
          cy.contains("Court Details")
            .parent()
            .find('button[aria-label="Edit"]')
            .should("be.visible")
            .click();
          cy.wait(500);

          cy.get('input[placeholder="Court Name"]')
            .clear()
            .type("District Court");
          cy.get('input[placeholder="Phone"]').clear().type("555-555-6666");
          cy.get('input[placeholder="Email address"]')
            .clear()
            .type("district@courts.gov");

          cy.get('button[aria-label="Save"]').click();
          cy.wait(1000);

          // Verify all updates
          // Client information
          cy.contains("Robert Johnson").should("be.visible");
          cy.contains("555-111-2222").should("be.visible");
          cy.contains("rjohnson@email.com").should("be.visible");
          cy.contains("123 Client St").should("be.visible");

          // Opposing council information
          cy.contains("Patricia Lee, Esq.").should("be.visible");
          cy.contains("555-333-4444").should("be.visible");
          cy.contains("plee@lawfirm.com").should("be.visible");
          cy.contains("456 Attorney Ave").should("be.visible");

          // Court information
          cy.contains("District Court").should("be.visible");
          cy.contains("555-555-6666").should("be.visible");
          cy.contains("district@courts.gov").should("be.visible");
        });
      });

      after(() => {
        // Clean up all test matters
        const mattersToDelete = [
          "Open Matter Test",
          "Pending Matter Test",
          "Closed Matter Test",
          "Matter with Client",
          "Matter Without Client",
          "Create New Button Matter",
          "Task Page Matter",
          "Billings Page Matter",
        ];
        mattersToDelete.forEach((matterName) => {
          cy.task("deleteMatter", matterName);
        });
      });
    });
  });
});
