// cypress/e2e/tasks.cy.ts
describe("Task Management", () => {
  beforeEach(() => {
    cy.login("test@testdomain.com", "testPassword");
    cy.visit("/tasks");
  });

  describe("Navigation and UI", () => {
    it("should display the tasks page with expected elements", () => {
      cy.url().should("include", "/tasks");
      cy.contains("Tasks").should("exist").and("be.visible");
    });
  });

  describe("Task Creation", () => {
    it("should create a task with low priority", () => {
      cy.contains("Add Task").click();
      cy.get('input[placeholder="Task name"]').type("Low Priority Task"); // title
      cy.get('textarea[data-slot="textarea"][id="description"]')
        .should("have.attr", "placeholder", "Optional")
        .type("This is a low priority task for testing purposes."); // more detailed description

      cy.get("button#priority").click(); // Open priority dropdown
      cy.get("[role='option']").contains("Low").click(); // Select "Low" priority

      // Assert the selected priority is displayed
      cy.get('button#priority span[data-slot="select-value"]').should(
        "contain",
        "Low"
      );
      // Select a matter
      cy.get('button[role="combobox"]')
        .contains("Select a matter")
        .click({ force: true }); // Open the matter dropdown
      cy.get("[role='option']").first().click(); // Select the first available matter

      // Assert the selected matter is displayed (optional)
      cy.get('button[role="combobox"] span[data-slot="select-value"]').should(
        "not.contain",
        "Select a matter"
      );

      // Set the due date
      cy.get("input#dueDate").type("2025-05-10"); // Set due date to 2025-05-10
      cy.get("input#dueDate").should("have.value", "2025-05-10"); // Assert the due date is set correctly

      // Click Save Task button
      cy.get('button[type="submit"]').contains("Save Task").click();

      // Verify the task was created
      cy.contains("Low Priority Task").should("exist");
      cy.contains("Low").should("exist");
    });

    it("should create a task with medium priority", () => {
      cy.contains("Add Task").click();
      cy.get('input[placeholder="Task name"]').type("Medium Priority Task");
      cy.get('textarea[data-slot="textarea"][id="description"]')
        .should("have.attr", "placeholder", "Optional")
        .type("This is a medium priority task for testing purposes.");

      cy.get("button#priority").click();
      cy.get("[role='option']").contains("Medium").click();

      // Assert the selected priority is displayed
      cy.get('button#priority span[data-slot="select-value"]').should(
        "contain",
        "Medium"
      );

      // Select a matter
      cy.get('button[role="combobox"]')
        .contains("Select a matter")
        .click({ force: true });
      cy.get("[role='option']").first().click();

      // Set the due date
      cy.get("input#dueDate").type("2025-05-15");
      cy.get("input#dueDate").should("have.value", "2025-05-15");

      // Click Save Task button
      cy.get('button[type="submit"]').contains("Save Task").click();

      // Verify the task was created
      cy.contains("Medium Priority Task").should("exist");
      cy.contains("Medium").should("exist");
    });

    it("should create a task with high priority", () => {
      cy.contains("Add Task").click();
      cy.get('input[placeholder="Task name"]').type("High Priority Task");
      cy.get('textarea[data-slot="textarea"][id="description"]')
        .should("have.attr", "placeholder", "Optional")
        .type("This is a high priority task for testing purposes.");

      cy.get("button#priority").click();
      cy.get("[role='option']").contains("High").click();

      // Assert the selected priority is displayed
      cy.get('button#priority span[data-slot="select-value"]').should(
        "contain",
        "High"
      );

      // Select a matter
      cy.get('button[role="combobox"]')
        .contains("Select a matter")
        .click({ force: true });
      cy.get("[role='option']").first().click();

      // Set the due date
      cy.get("input#dueDate").type("2025-05-07");
      cy.get("input#dueDate").should("have.value", "2025-05-07");

      // Click Save Task button
      cy.get('button[type="submit"]').contains("Save Task").click();

      // Verify the task was created
      cy.contains("High Priority Task").should("exist");
      cy.contains("High").should("exist");
    });

    it("should create a task with In Progress status", () => {
        cy.contains("Add Task").click();
        cy.get('input[placeholder="Task name"]').type("In Progress Task"); // title
        cy.get('textarea[data-slot="textarea"][id="description"]') // description
          .type("This is a task that is already in progress."); // more detailed description
  
        cy.get("button#priority").click(); // Open priority dropdown
        cy.get("[role='option']").contains("Medium").click(); // Select "Medium" priority
  
        cy.get('button[role="combobox"]').contains("Select a matter").click({ force: true }); // Open the matter dropdown
        cy.get("[role='option']").first().click();  // Select the first available matter
  
        cy.get("input#dueDate").type("2025-05-20"); // Set due date to 2025-05-20
  
        cy.get('button#status').click(); // Open status dropdown
        cy.get("[role='option']").contains("In-Progress").click(); // Select "In-Progress" status
  
        cy.get('button[type="submit"]').contains("Save Task").click(); // Click Save Task button
  
        cy.contains("In Progress Task").should("exist");
        cy.contains("In-Progress").should("exist");
      });
  
      it("should create a task with Completed status", () => {
        cy.contains("Add Task").click();
        cy.get('input[placeholder="Task name"]').type("Completed Task");
        cy.get('textarea[data-slot="textarea"][id="description"]')
          .type("This is a task that has already been completed.");
  
        cy.get("button#priority").click();
        cy.get("[role='option']").contains("Low").click();
  
        cy.get('button[role="combobox"]').contains("Select a matter").click({ force: true });
        cy.get("[role='option']").first().click();
  
        cy.get("input#dueDate").type("2025-05-01");
  
        cy.get('button[role="combobox"][data-slot="select-trigger"]').contains("In-Progress").click();
        cy.get("[role='option']").contains("Completed").click();
        cy.get('button[role="combobox"][data-slot="select-trigger"] span[data-slot="select-value"]').should("contain", "Completed");
      
        cy.get("input#completionDate").type("2025-05-05");
  
        cy.get('button[type="submit"]').contains("Save Task").click();
  
        cy.contains("Completed Task").should("exist");
        cy.contains("Completed").should("exist");
      });
    });
  });
  