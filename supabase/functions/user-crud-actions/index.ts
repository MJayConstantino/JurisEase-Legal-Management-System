import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supUrl = Deno.env.get("_SUPABASE_URL") as string;
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY") as string;
const supabase = createClient(supUrl, supKey);

// Dedicated Cleanup Function
async function cleanupTestCases(affectedIds: string[], table: string) {
  try {
    const { error } = await supabase.from(table).delete().in(
      "user_id",
      affectedIds,
    );
    if (error) throw error;
    console.log(`Successfully cleaned up rows in table: ${table}`);
  } catch (error: any) {
    console.error(`Error cleaning up rows in table: ${table}`, error.message);
  }
}

console.log("Hello from user-table-api-tests!");

Deno.serve(async (req) => {
  const { action, data, user_id, table } = await req.json();

  const defaultTable = "users"; // Default table

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
    // CLEAN_UP action
    if (action === "CLEAN_UP") {
      console.log("Running cleanup action...");

      if (!user_id || !Array.isArray(user_id)) {
        return new Response(
          JSON.stringify({
            status: 400,
            error: "Invalid or missing user_id array",
          }),
          { headers: { "Content-Type": "application/json" }, status: 400 },
        );
      }
      if (!table) {
        return new Response(
          JSON.stringify({ status: 400, error: "Missing table name" }),
          { headers: { "Content-Type": "application/json" }, status: 400 },
        );
      }

      await cleanupTestCases(user_id, table);

      return new Response(
        JSON.stringify({
          status: 200,
          message: "Cleanup completed successfully",
        }),
        { headers: { "Content-Type": "application/json" }, status: 200 },
      );
    }

    // GET_ALL action
    if (action === "GET_ALL") {
      const { data: rows, error } = await supabase.from(defaultTable).select(
        "*",
      );
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
    }

    // GET_ONE action
    if (action === "GET_ONE") {
      const { data: row, error } = await supabase.from(defaultTable).select("*")
        .eq("user_id", user_id).single();
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
    }

    // POST action
    if (action === "POST") {
      console.log("POST REQUEST");
      const { data: inserted, error } = await supabase.from(defaultTable)
        .insert(data)
        .select("user_id");
      if (error) throw new Error("Internal Server Error: " + error.message);

      return new Response(
        JSON.stringify({ status: 201, data: inserted }),
        { headers: { "Content-Type": "application/json" }, status: 201 },
      );
    }

    // UPDATED UPDATE_ONE action
    if (action === "UPDATE_ONE") {
      console.log("UPDATE_ONE Request Data:", { user_id, data });

      const { data: updated, error } = await supabase
        .from(defaultTable)
        .update(data)
        .eq("user_id", user_id)
        .select("*");

      if (error) {
        console.error("Supabase Error:", error.message);
        throw new Error("Internal Server Error: " + error.message);
      }

      if (!updated || updated.length === 0) {
        console.log("No matching record found for user_id:", user_id);
        return new Response(
          JSON.stringify({
            status: 404,
            error: "Record not found or no changes made",
          }),
          { headers: { "Content-Type": "application/json" }, status: 404 },
        );
      }

      console.log("UPDATE_ONE Success:", updated);
      return new Response(
        JSON.stringify({ status: 200, data: updated }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // DELETE_ONE action
    if (action === "DELETE_ONE") {
      const { data: deleted, error } = await supabase.from(defaultTable)
        .delete()
        .eq("user_id", user_id).select("*");
      if (error) throw new Error("Internal Server Error: " + error.message);
      if (!deleted || deleted.length === 0) {
        return new Response(
          JSON.stringify({ status: 404, error: "Record not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 },
        );
      }
      return new Response(
        JSON.stringify({ status: 200, data: deleted }),
        { headers: { "Content-Type": "application/json" } },
      );
    }

    // RUN_TESTS action
    if (action === "RUN_TESTS") {
      console.log("Running test cases...");

      const affectedIds: string[] = [];
      const { data: inserted, error: insertError } = await supabase.from(
        defaultTable,
      )
        .insert({
          user_id: "05fa6493-a26b-42eb-a935-e4909e2a2653",
          user_name: "Test User",
          user_email: "test@example.com",
        }).select("user_id");
      if (insertError) {
        throw new Error("Insert Test Error: " + insertError.message);
      }

      const insertedId = inserted[0].user_id;
      affectedIds.push(insertedId);

      // Test GET_ONE
      const { error: selectOneError } = await supabase.from(defaultTable)
        .select("*")
        .eq("user_id", insertedId).single();
      if (selectOneError) {
        throw new Error("GET_ONE Test Error: " + selectOneError.message);
      }

      // Test UPDATE_ONE
      const { error: updateError } = await supabase.from(defaultTable).update({
        user_name: "Updated Test User",
        user_email: "updated@example.com",
      }).eq("user_id", insertedId);
      if (updateError) {
        throw new Error("UPDATE_ONE Test Error: " + updateError.message);
      }

      // Test DELETE_ONE
      const { error: deleteError } = await supabase.from(defaultTable).delete()
        .eq("user_id", insertedId);
      if (deleteError) {
        throw new Error("DELETE_ONE Test Error: " + deleteError.message);
      }

      // Cleanup affected rows
      await cleanupTestCases(affectedIds, defaultTable);

      return new Response(
        "All test cases executed and cleaned up successfully.",
      );
    }

    // Invalid action
    return new Response(
      JSON.stringify({ status: 400, error: "Invalid action provided" }),
      { headers: { "Content-Type": "application/json" }, status: 400 },
    );
  } catch (error: any) {
    console.error("General Error:", error);
    return new Response(
      JSON.stringify({ status: 500, error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 },
    );
  }
});
