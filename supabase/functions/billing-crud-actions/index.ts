import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
const supUrl = Deno.env.get("_SUPABASE_URL");
const supKey = Deno.env.get("_SUPABASE_SERVICE_KEY");
const supabase = createClient(supUrl, supKey);
async function cleanupTestCases(affectedIds, table) {
  try {
    const { error } = await supabase.from(table).delete().in("bill_id", affectedIds);
    if (error) throw error;
    console.log(`Successfully cleaned up rows in table: ${table}`);
  } catch (error) {
    console.error(`Error cleaning up rows in table: ${table}`, error.message);
  }
}
console.log("Hello from billings-table-api-tests!");
Deno.serve(async (req)=>{
  const { action, data, bill_id, table, matter_id } = await req.json().catch(()=>({}));
  const defaultTable = "billings";

  // Authorization
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${Deno.env.get("_USER_CRUD_TOKEN")}`) {
    return new Response(JSON.stringify({code: 401, message: "Missing or invalid authorization header"}), {
      headers: {"Content-Type": "application/json"},
      status: 401
    });
  }
  try {
    // CLEAN_UP
    if (action === "CLEAN_UP") {
      if (!bill_id || !Array.isArray(bill_id)) {
        return new Response(JSON.stringify({status: 400, error: "Invalid or missing bill_id array"}), {
          headers: {"Content-Type": "application/json"},
          status: 400
        });
      }
      if (!table) {
        return new Response(JSON.stringify({status: 400, error: "Missing table name"}), {
          headers: {"Content-Type": "application/json"},
          status: 400
        });
      }
      await cleanupTestCases(bill_id, table);
      return new Response(JSON.stringify({
        status: 200,
        message: "Cleanup successful"
      }), {
        headers: {
          "Content-Type": "application/json"
        },
        status: 200
      });
    }

    // GET_ALL
    if (action === "GET_ALL") {
      const { data: bills, error } = await supabase.from(table || defaultTable).select("*");
      if (error) throw error;
      return new Response(JSON.stringify({status: 200, data: bills}), {
        headers: {"Content-Type": "application/json"},
        status: 200
      });
    }

    // GET_ONE
    if (action === "GET_ONE") {
      const { data: bill, error } = await supabase.from(table || defaultTable).select("*").eq("bill_id", bill_id).single();
      if (error || !bill) {
        return new Response(JSON.stringify({status: 404, error: "bill not found"}), {
          headers: {"Content-Type": "application/json"},
          status: 404
        });
      }
      return new Response(JSON.stringify({status: 200, data: bill}), {
        headers: {"Content-Type": "application/json"},
        status: 200
      });
    }

    // Get Bills by matter_id
    if (action === "GET_BILLS_BY_MATTER_ID") {
      if (!matter_id) {
        return new Response(JSON.stringify({status: 400, error: "Missing or invalid matter_id"}), {
          headers: {"Content-Type": "application/json"},
          status: 400
        });
      }
      const { data: bills, error } = await supabase.from(table || defaultTable).select("*").eq("matter_id", matter_id);
      if (error || !bills || bills.length === 0) {
        return new Response(JSON.stringify({status: 404, error: "Bills not found"}), {
          headers: {"Content-Type": "application/json"},
          status: 404
        });
      }
      return new Response(JSON.stringify({status: 200,data: bills}), {
        headers: {"Content-Type": "application/json"},
        status: 200
      });
    }
    
    // POST (Create Bill)
    if (action === "POST") {
      const { data: inserted, error } = await supabase
        .from(defaultTable)
        .insert(data)
        .select("*");

      if (error) throw new Error("Internal Server Error: " + error.message);

      return new Response(JSON.stringify({ status: 201, data: inserted }), {
        headers: { "Content-Type": "application/json" },
        status: 201,
      });
    }


    // UPDATE (Update Bill)
    if (action === "UPDATE_ONE") {
      const { data: updated, error } = await supabase
      .from(defaultTable)
      .update(data)
      .eq("bill_id", bill_id)
      .select("*");

      if (error) throw new Error("Internal Server Error: " + error.message);

      if (!updated || updated.length === 0) {
        return new Response(JSON.stringify({status: 404, error: "Bill not found"}), {
          headers: {"Content-Type": "application/json"},
          status: 404
        });
      }

      return new Response(JSON.stringify({
        status: 200,
        data: updated
      }), {
        headers: {
          "Content-Type": "application/json"
        },
        status: 200
      });
    }


    // DELETE
    if (action === "DELETE_ONE") {
      const { data: deleted, error } = await supabase
        .from(defaultTable)
        .delete()
        .eq("bill_id", bill_id)
        .select("*");

      if (error) throw new Error("Internal Server Error: " + error.message);

      if (!deleted || deleted.length === 0) {
        return new Response(JSON.stringify({status: 404, error: "Bill not found"}), {
          headers: {"Content-Type": "application/json"},
          status: 404
        });
      }

      return new Response(JSON.stringify({status: 200, data: deleted}), {
        headers: {"Content-Type": "application/json"},
        status: 200
      });
    }


    if (action === "RUN_TESTS") {
      const affectedIds: string[] = [];
      const mockBill = {
        bill_id: "1p32od94-2278-42af-940b-19ef8b8eg900",
        matter_id: "114t7d19-8sdi-3bhj-623j-175vg1182h23",
        name: "Court appearance – Preliminary Conference",
        amount: 12000,
        created_at: "2025-01-01T00:00:00.000Z",
        status: "active",
        remarks: "3,000/hr at 4 hrs. Down payment - 6500."
      };

      // INSERT
      const { data: inserted, error: insertError } = await supabase
        .from(defaultTable)
        .insert(mockBill)
        .select("*");

      if (insertError) throw new Error("Insert Test Error: " + insertError.message);

      const insertedId = inserted[0].bill_id;

      affectedIds.push(insertedId);


      // GET_ONE
      const { error: selectOneError } = await supabase
        .from(defaultTable) 
        .select("*")
        .eq("bill_id", insertedId)
        .single();

      if (selectOneError) throw new Error("Select Test Error: " + selectOneError.message);


      // UPDATE_ONE
      const { error: updateError } = await supabase
        .from(defaultTable)
        .update({
          name: "(Updated) Preliminary Conference",
          status: "paid",
        })
        .eq("bill_id", insertedId);

      if (updateError) throw new Error("Update Test Error: " + updateError.message);


      // DELETE_ONE
      const { error: deleteError } = await supabase
      .from(defaultTable)
      .delete()
      .eq("bill_id", insertedId);

      if (deleteError) throw new Error("Delete Test Error: " + deleteError.message);



      // CLEANUP
      await cleanupTestCases(affectedIds, defaultTable);
      return new Response("All test cases executed and cleaned up successfully.");
    }


    return new Response(JSON.stringify({
      status: 400,
      error: "Invalid action provided"
    }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 400
    });
  } catch (error) {
    console.error("General Error:", error);
    return new Response(JSON.stringify({
      status: 500,
      error: error.message
    }), {
      headers: {
        "Content-Type": "application/json"
      },
      status: 500
    });
  }
});
