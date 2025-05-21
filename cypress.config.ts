import { createClient } from "@supabase/supabase-js";
import { defineConfig } from "cypress";
import dotenv from "dotenv";
dotenv.config();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: true, autoRefreshToken: true } }
);

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3007",
    setupNodeEvents(on, config) {
      // Cypress task to run Supabase RPC function
      on("task", {
        confirmUserEmail: async (email) => {
          const { data, error } = await supabase.rpc("confirm_user_email", {
            user_email: email,
          });
          if (error)
            throw new Error(`Failed to confirm email: ${error.message}`);
          return data;
        },
        deleteUser: async (email) => {
          const { data, error } = await supabase.rpc("delete_user", {
            user_email: email,
          });
          if (error) throw new Error(`Failed to delete user: ${error.message}`);
          return data;
        },
        register: async ({ name, email, password }) => {
          const supabaseStorageCDN =
            "https://ysvesegmxbtcjgivpwkl.supabase.co/storage/v1/object/public/users/";
          const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                full_name: name,
                avatar_url: supabaseStorageCDN + "anon/base_profile.jpg",
              },
            },
          });
          if (error) {
            throw new Error(error.message);
          }
          return data;
        },

        login: async ({ email, password }) => {
          const { data: user, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });

          if (error) {
            throw new Error(`Failed to login supabase: ${error.message}`);
          }
          return user.session;
        },
        resetLoginAttempts: async (email) => {
          const { error } = await supabase.rpc("reset_failed_attempts", {
            user_email: email,
          });
          if (error) {
            throw new Error("Failed to reset login attempts");
          }
          return null;
        },
        deleteMatter: async (matterName: string) => {
          try {
            // First check if matter exists
            const { data: matter, error: findError } = await supabase
              .from("matters")
              .select("matter_id")
              .eq("name", matterName)
              .single();

            if (findError || !matter) {
              console.log(`Matter ${matterName} not found or already deleted`);
              return null;
            }

            // Only delete if matter exists
            const { error: deleteError } = await supabase
              .from("matters")
              .delete()
              .eq("matter_id", matter.matter_id);

            if (deleteError) {
              console.log(`Error deleting matter ${matterName}:`, deleteError);
              return null;
            }

            console.log(`Successfully deleted matter: ${matterName}`);
            return null;
          } catch (error) {
            console.error(
              `Unexpected error handling matter ${matterName}:`,
              error
            );
            return null;
          }
        },
        initializeSearchTests: async (userName: string) => {
          //momck data
          const { data: userid, error: userError } = await supabase
            .from("users")
            .select("user_id")
            .eq("user_name", userName)
            .single();

          if (userError || !userid.user_id) {
            throw new Error("Failed to get user with username");
          }

          const mockMatter = {
            name: "testMatter (Global Search E2E)",
            client: "testMatterClient",
            case_number: "testCaseNumber",
            status: "pending",
            description: "testDescription",
            created_at: new Date(),
            date_opened: new Date(),
            assigned_attorney: userid.user_id,
            opposing_council: { name: "testOpposingCouncil" },
            court: {
              name: "testCourt",
              email: "testemail@gmail.com",
              phone: "09187944400",
            },
          };

          const mockTaskWithoutMatter = {
            name: "Mock Task (No Matter) (Global Search E2E)",
            description: "Standalone task",
            due_date: undefined,
            priority: "low",
            status: "in-progress",
            created_at: new Date(),
          };

          const { data: matterData, error: matterError } = await supabase
            .from("matters")
            .insert([mockMatter])
            .select();

          if (matterError)
            throw new Error("Matter creation failed: " + matterError.message);
          const matterId = matterData[0].matter_id;

          const { data: taskWithoutMatter, error: taskError1 } = await supabase
            .from("tasks")
            .insert([mockTaskWithoutMatter])
            .select();

          if (taskError1)
            throw new Error("Task creation failed: " + taskError1.message);

          const mockTaskWithMatter = {
            name: "Mock Task (With Matter) (Global Search E2E)",
            description: "Task tied to initialized Matter",
            due_date: new Date(),
            priority: "medium",
            status: "completed",
            matter_id: matterId,
            created_at: new Date(),
          };

          const { data: taskWithMatter, error: taskError2 } = await supabase
            .from("tasks")
            .insert([mockTaskWithMatter])
            .select();

          if (taskError2)
            throw new Error("Task creation failed: " + taskError2.message);

          const mockBill = {
            matter_id: matterId,
            name: "MockBill (Global Search E2E)",
            amount: 100,
            created_at: new Date().toISOString(),
            status: "paid",
            remarks: "",
          };

          const { data: billData, error: billError } = await supabase
            .from("billings")
            .insert([mockBill])
            .select();

          if (billError)
            throw new Error("Bill creation failed: " + billError.message);

          return { message: "initialized succesfully!" };
        },
        deleteSearchTests: async (matterName: string) => {
          const { error: mattersDeleteError } = await supabase
            .from("matters")
            .delete()
            .eq("name", matterName);

          const { error: taskDeleteError } = await supabase
            .from("tasks")
            .delete()
            .eq("name", "Mock Task (No Matter) (Global Search E2E)");

          if (mattersDeleteError || taskDeleteError) {
            throw new Error("Failed to clean up records");
          }

          return { message: "Clean up success" };
        },
      });

      return config;
    },
  },
});
