// Import dependencies and set up environment variables
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const supUrl = Deno.env.get("_SUPABASE_URL") as string;
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY") as string;
const supabase = createClient(supUrl, supKey);

// Cleanup function to delete test cases specifically inserted, updated, or deleted
// async function cleanupTestCases(
//   affectedIds: string[],
//   table: string = "users",
// ) {
//   try {
//     const { error } = await supabase.from(table).delete().in(
//       "user_id",
//       affectedIds,
//     );
//     if (error) throw error;
//     console.log("Test cases cleaned up successfully.");
//   } catch (error: any) {
//     console.error("Error cleaning up test cases:", error.message);
//   }
// }

console.log("Hello from Functions!");

Deno.serve(async (req) => {
  const { action, data } = await req.json();
  const table = "users";
  const affectedIds: string[] = []; // Keep track of user_ids affected by tests

  try {
    if (action === "SELECT") {
      // SELECT operation
      const { data: rows, error } = await supabase.from(table).select("*");
      if (error) throw error;
      return new Response(
        JSON.stringify({ rows }),
        { headers: { "Content-Type": "application/json" } },
      );
      // } else if (action === "INSERT") {
      //   // INSERT operation
      //   const { data: inserted, error } = await supabase.from(table).insert(data)
      //     .select("user_id");
      //   if (error) throw error;
      //   affectedIds.push(...inserted.map((row: any) => row.user_id)); // Track inserted user_ids
      //   return new Response(
      //     JSON.stringify({ inserted }),
      //     { headers: { "Content-Type": "application/json" } },
      //   );
      // } else if (action === "UPDATE") {
      //   // UPDATE operation
      //   const { data: updated, error } = await supabase.from(table).update(data)
      //     .eq("user_id", data.user_id).select("user_id");
      //   if (error) throw error;
      //   affectedIds.push(data.user_id); // Track updated user_id
      //   return new Response(
      //     JSON.stringify({ updated }),
      //     { headers: { "Content-Type": "application/json" } },
      //   );
      // } else if (action === "DELETE") {
      //   // DELETE operation
      //   const { data: deleted, error } = await supabase.from(table).delete().eq(
      //     "user_id",
      //     data.user_id,
      //   ).select("user_id");
      //   if (error) throw error;
      //   affectedIds.push(data.user_id); // Track deleted user_id
      //   return new Response(
      //     JSON.stringify({ deleted }),
      //     { headers: { "Content-Type": "application/json" } },
      //   );
      // } else if (action === "RUN_TESTS") {
      //   console.log("Running test cases...");

      //   // Insert test case
      //   const { data: inserted, error: insertError } = await supabase
      //     .from(table)
      //     .insert({
      //       user_id: "test-id-1",
      //       user_name: "Test User",
      //       user_email: "test@example.com",
      //     })
      //     .select("user_id");
      //   if (insertError) throw insertError;
      //   const insertedId = inserted[0].user_id; // Capture inserted user_id
      //   affectedIds.push(insertedId);

      //   // Test successful SELECT (GET) request
      //   const { data: selected, error: selectError } = await supabase.from(table)
      //     .select("*");
      //   if (selectError) throw selectError;
      //   console.log("Successful SELECT response:", selected);

      //   // Update test case
      //   const { error: updateError } = await supabase
      //     .from(table)
      //     .update({
      //       user_name: "Updated Test User",
      //       user_email: "updated@example.com",
      //     })
      //     .eq("user_id", insertedId);
      //   if (updateError) throw updateError;

      //   // Delete test case
      //   const { error: deleteError } = await supabase
      //     .from(table)
      //     .delete()
      //     .eq("user_id", insertedId);
      //   if (deleteError) throw deleteError;

      //   // Clean up affected rows
      //   await cleanupTestCases(affectedIds, table);

      //   return new Response("Test cases executed and cleaned up successfully.");
    } else {
      // Invalid action
      return new Response("Invalid action provided", { status: 400 });
    }
  } catch (error: any) {
    // Handle errors gracefully
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { "Content-Type": "application/json" }, status: 500 },
    );
  }
});
