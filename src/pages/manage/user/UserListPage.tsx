import { DataTable } from "@/components/DataTable";
import DensitySelect from "@/components/DensitySelect";
import { useDataTable } from "@/hooks/useDataTable";
import { UserResponseSchema, type UserResponseType } from "@/types/user";
import {
  createColumnsFromSchema,
  createSelectionColumn,
} from "@/utils/createColumn";

export const UserListPage = () => {
  const schemaColumns = createColumnsFromSchema(UserResponseSchema, []);
  const columns = [createSelectionColumn<UserResponseType>(), ...schemaColumns];
  const { table, density, setDensity } = useDataTable<UserResponseType>({
    columns,
    data: [],
  });
  return (
    <div>
      <DensitySelect density={density} setDensity={setDensity} />
      <DataTable name="User Management" table={table} />
    </div>
  );
};
