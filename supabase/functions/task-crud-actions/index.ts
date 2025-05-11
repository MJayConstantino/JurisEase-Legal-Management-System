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

console.log("Hello from task-table-api-tests!");

Deno.serve(async (req) => {
  const { action, data, task_id, table, matter_id } = await req.json().catch(() => ({}));
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
      if (!matter_id) {
        return new Response(
          JSON.stringify({
            status: 400,
            error: "Missing or invalid matter_id",
          }),
          { headers: { "Content-Type": "application/json" }, status: 400 }
        );
      }
      const { data: tasks, error } = await supabase
        .from(table || defaultTable)
        .select("*")
        .eq("matter_id", matter_id);
      if (error || !tasks || tasks.length === 0) {
        return new Response(
          JSON.stringify({ status: 404, error: "Tasks not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }
      return new Response(JSON.stringify({ status: 200, data: tasks }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // POST || CREATE
    if (action === "POST") {
      const { data: inserted, error } = await supabase
        .from(table || defaultTable)
        .insert(data)
        .select("*");
      if (error) throw new Error("Internal Server Error: " + error.message);

      return new Response(JSON.stringify({ status: 201, data: inserted }), {
        headers: { "Content-Type": "application/json" },
        status: 201,
      });
    }

    // PUT || UPDATE
    if (action === "UPDATE_ONE") {
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
      return new Response(JSON.stringify({ status: 200, data: updated }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // DELETE
    if (action === "DELETE_ONE") {
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
      return new Response(JSON.stringify({ status: 200, data: deleted }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    if (action === "RUN_TESTS") {
      const affectedIds: string[] = [];
      const mockMatter = {
      matter_id: "12345678-abcd-4efg-hijk-9876543210lm",
      name: "Corporate Merger Case",
      client: "John Smith",
      status: "in-progress",
      created_at: "2025-02-01T00:00:00.000Z",
      date_opened: "2025-02-02T00:00:00.000Z",
      description: "Legal case for a corporate merger.",
      case_number: "CM-2025-001"
      };

      const mockTask = {
      task_id: "24ebc6ee-c5e8-45d5-a8b1-02a9e2271be1",
      name: "Draft Contract",
      description: "Draft a contract for the client",
      status: "pending",
      priority: "medium",
      matter_id: mockMatter.matter_id,
      due_date: "2023-10-15T00:00:00.000Z"
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
      return new Response(
      "All test cases executed and cleaned up successfully."
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
