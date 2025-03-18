import { MattersHeader } from "./mattersHeader";
import { MattersTable } from "./mattersTable";

export function MattersList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border shadow">
      <MattersHeader />
      <MattersTable />
    </div>
  );
}
