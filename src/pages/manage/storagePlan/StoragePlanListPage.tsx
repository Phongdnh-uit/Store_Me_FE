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
import {
    useDeleteStoragePlanById,
    useGetAllStoragePlan,
} from "@/gen/endpoints/storage-plan/storage-plan";
import type { StoragePlanResponseDTO } from "@/gen/models";
import { useDataTable } from "@/hooks/useDataTable";
import {
    createActionColumn,
    createColumnsFromType,
    createSelectionColumn,
} from "@/utils/createColumn";
import { useNavigate } from "@tanstack/react-router";
import { FileDown, Filter, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export const StoragePlanListPage = () => {
    const keys: (keyof StoragePlanResponseDTO)[] = [
        "id",
        "name",
        "price",
        "storageLimit",
        "createdAt",
        "updatedAt",
    ];
    const navigate = useNavigate();
    const schemaColumns = createColumnsFromType<StoragePlanResponseDTO>(keys, []);
    const columns = [
        createSelectionColumn<StoragePlanResponseDTO>(),
        ...schemaColumns,
        createActionColumn<StoragePlanResponseDTO>({
            onEdit: (row) =>
                navigate({ to: `/manage/storage-plan/update/${row.id}` }),
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
    const list = useGetAllStoragePlan({
        size: pagination.size,
        page: pagination.page - 1,
        sort: sorts.map((s) => `${s.key},${s.direction}`),
        filter: "",
    });
    const deleteMutation = useDeleteStoragePlanById({
        mutation: {
            onSuccess: () => {
                toast.success("Storage plan deleted successfully");
                list.refetch();
            },
            onError: (error) => {
                toast.error(`Error deleting storage plan: ${error.message}`);
            },
        },
    });
    const { table, density, setDensity } = useDataTable<StoragePlanResponseDTO>({
        columns,
        data: list.data?.data?.content || [],
    });
    return (
        <div className="relative min-h-screen">
            {/* secondary ui */}
            <DeleteConfirmDialog
                onConfirm={() => {
                    if (!deleteDialog.id) return;
                    deleteMutation.mutate({ id: deleteDialog.id });
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
            <main className="absolute inset-4 bg-white rounded-2xl shadow-md p-4 overflow-auto">
                <PageTitle
                    name="Storage Plan Management"
                    breadcrumbList={[
                        { name: "Home", href: "/" },
                        { name: "Storage Plan", href: "/manage/storage-plan" },
                    ]}
                />
                <div className="flex justify-between items-center mb-4">
                    <div></div>
                    <Button
                        className="relative overflow-hidden group bg-blue-500 text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:ring-2 hover:ring-offset-2 hover:ring-blue-400 transition-all ease-out duration-300 h-10 cursor-pointer"
                        onClick={() => navigate({ to: "/manage/storage-plan/create" })}
                    >
                        <span className="absolute right-0 w-8 h-32 -mt-12 bg-white opacity-10 rotate-12 translate-x-12 transition-all duration-1000 ease group-hover:-translate-x-40"></span>
                        <span className="relative font-semibold">Create plan</span>
                    </Button>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2 w-full">
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 flex-1">
                        <SearchBar
                            onSearch={() => { }}
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
                            onClick={() => list.refetch()}
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
                <DataTable
                    name="Storage Plan Management"
                    table={table}
                    density={density}
                />
                <PaginationBar
                    className="mt-2"
                    currentPage={pagination.page}
                    totalPages={list.data?.data?.totalPages || 0}
                    onPageChange={(page) => setPagination({ ...pagination, page })}
                    size={pagination.size}
                    onSizeChange={(size) => setPagination({ page: 0, size })}
                    totalElements={list.data?.data?.totalElements || 0}
                    numberOfElements={list.data?.data?.numberOfElements || 0}
                />
            </main>
        </div>
    );
};
