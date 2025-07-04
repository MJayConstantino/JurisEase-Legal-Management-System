import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supUrl = Deno.env.get("_SUPABASE_URL") as string;
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY") as string;
const supabase = createClient(supUrl, supKey);

async function cleanupTestCases(affectedIds: string[], table: string) {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .in("task_id", affectedIds);
    if (error) throw error;
    console.log(`Successfully cleaned up rows in table: ${table}`);
  } catch (error: any) {
    console.error(`Error cleaning up rows in table: ${table}`, error.message);
  }
}

async function cleanupTestMatter(matterId: string) {
  try {
    const { error } = await supabase
      .from("matters")
      .delete()
      .eq("matter_id", matterId);
    if (error) throw error;
    console.log(`Successfully cleaned up test matter: ${matterId}`);
  } catch (error: any) {
    console.error(`Error cleaning up test matter: ${matterId}`, error.message);
  }
}

console.log("Hello from task-table-api-tests!");

Deno.serve(async (req) => {
  const { action, data, task_id, table, matter_id } = await req
    .json()
    .catch(() => ({}));
  const { action, data, task_id, table, matter_id } = await req
    .json()
    .catch(() => ({}));
  const defaultTable = "tasks";
  // Authorization
  const authHeader = req.headers.get("Authorization");
  if (
    !authHeader ||
    authHeader !== `Bearer ${Deno.env.get("_USER_CRUD_TOKEN")}`
  ) {
    return new Response(
      JSON.stringify({
        code: 401,
        message: "Missing or invalid authorization header",
      }),
      { headers: { "Content-Type": "application/json" }, status: 401 }
    );
  }
  try {
    // CLEAN_UP action
    if (action === "CLEAN_UP") {
      if (!task_id || !Array.isArray(task_id)) {
        return new Response(
          JSON.stringify({
            status: 400,
            error: "Invalid or missing task_id array",
          }),
          { headers: { "Content-Type": "application/json" }, status: 400 }
        );
      }
      if (!table) {
        return new Response(
          JSON.stringify({ status: 400, error: "Missing table name" }),
          { headers: { "Content-Type": "application/json" }, status: 400 }
        );
      }
      await cleanupTestCases(task_id, table);
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Cleanup successful",
        }),
        { headers: { "Content-Type": "application/json" }, status: 200 }
      );
    }

    // GET_ALL
    if (action === "GET_ALL") {
      const { data: tasks, error } = await supabase
        .from(table || defaultTable)
        .select("*");
      if (error) throw error;
      return new Response(JSON.stringify({ status: 200, data: tasks }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // GET_ONE
    if (action === "GET_ONE") {
      const { data: task, error } = await supabase
        .from(table || defaultTable)
        .select("*")
        .eq("task_id", task_id)
        .single();
      if (error || !task) {
        return new Response(
          JSON.stringify({ status: 404, error: "Task not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }
      return new Response(JSON.stringify({ status: 200, data: task }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // GET_TASKS_BY_MATTER
    if (action === "GET_TASKS_BY_MATTER") {
      const matterId = matter_id?.trim();
      if (!matterId) {
        return new Response(
          JSON.stringify({
            status: 400,
            error: "Missing or invalid matter_id",
          }),
          { headers: { "Content-Type": "application/json" }, status: 400 }
        );
      }

      try {
        // 1. Create or update the matter
        const mockMatter = {
          matter_id: matterId,
          name: "Alcorin vs. Amada",
          client: "MJ Constantino",
          status: "open",
          created_at: new Date().toISOString(),
          date_opened: new Date().toISOString(),
          description: "EME EME",
          case_number: "CV-123",
        };

        const { error: matterError } = await supabase
          .from("matters")
          .upsert(mockMatter, { onConflict: "matter_id" });

        if (matterError) {
          console.error("Error creating matter:", matterError);
          throw new Error("Failed to create matter: " + matterError.message);
        }

        // 2. Check if tasks already exist for this matter
        const { data: existingTasks, error: checkError } = await supabase
          .from(table || defaultTable)
          .select("task_id")
          .eq("matter_id", matterId);

        if (checkError) {
          console.error("Error checking existing tasks:", checkError);
          throw new Error(
            "Failed to check existing tasks: " + checkError.message
          );
        }

        // 3. Create tasks if they don't exist
        if (!existingTasks || existingTasks.length === 0) {
          console.log("No existing tasks found, creating new tasks");

          const mockTasks = [
            {
              task_id: crypto.randomUUID(),
              name: "Prepare Complaint",
              description: "Draft initial complaint document",
              status: "in-progress",
              priority: "medium",
              matter_id: matterId,
              due_date: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
            {
              task_id: crypto.randomUUID(),
              name: "Client Interview",
              description: "Conduct interview with MJ Constantino",
              status: "in-progress",
              priority: "high",
              matter_id: matterId,
              due_date: new Date(
                Date.now() + 14 * 24 * 60 * 60 * 1000
              ).toISOString(),
            },
          ];

          const { error: insertError } = await supabase
            .from(table || defaultTable)
            .insert(mockTasks);

          if (insertError) {
            console.error("Error inserting tasks:", insertError);
            throw new Error("Failed to insert tasks: " + insertError.message);
          }
          console.log("Successfully created tasks for matter");
        }

        // 4. Fetch all tasks for this matter
        const { data: tasks, error: fetchError } = await supabase
          .from(table || defaultTable)
          .select("*")
          .eq("matter_id", matterId);

        if (fetchError) {
          console.error("Error fetching tasks:", fetchError);
          throw new Error("Failed to fetch tasks: " + fetchError.message);
        }

        // 5. Return the tasks (even if it's an empty array)
        return new Response(
          JSON.stringify({
            status: 200,
            data: tasks || [],
            message: "Successfully fetched tasks for matter ID: " + matterId,
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 200,
          }
        );
      } catch (error: any) {
        console.error("Error in GET_TASKS_BY_MATTER:", error);
        return new Response(
          JSON.stringify({ status: 500, error: error.message }),
          { headers: { "Content-Type": "application/json" }, status: 500 }
        );
      }
    }

    // POST || CREATE
    if (action === "POST") {
      // Create a mock matter first
      const mockMatter = {
        matter_id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
        name: "Michael Drugs Case",
        client: "Love Doe",
        status: "open",
        date_opened: "2025-01-02T00:00:00.000Z",
        description: "Criminal case on an arson case.",
        case_number: "CN-112",
        created_at: new Date().toISOString(),
      };

      // Insert the mock matter
      const { data: insertedMatter, error: matterError } = await supabase
        .from("matters")
        .insert(mockMatter)
        .select("*");

      if (matterError) {
        console.error("Matter insert error details:", matterError);
        throw new Error("Matter Insert Error: " + matterError.message);
      }

      // Check insertedMatter before accessing it
      if (!insertedMatter || insertedMatter.length === 0) {
        console.error("No matter data returned after insert");
        // Use the mock matter object instead of failing
        console.log("Proceeding with original mock matter data");
      } else {
        console.log("Inserted Matter:", insertedMatter[0]);
      }

      console.log("Mock matter created with ID:", mockMatter.matter_id);

      // Modify task data to use the new matter_id
      const taskData = {
        ...data,
        matter_id: mockMatter.matter_id,
      };

      // Now insert the task with the mock matter ID
      const { data: inserted, error } = await supabase
        .from(table || defaultTable)
        .insert(taskData)
        .select("*");

      if (error) throw new Error("Internal Server Error: " + error.message);

      return new Response(
        JSON.stringify({
          status: 201,
          data: inserted,
          matter: mockMatter, // Include the matter in the response
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 201,
        }
      );
    }

    // PUT || UPDATE
    if (action === "UPDATE_ONE") {
      // No mock matter creation, just update the task directly
      const { data: updated, error } = await supabase
        .from(table || defaultTable)
        .update(data)
        .eq("task_id", task_id)
        .select("*");

      if (error) throw new Error("Internal Server Error: " + error.message);

      if (!updated || updated.length === 0) {
        return new Response(
          JSON.stringify({ status: 404, error: "Task not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }

      return new Response(
        JSON.stringify({
          status: 200,
          data: updated,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // DELETE
    if (action === "DELETE_ONE") {
      // First, get the task to find its matter_id
      const { data: taskToDelete, error: taskFetchError } = await supabase
        .from(table || defaultTable)
        .select("*")
        .eq("task_id", task_id)
        .single();

      if (taskFetchError || !taskToDelete) {
        return new Response(
          JSON.stringify({ status: 404, error: "Task not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }

      // Delete the task
      const { data: deleted, error } = await supabase
        .from(table || defaultTable)
        .delete()
        .eq("task_id", task_id)
        .select("*");

      if (error) throw new Error("Internal Server Error: " + error.message);

      if (!deleted || deleted.length === 0) {
        return new Response(
          JSON.stringify({ status: 404, error: "Task not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }

      // Delete the associated matter if it exists
      if (taskToDelete.matter_id) {
        try {
          await cleanupTestMatter(taskToDelete.matter_id);
          console.log(`Deleted associated matter: ${taskToDelete.matter_id}`);
        } catch (matterError) {
          console.error("Error deleting associated matter:", matterError);
          // Continue with response even if matter deletion fails
        }
      }

      return new Response(
        JSON.stringify({
          status: 200,
          data: deleted,
          message: "Task and associated matter deleted successfully",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    if (action === "RUN_TESTS") {
      const affectedIds: string[] = [];

      // First create a mock matter to satisfy the foreign key constraint
      const mockMatterId = "32440999-bd80-47ed-91ed-a5341d6e73d7";
      const mockMatter = {
        matter_id: mockMatterId,
        name: "Test v. Case",
        client: "Test Client",
        status: "open",
        created_at: new Date().toISOString(),
        date_opened: new Date().toISOString(),
        description: "Test matter for automated tests",
        case_number: "TEST-123",
      };

      // Upsert the matter to ensure it exists
      const { error: matterError } = await supabase
        .from("matters")
        .upsert(mockMatter, { onConflict: "matter_id" });

      if (matterError) {
        throw new Error("Error creating test matter: " + matterError.message);
      }

      const mockTask = {
        task_id: crypto.randomUUID(),
        name: "Prepare Deposition",
        description: "Prepare deposition for witness",
        status: "in-progress",
        priority: "high",
        matter_id: mockMatterId,
        due_date: "2023-09-01T00:00:00.000Z",
      };

      // INSERT
      const { data: inserted, error: insertError } = await supabase
        .from(table || defaultTable)
        .insert(mockTask)
        .select("*");
      if (insertError)
        throw new Error("Insert Test Error: " + insertError.message);

      const insertedId = inserted[0].task_id;
      affectedIds.push(insertedId);

      // GET_ONE
      const { error: selectOneError } = await supabase
        .from(table || defaultTable)
        .select("*")
        .eq("task_id", insertedId)
        .single();
      if (selectOneError)
        throw new Error("Select Test Error: " + selectOneError.message);

      // GET_TASKS_BY_MATTER
      const { error: selectByMatterError } = await supabase
        .from(table || defaultTable)
        .select("*")
        .eq("matter_id", mockMatter.matter_id);
      if (selectByMatterError)
        throw new Error(
          "Select By Matter Test Error: " + selectByMatterError.message
        );

      // UPDATE_ONE
      const { error: updateError } = await supabase
        .from(table || defaultTable)
        .update({
          name: "Updated Task Name",
          description: "Updated Task Description",
          status: "completed",
          priority: "low",
        })
        .eq("task_id", insertedId);
      if (updateError)
        throw new Error("Update Test Error: " + updateError.message);

      // DELETE_ONE
      const { error: deleteError } = await supabase
        .from(table || defaultTable)
        .delete()
        .eq("task_id", insertedId);
      if (deleteError)
        throw new Error("Delete Test Error: " + deleteError.message);

      // CLEANUP
      await cleanupTestCases(affectedIds, table || defaultTable);

      // Clean up the test matter
      await cleanupTestMatter(mockMatter.matter_id);

      return new Response(
        JSON.stringify({
          status: 200,
          message: "All test cases executed and cleaned up successfully.",
          details: {
            matter_id: mockMatter.matter_id,
            task_id: insertedId,
          },
        }),
        { headers: { "Content-Type": "application/json" }, status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ status: 400, error: "Invalid action provided" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  } catch (error: any) {
    console.error("General Error:", error);
    return new Response(JSON.stringify({ status: 500, error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
