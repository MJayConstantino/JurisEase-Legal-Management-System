// cypress/e2e/tasks.cy.ts
describe("Tasks E2E Interactions", () => {
  beforeEach(() => {
    cy.login("test@testdomain.com", "testPassword");
    cy.wait(2000);
    cy.visit("/tasks").wait(2000);
  });

  describe("Creating tasks with validation", () => {
    beforeEach(() => {
      cy.contains("Add Task").click();
      cy.wait(300);
    });

    it("should validate required fields", () => {
      cy.get('button[type="submit"]').contains("Save Task").click();
      cy.contains("Task name is required").should("exist");
      cy.wait(3000);
    });

    it("should successfully create a task", () => {
      cy.get('input[placeholder="Task name"]').type("Test Task");
      cy.get('textarea[data-slot="textarea"][id="description"]')
        .should("have.attr", "placeholder", "Optional")
        .type("Test Task Description");
      cy.get('button[type="submit"]').contains("Save Task").click();
      cy.contains('Task "Test Task" created successfully').should("exist");
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
      cy.get("input#dueDate")
        .focus()
        .clear()
        .type("2025-05-10", { force: true });
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
      cy.get("input#dueDate")
        .focus()
        .clear()
        .type("2025-07-10", { force: true });
      cy.get("input#dueDate").should("have.value", "2025-07-10"); // Assert the due date is set correctly

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
      cy.get("input#dueDate")
        .focus()
        .clear()
        .type("2025-05-29", { force: true });
      cy.get("input#dueDate").should("have.value", "2025-05-29"); // Assert the due date is set correctly

      // Click Save Task button
      cy.get('button[type="submit"]').contains("Save Task").click();

      // Verify the task was created
      cy.contains("High Priority Task").should("exist");
      cy.contains("High").should("exist");
    });

    it("should create a task with In Progress status", () => {
      cy.contains("Add Task").click();
      cy.get('input[placeholder="Task name"]').type("In-Progress Task"); // title
      cy.get('textarea[data-slot="textarea"][id="description"]') // description
        .type("This is a task that is already in progress."); // more detailed description

      cy.get("button#priority").click(); // Open priority dropdown
      cy.get("[role='option']").contains("Medium").click(); // Select "Medium" priority

      cy.get('button[role="combobox"]')
        .contains("Select a matter")
        .click({ force: true }); // Open the matter dropdown
      cy.get("[role='option']").first().click(); // Select the first available matter

      cy.get("input#dueDate")
        .focus()
        .clear()
        .type("2025-06-26", { force: true });
      cy.get("input#dueDate").should("have.value", "2025-06-26"); // Assert the due date is set correctly

      cy.get('button[role="combobox"]')
        .contains("In-Progress")
        .click({ force: true }); // Open the status dropdown
      cy.get("[role='option']").contains("In-Progress").click(); // Select "In-Progress" status

      cy.get('button[type="submit"]').contains("Save Task").click(); // Save the task

      // Verify the task was created
      cy.contains("In-Progress Task").should("exist");
      cy.contains("In-Progress").should("exist");
    });

    it("should create a task with Complete status", () => {
      cy.contains("Add Task").click();
      cy.get('input[placeholder="Task name"]').type("Completed Task"); // title
      cy.get('textarea[data-slot="textarea"][id="description"]') // description
        .type("This is a completed task for testing."); // more detailed description

      cy.get("button#priority").click(); // Open priority dropdown
      cy.get("[role='option']").contains("Medium").click(); // Select "Medium" priority

      cy.get('button[role="combobox"]')
        .contains("Select a matter")
        .click({ force: true }); // Open the matter dropdown
      cy.get("[role='option']").first().click(); // Select the first available matter

      cy.get("input#dueDate")
        .focus()
        .clear()
        .type("2025-06-20", { force: true });
      cy.get("input#dueDate").should("have.value", "2025-06-20"); // Assert the due date is set correctly

      // Select status dropdown and change to Completed
      cy.get('button[role="combobox"]')
        .contains("In-Progress")
        .click({ force: true }); // Open the status dropdown
      cy.get("[role='option']").contains("Completed").click(); // Select "Completed" status

      cy.get('button[type="submit"]').contains("Save Task").click(); // Save the task

      // Verify the task was created
      cy.contains("Completed Task").should("exist");
      cy.contains("Completed").should("exist");
    });

    it("should create a task without a due date", () => {
      cy.contains("Add Task").click();
      cy.get('input[placeholder="Task name"]').type("No Due Date Task");
      cy.get('textarea[data-slot="textarea"][id="description"]')
        .should("have.attr", "placeholder", "Optional")
        .type("This task has no due date.");

      cy.get("button#priority").click();
      cy.get("[role='option']").contains("Medium").click();

      cy.get('button[role="combobox"]')
        .contains("Select a matter")
        .click({ force: true });
      cy.get("[role='option']").first().click();

      // Do not set a due date
      cy.get('button[type="submit"]').contains("Save Task").click();
      // Verify the task was created

      cy.contains("No Due Date Task").should("exist");
      cy.contains("No Due Date").should("exist");
    });

    it("should create a task without a matter", () => {
      cy.contains("Add Task").click();
      cy.get('input[placeholder="Task name"]').type("Task without Matter");
      cy.get('textarea[data-slot="textarea"][id="description"]')
        .should("have.attr", "placeholder", "Optional")
        .type("This task has no matter associated with it.");
      cy.get("button#priority").click();
      cy.get("[role='option']").contains("High").click();

      // Do not select a matter
      cy.get("input#dueDate")
        .focus()
        .clear()
        .type("2025-07-10", { force: true });
      cy.get("input#dueDate").should("have.value", "2025-07-10"); // Assert the due date is set correctly

      cy.get('button[type="submit"]').contains("Save Task").click();

      // Verify the task was created
      cy.contains("Task without Matter").should("exist");
      cy.contains("High").should("exist");
      cy.contains("None").should("exist");
    });
  });

  describe("Task Editing", () => {
    it("should edit a task", () => {
      cy.contains("Test Task").click();
      cy.wait(2000);
      cy.get('button[data-slot="button"]').contains("Edit Task").click();
      cy.get('input[placeholder="Task name"]').clear().type("Updated Task");
      cy.get('textarea[data-slot="textarea"][id="description"]')
        .clear()
        .type("Updated Task Description");
      cy.get("button#priority").click();
      cy.get("[role='option']").contains("High").click();
      cy.get('button[type="submit"]').contains("Update Task").click();
      cy.contains('Task "Updated Task" updated successfully').should("exist");
    });
  });

  describe("Dropdown Interaction", () => {
    it("view tasks by Grid", () => {
      cy.get(
        'button[id^="radix-«R15htqdel7»"][data-slot="dropdown-menu-trigger"]'
      )
        .should("exist")
        .click();

      cy.get('div[data-slot="dropdown-menu-content"]')
        .find('div[role="menuitem"]')
        .contains("Grid")
        .click();

      cy.get(".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3").should(
        "exist"
      );

      cy.get(".grid div.cursor-pointer").should("have.length.at.least", 1);
      cy.wait(2000);
    });

    it("view tasks by Status In-Progress", () => {
      cy.get(
        'button[id^="radix-«R15htqdel7»"][data-slot="dropdown-menu-trigger"]'
      )
        .should("exist")
        .click();

      cy.get('div[data-slot="dropdown-menu-content"]')
        .find('div[role="menuitem"]')
        .contains("In-Progress")
        .click();

      cy.get("tbody tr").each(($row) => {
        cy.wrap($row)
          .and("not.contain", "completed")
          .and("not.contain", "overdue");
      });
      cy.wait(2000);
    });

    it("view tasks by Status Overdue", () => {
      cy.get(
        'button[id^="radix-«R15htqdel7»"][data-slot="dropdown-menu-trigger"]'
      )
        .should("exist")
        .click();

      cy.get('div[data-slot="dropdown-menu-content"]')
        .find('div[role="menuitem"]')
        .contains("Overdue")
        .click();

      cy.get("tbody tr").each(($row) => {
        cy.wrap($row)
          .and("not.contain", "completed")
          .and("not.contain", "in-progress");
      });
      cy.wait(2000);
    });

    it("view tasks by Status Completed", () => {
      cy.get(
        'button[id^="radix-«R15htqdel7»"][data-slot="dropdown-menu-trigger"]'
      )
        .should("exist")
        .click();

      cy.get('div[data-slot="dropdown-menu-content"]')
        .find('div[role="menuitem"]')
        .contains("Completed")
        .click();

      cy.get("tbody tr").each(($row) => {
        cy.wrap($row)
          .and("not.contain", "in-progress")
          .and("not.contain", "overdue");
      });
      cy.wait(2000);
    });
  });

  describe("Mark task as complete", () => {
    it("should mark a task as complete directly from the table", () => {
      cy.contains("tr", "Updated Task").within(() => {
        cy.get('button[role="checkbox"][data-slot="checkbox"]').click();
      });
      cy.wait(3000);
      cy.contains('Task "Updated Task" marked as complete').should("exist");
      cy.wait(3000);
    });

    it("should mark a task as incomplete directly from the table", () => {
      cy.contains("tr", "Updated Task").within(() => {
        cy.get('button[role="checkbox"][data-slot="checkbox"]').click();
      });
      cy.wait(3000);
      cy.contains('Task "Updated Task" unmarked as complete').should("exist");
    });
  });

  describe("should delete a task", () => {
    it("should delete a task", () => {
      cy.contains("Updated Task").click();
      cy.get('button[data-slot="button"]').contains("Delete").click();
      cy.get('button[type="button"].bg-red-600.hover\\:bg-red-700')
        .contains("Delete Task")
        .click();
      cy.contains('"Updated Task" has been deleted successfully.').should(
        "exist"
      );
      cy.wait(2000);
    });
  });

  describe("Tasks in Matter Context", () => {
    let matterName;

    before(() => {
      cy.login("test@testdomain.com", "testPassword");
      cy.wait(2000);

      // Create a single test matter that we'll use for all task tests
      cy.visit("/matters");
      cy.wait(2000);

      // Create a matter with a unique name using timestamp
      cy.contains("Add Matter").click();
      cy.wait(300);

      // Generate a unique matter name with timestamp
      const timestamp = new Date().getTime();
      matterName = `Tasks Test Matter ${timestamp}`;

      cy.get('input[placeholder="Case Name"]').type(matterName, { delay: 50 });
      cy.get('input[placeholder="Case Number"]').type(`TASK-${timestamp}`, {
        delay: 50,
      });
      cy.get("#client-name").type("Task Testing Client", { delay: 50 });
      cy.get("#status").click();
      cy.wait(300);
      cy.get('[role="option"]').contains("Open").click();
      cy.get('button[type="submit"]').contains("Create Matter").click();
      cy.wait(2000);
    });

    beforeEach(() => {
      // Navigate to the matter detail page
      cy.visit("/matters");
      cy.wait(1000);
      cy.contains(matterName).click();
      cy.wait(1000);

      // Navigate to the Tasks tab in the matter detail page
      cy.get('button[role="tab"][aria-controls*="content-tasks"]')
        .contains("Tasks")
        .click();
      cy.wait(1000);
    });

    it("should create a task in matter context", () => {
      // Create a task within the matter
      cy.get('button[data-slot="button"]').contains("Add Task").click();
      cy.get('input[placeholder="Task name"]').type("Matter Context Task");
      cy.get('textarea[data-slot="textarea"][id="description"]')
        .should("have.attr", "placeholder", "Optional")
        .type("This task was created within a matter context");

      // Set priority to Medium
      cy.get("button#priority").click();
      cy.get("[role='option']").contains("Medium").click();

      // Set due date using the safe approach
      cy.get("input#dueDate")
        .focus()
        .clear()
        .type("2025-06-15", { force: true });

      // Save the task
      cy.get('button[type="submit"]').contains("Save Task").click();
      cy.contains('"Matter Context Task" created successfully').should("exist");
      cy.contains("Matter Context Task").should("exist");
    });

    it("should edit the task in matter context", () => {
      // Find and edit the task
      cy.contains("Matter Context Task")
        .closest("tr")
        .find('button[data-slot="dropdown-menu-trigger"]')
        .click();

      cy.get('div[role="menuitem"]').contains("Edit Task").click();

      // Change task details
      cy.get('input[placeholder="Task name"]')
        .clear()
        .type("Updated Matter Task");
      cy.get('textarea[data-slot="textarea"][id="description"]')
        .clear()
        .type("This task was updated in the matter context");

      // Change priority to High
      cy.get("button#priority").click();
      cy.get("[role='option']").contains("High").click();

      // Update the due date
      cy.get("input#dueDate")
        .focus()
        .clear()
        .type("2025-07-10", { force: true });

      // Save changes
      cy.get('button[type="submit"]').contains("Update Task").click();
      cy.wait(1000);
      cy.contains('"Updated Matter Task" updated successfully').should("exist");
      cy.contains("Updated Matter Task").should("exist");
    });

    it("should mark the task as complete", () => {
      // Find the task and mark it as complete using the checkbox
      cy.contains("tr", "Updated Matter Task").within(() => {
        cy.get('button[role="checkbox"][data-slot="checkbox"]').click();
      });
      cy.wait(1000);
      cy.contains('Task "Updated Matter Task" marked as complete').should("exist")
      cy.wait(1000
      );
    });

    it("should mark the task as incomplete", () => {
      // Find the task and mark it as incomplete
      cy.contains("tr", "Updated Matter Task").within(() => {
        cy.get('button[role="checkbox"][data-slot="checkbox"]').click();
      });
      cy.wait(1000);
      cy.contains('Task "Updated Matter Task" unmarked as complete').should(
        "exist"
      );
      cy.wait(1000);
    });

    it("should delete the task", () => {
      // Find and delete the task
      cy.contains("tr", "Updated Matter Task")
        .find('button[data-slot="dropdown-menu-trigger"]')
        .click();

      cy.get('div[role="menuitem"]').contains("Delete Task").click();
      cy.get('button[type="button"].bg-red-600')
        .contains("Delete Task")
        .click();
      cy.contains('"Updated Matter Task" has been deleted successfully').should(
        "exist"
      );
      cy.wait(2000);
    });

    after(() => {
      // Clean up by deleting the test matter
      cy.visit("/matters");
      cy.wait(2000);

      // Find and click on our test matter
      cy.get("tbody tr")
        .contains(matterName)
        .closest("tr")
        .find('button[data-slot="dropdown-menu-trigger"]')
        .click();

      cy.get('div[role="menuitem"]').contains("Delete Matter").click();
      cy.get('button[type="button"].bg-red-600')
        .contains("Delete Matter")
        .click();

      cy.wait(2000);
    });
  });

  after(() => {
    cy.log("Starting cleanup process to delete all test tasks");

    // Login and navigate to tasks page
    cy.login("test@testdomain.com", "testPassword");
    cy.wait(2000);
    cy.visit("/tasks").wait(2000);

    // List of task names created in the tests
    const tasksToDelete = [
      "Low Priority Task",
      "Medium Priority Task",
      "High Priority Task",
      "In-Progress Task",
      "Completed Task",
      "No Due Date Task",
      "Task without Matter",
      "Edited Matter Task",
    ];

    // Function to delete a single task if it exists
    const deleteTaskIfExists = (taskName) => {
      cy.get("body").then(($body) => {
        // Check if task exists
        if ($body.text().includes(taskName)) {
          cy.log(`Deleting task: ${taskName}`);

          // Try-catch to handle potential errors
          try {
            // Open actions menu for the task
            cy.contains("tr", taskName)
              .find('button[data-slot="dropdown-menu-trigger"]')
              .click({ force: true });

            // Click delete option
            cy.get('div[role="menuitem"]')
              .contains("Delete Task")
              .click({ force: true });

            // Confirm deletion in modal
            cy.get("button.bg-red-600")
              .contains("Delete Task")
              .click({ force: true });

            // Wait for deletion to complete
            cy.wait(3000);
          } catch (e) {
            cy.log(`Error deleting task "${taskName}": ${e.message}`);
            // Try alternative method - clicking on task name first
            try {
              cy.contains(taskName).click({ force: true });
              cy.get('button[data-slot="button"]')
                .contains("Delete")
                .click({ force: true });
              cy.get("button.bg-red-600")
                .contains("Delete Task")
                .click({ force: true });
              cy.wait(500);
            } catch (e2) {
              cy.log(`Alternative method also failed: ${e2.message}`);
            }
          }
        } else {
          cy.log(`Task "${taskName}" not found, skipping deletion`);
        }
      });
    };

    // Process each task in the list
    tasksToDelete.forEach((taskName) => {
      deleteTaskIfExists(taskName);
    });

    // Final verification - reload page and check if tasks are gone
    cy.reload();
    cy.wait(2000);

    // Log completion message
    cy.log("Task cleanup process complete");
  });
});
