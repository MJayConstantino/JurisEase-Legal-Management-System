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
  });

  describe("Creating matters with client information", () => {
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
