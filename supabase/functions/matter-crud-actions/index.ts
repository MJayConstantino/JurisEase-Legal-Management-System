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
      .in("matter_id", affectedIds);
    if (error) throw error;
    console.log(`Successfully cleaned up rows in table: ${table}`);
  } catch (error: any) {
    console.error(`Error cleaning up rows in table: ${table}`, error.message);
  }
}

console.log("Hello from matter-table-api-tests!");

Deno.serve(async (req) => {
  const { action, data, matter_id, table } = await req.json().catch(() => ({}));
  const defaultTable = "matters";

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
      if (!matter_id || !Array.isArray(matter_id)) {
        return new Response(
          JSON.stringify({
            status: 400,
            error: "Invalid or missing matter_id array",
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
      await cleanupTestCases(matter_id, table);
      return new Response(
        JSON.stringify({
          status: 200,
          message: "Cleanup completed successfully",
        }),
        { headers: { "Content-Type": "application/json" }, status: 200 }
      );
    }

    // GET_ALL
    if (action === "GET_ALL") {
      const { data: rows, error } = await supabase
        .from(defaultTable)
        .select("*");
      if (error) throw new Error("Internal Server Error: " + error.message);
      if (!rows.length) {
        return new Response(
          JSON.stringify({ status: 404, error: "No records found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }
      return new Response(JSON.stringify({ status: 200, data: rows }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // GET_ONE
    if (action === "GET_ONE") {
      const { data: row, error } = await supabase
        .from(defaultTable)
        .select("*")
        .eq("matter_id", matter_id)
        .single();
      if (error || !row) {
        return new Response(
          JSON.stringify({ status: 404, error: "Record not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }
      return new Response(JSON.stringify({ status: 200, data: row }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    // POST (Create)
    if (action === "POST") {
      const { data: inserted, error } = await supabase
        .from(defaultTable)
        .insert(data)
        .select("matter_id");
      if (error) throw new Error("Internal Server Error: " + error.message);

      return new Response(JSON.stringify({ status: 201, data: inserted }), {
        headers: { "Content-Type": "application/json" },
        status: 201,
      });
    }

    // UPDATE_ONE
    if (action === "UPDATE_ONE") {
      const { data: updated, error } = await supabase
        .from(defaultTable)
        .update(data)
        .eq("matter_id", matter_id)
        .select("*");

      if (error) {
        throw new Error("Internal Server Error: " + error.message);
      }

      if (!updated || updated.length === 0) {
        return new Response(
          JSON.stringify({
            status: 404,
            error: "Record not found or no changes made",
          }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }

      return new Response(JSON.stringify({ status: 200, data: updated }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // DELETE_ONE
    if (action === "DELETE_ONE") {
      const { data: deleted, error } = await supabase
        .from(defaultTable)
        .delete()
        .eq("matter_id", matter_id)
        .select("*");
      if (error) throw new Error("Internal Server Error: " + error.message);
      if (!deleted || deleted.length === 0) {
        return new Response(
          JSON.stringify({ status: 404, error: "Record not found" }),
          { headers: { "Content-Type": "application/json" }, status: 404 }
        );
      }
      return new Response(JSON.stringify({ status: 200, data: deleted }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // RUN_TESTS (special action for Postman/Newman)
    if (action === "RUN_TESTS") {
      const affectedIds: string[] = [];
      const mockMatter = {
        matter_id: "11111111-1111-1111-1111-111111111111",
        name: "Smith vs. Johnson",
        client: "John Smith",
        status: "open",
        created_at: "2023-01-01T00:00:00.000Z",
        date_opened: "2023-01-02T00:00:00.000Z",
        description: "A civil dispute regarding contract terms.",
        case_number: "A11111",
      };
      // Insert
      const { data: inserted, error: insertError } = await supabase
        .from(defaultTable)
        .insert(mockMatter)
        .select("matter_id");
      if (insertError)
        throw new Error("Insert Test Error: " + insertError.message);

      const insertedId = inserted[0].matter_id;
      affectedIds.push(insertedId);

      // GET_ONE
      const { error: selectOneError } = await supabase
        .from(defaultTable)
        .select("*")
        .eq("matter_id", insertedId)
        .single();
      if (selectOneError)
        throw new Error("GET_ONE Test Error: " + selectOneError.message);

      // UPDATE_ONE
      const { error: updateError } = await supabase
        .from(defaultTable)
        .update({
          name: "Updated Test Matter",
          client: "Updated Client",
        })
        .eq("matter_id", insertedId);
      if (updateError)
        throw new Error("UPDATE_ONE Test Error: " + updateError.message);

      // DELETE_ONE
      const { error: deleteError } = await supabase
        .from(defaultTable)
        .delete()
        .eq("matter_id", insertedId);
      if (deleteError)
        throw new Error("DELETE_ONE Test Error: " + deleteError.message);

      // Cleanup
      await cleanupTestCases(affectedIds, defaultTable);

      return new Response(
        "All test cases executed and cleaned up successfully."
      );
    }

    // Invalid action
    return new Response(
      JSON.stringify({ status: 400, error: "Invalid action provided" }),
      { headers: { "Content-Type": "application/json" }, status: 400 }
    );
  } catch (error: any) {
    console.error("General Error:", error);
    return new Response(JSON.stringify({ status: 500, error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
