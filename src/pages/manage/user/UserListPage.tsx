import { AdvancedFilter } from "@/components/AdvancedFilter";
import { ColumnVisibilitySelect } from "@/components/ColumnVisibilitySelect";
import { DataTable } from "@/components/DataTable";
import DeleteConfirmDialog from "@/components/DeleteConfirm";
import DensitySelect from "@/components/DensitySelect";
import { MultiSortSelect, type SortRule } from "@/components/MultiSort";
import { PageTitle } from "@/components/PageTitle";
import { PaginationBar } from "@/components/PaginationBar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useGetAllUser } from "@/gen/endpoints/user/user";
import type { UserResponseDTO } from "@/gen/models";
import { useDataTable } from "@/hooks/useDataTable";
import {
  createActionColumn,
  createColumnsFromType,
  createSelectionColumn,
} from "@/utils/createColumn";
import { useNavigate } from "@tanstack/react-router";
import { FileDown, Filter, RefreshCcw } from "lucide-react";
import { useState } from "react";

export const UserListPage = () => {
  const keys: (keyof UserResponseDTO)[] = [
    "id",
    "username",
    "email",
    "roleName",
    "status",
    "createdAt",
    "updatedAt",
  ];
  const navigate = useNavigate();
  const schemaColumns = createColumnsFromType<UserResponseDTO>(keys, []);
  const columns = [
    createSelectionColumn<UserResponseDTO>(),
    ...schemaColumns,
    createActionColumn<UserResponseDTO>({
      onEdit: (row) => navigate({ to: `/manage/user/update/${row.id}` }),
      onCopy: (row) => navigator.clipboard.writeText(JSON.stringify(row)),
      onDelete: (row) => setDeleteDialog({ open: true, id: row.id }),
    }),
  ];
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [openMultiSort, setOpenMultiSort] = useState<boolean>(false);
  const [sorts, setSorts] = useState<SortRule[]>([]);
  const [pagination, setPagination] = useState<{
    page: number;
    size: number;
  }>({ page: 0, size: 10 });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id?: number;
    loading?: boolean;
  }>({ open: false });
  const userList = useGetAllUser({
    size: pagination.size,
    page: pagination.page,
    sort: sorts.map((s) => `${s.key},${s.direction}`),
    filter: "",
  });
  const { table, density, setDensity } = useDataTable<UserResponseDTO>({
    columns,
    data: userList.data?.data?.content || [],
  });
  return (
    <>
      {/* secondary ui */}
      <DeleteConfirmDialog
        onConfirm={() => {
          console.log("Deleting user with ID:", deleteDialog.id);
        }}
        open={deleteDialog.open}
        onOpenChange={(val) => setDeleteDialog({ ...deleteDialog, open: val })}
      />
      <AdvancedFilter
        fields={[
          {
            key: "id",
            label: "User ID",
            type: "number",
            placeholder: "Enter user ID",
            description: "Filter by user ID",
          },
          {
            key: "username",
            label: "Username",
            type: "text",
            placeholder: "Enter username",
            description: "Filter by username",
          },
          {
            key: "email",
            label: "Email",
            type: "text",
            placeholder: "Enter email",
            description: "Filter by email",
          },
          {
            key: "createdAt",
            label: "Created At",
            type: "date",
            placeholder: "Select date",
            description: "Filter by creation date",
          },
        ]}
        onApply={(v) => {
          console.log(v);
          setOpenFilter(false);
        }}
        open={openFilter}
        onOpenChange={() => setOpenFilter(!openFilter)}
      />
      {/* main ui */}
      <PageTitle
        name="Users Management"
        breadcrumbList={[
          { name: "Home", href: "/" },
          { name: "Users", href: "/manage/user" },
        ]}
      />
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <Button
          className="relative overflow-hidden group bg-blue-500 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 h-10 cursor-pointer"
          onClick={() => navigate({ to: "/manage/user/create" })}
        >
          <span className="absolute right-0 w-8 h-32 -mt-12 bg-white opacity-10 rotate-12 translate-x-12 transition-all duration-1000 ease group-hover:-translate-x-40"></span>
          <span className="relative font-semibold">Add user</span>
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 w-full">
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 flex-1">
          <SearchBar
            onSearch={() => {}}
            className="h-10 flex-1 min-w-[150px] md:min-w-[200px]"
          />
          <Button
            variant="outlinePrimary"
            size="lg"
            className="sm:flex-none min-w-[80px]"
            onClick={() => setOpenFilter(true)}
          >
            <Filter className="size-5 mr-1" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <MultiSortSelect
            open={openMultiSort}
            onOpenChange={setOpenMultiSort}
            options={schemaColumns.map((col) => ({
              key: col.id as string,
              label: col.id as string,
            }))}
            value={sorts}
            onChange={setSorts}
          />
          <Button
            variant="outlinePrimary"
            size="lg"
            className="sm:flex-none min-w-[50px]"
            onClick={() => userList.refetch()}
          >
            <RefreshCcw className="size-5" />
          </Button>
        </div>
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-end gap-2 flex-1">
          <Button
            variant="outlineSecondary"
            size="lg"
            className="flex-1 sm:flex-none min-w-[100px]"
          >
            <FileDown className="size-5 mr-1" />
            <span className="hidden sm:inline">Export</span>
          </Button>
          <ColumnVisibilitySelect
            table={table}
            className="flex-1 sm:flex-none min-w-[120px]"
          />
          <DensitySelect
            density={density}
            setDensity={setDensity}
            className="flex-1 sm:flex-none min-w-[120px]"
          />
        </div>
      </div>
      <DataTable name="User Management" table={table} density={density} />
      <PaginationBar
        className="mt-2"
        currentPage={pagination.page}
        totalPages={userList.data?.data?.totalPages || 0}
        onPageChange={(page) => setPagination({ ...pagination, page })}
        size={pagination.size}
        onSizeChange={(size) => setPagination({ page: 0, size })}
        totalElements={userList.data?.data?.totalElements || 0}
        numberOfElements={userList.data?.data?.numberOfElements || 0}
      />
    </>
  );
};
