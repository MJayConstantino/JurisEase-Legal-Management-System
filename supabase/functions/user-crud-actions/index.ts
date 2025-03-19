import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supUrl = Deno.env.get("_SUPABASE_URL") as string;
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY") as string;
const supabase = createClient(supUrl, supKey);

// Cleanup function
async function cleanupTestCases(
  affectedIds: string[],
  table: string = "users",
) {
  try {
    const { error } = await supabase.from(table).delete().in(
      "user_id",
      affectedIds,
    );
    if (error) throw error;
    console.log("Test cases cleaned up successfully.");
  } catch (error: any) {
    console.error("Error cleaning up test cases:", error.message);
  }
}

console.log("Hello from user-table-api-tests!");

Deno.serve(async (req) => {
  const { action, data, user_id } = await req.json();
  const table = "users";
  const affectedIds: string[] = []; // For cleanup

  // Verify Authorization Header
  const authHeader = req.headers.get("Authorization");
  if (
    !authHeader || authHeader !== `Bearer ${Deno.env.get("_USER_CRUD_TOKEN")}`
  ) {
    return new Response(
      JSON.stringify({
        code: 401,
        message: "Missing or invalid authorization header",
      }),
      { headers: { "Content-Type": "application/json" }, status: 401 },
    );
  }

  try {
    if (action === "GET_ALL") {
      // GET all records
      const { data: rows, error } = await supabase.from(table).select("*");
      if (error) throw new Error("Internal Server Error: " + error.message);
      if (!rows.length) {
        return new Response(
          JSON.stringify({ status: 404, error: "No records found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 },
        );
      }
      return new Response(
        JSON.stringify({ status: 200, data: rows }),
        { headers: { "Content-Type": "application/json" }, status: 200 },
      );
    } else if (action === "GET_ONE") {
      // GET a specific record by ID
      const { data: row, error } = await supabase.from(table).select("*").eq(
        "user_id",
        user_id,
      ).single();
      if (error || !row) {
        return new Response(
          JSON.stringify({ status: 404, error: "Record not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 },
        );
      }
      return new Response(
        JSON.stringify({ status: 200, data: row }),
        { headers: { "Content-Type": "application/json" }, status: 200 },
      );
    } else if (action === "POST") {
      // INSERT a new record
      const { data: inserted, error } = await supabase.from(table).insert(data)
        .select("user_id");
      if (error) throw new Error("Internal Server Error: " + error.message);
      affectedIds.push(...inserted.map((row: any) => row.user_id));
      return new Response(
        JSON.stringify({ status: 201, data: inserted }),
        { headers: { "Content-Type": "application/json" }, status: 201 },
      );
    } else if (action === "UPDATE_ONE") {
      // UPDATE a specific record
      const { data: updated, error } = await supabase.from(table).update(data)
        .eq("user_id", user_id).select("*");
      if (error) throw new Error("Internal Server Error: " + error.message);
      if (!updated || updated.length === 0) {
        return new Response(
          JSON.stringify({
            status: 404,
            error: "Record not found or no changes made",
          }),
          { headers: { "Content-Type": "application/json" }, status: 404 },
        );
      }
      affectedIds.push(user_id); // Track updated user_id
      return new Response(
        JSON.stringify({ status: 200, data: updated }),
        { headers: { "Content-Type": "application/json" } },
      );
    } else if (action === "DELETE_ONE") {
      // DELETE a specific record
      const { data: deleted, error } = await supabase.from(table).delete().eq(
        "user_id",
        user_id,
      ).select("*");
      if (error) throw new Error("Internal Server Error: " + error.message);
      if (!deleted || deleted.length === 0) {
        return new Response(
          JSON.stringify({ status: 404, error: "Record not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 },
        );
      }
      affectedIds.push(user_id); // Track deleted user_id
      return new Response(
        JSON.stringify({ status: 200, data: deleted }),
        { headers: { "Content-Type": "application/json" } },
      );
    } else if (action === "RUN_TESTS") {
      // RUN automated test cases
      console.log("Running test cases...");

      // Insert test case
      const { data: inserted, error: insertError } = await supabase.from(table)
        .insert({
          user_id: "test-id-1e9c14776-0c63-4a74-bd76-1ee41b8eadcb",
          user_name: "Test User",
          user_email: "test@example.com",
        }).select("user_id");
      if (insertError) {
        throw new Error("Insert Test Error: " + insertError.message);
      }
      const insertedId = inserted[0].user_id; // Capture inserted user_id
      affectedIds.push(insertedId);

      // Test GET_ONE
      const { error: selectOneError } = await supabase.from(table).select("*")
        .eq("user_id", insertedId).single();
      if (selectOneError) {
        throw new Error("GET_ONE Test Error: " + selectOneError.message);
      }

      // Test UPDATE_ONE
      const { error: updateError } = await supabase.from(table).update({
        user_name: "Updated Test User",
        user_email: "updated@example.com",
      }).eq("user_id", insertedId);
      if (updateError) {
        throw new Error("UPDATE_ONE Test Error: " + updateError.message);
      }

      // Test DELETE_ONE
      const { error: deleteError } = await supabase.from(table).delete().eq(
        "user_id",
        insertedId,
      );
      if (deleteError) {
        throw new Error("DELETE_ONE Test Error: " + deleteError.message);
      }

      // Clean up affected rows
      await cleanupTestCases(affectedIds, table);

      return new Response(
        "All test cases executed and cleaned up successfully.",
      );
    } else {
      // Invalid action
      return new Response(
        JSON.stringify({ status: 400, error: "Invalid action provided" }),
        { headers: { "Content-Type": "application/json" }, status: 400 },
      );
    }
  } catch (error: any) {
    // General error handling
    return new Response(
      JSON.stringify({ status: 500, error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 },
    );
  }
});
