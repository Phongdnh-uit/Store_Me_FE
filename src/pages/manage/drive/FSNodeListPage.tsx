import { AdvancedFilter } from "@/components/AdvancedFilter";
import { ColumnVisibilitySelect } from "@/components/ColumnVisibilitySelect";
import DeleteConfirmDialog from "@/components/DeleteConfirm";
import DensitySelect from "@/components/DensitySelect";
import { SeparateTable } from "@/components/SeparateTable";
import { MultiSortSelect, type SortRule } from "@/components/MultiSort";
import { PageTitle } from "@/components/PageTitle";
import { PaginationBar } from "@/components/PaginationBar";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
    useDeleteNode,
    useGetAllNodes,
} from "@/gen/endpoints/file-system/file-system";
import type { FSResponseDTO, RoleResponseDTO } from "@/gen/models";
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
import CreateFolderModal from "./component/CreateFolderModal";
import { Route } from "@/routes/_app/manage/drive/$id";

export const FSNodeListPage = () => {
    const { id } = Route.useParams();
    const keys: (keyof FSResponseDTO)[] = [
        "name",
        "type",
        "size",
        "createdAt",
        "updatedAt",
    ];
    const navigate = useNavigate();
    const schemaColumns = createColumnsFromType<FSResponseDTO>(keys, [
        {
            key: "name",
            header: "Name",
            cell: (row) => {
                const name = row.row.getValue("name") as string;
                const type = row.row.getValue("type") as string;
                if (type === "FOLDER") {
                    return (
                        <div
                            className="p-0 hover:underline cursor-pointer w-full"
                            onDoubleClick={() =>
                                navigate({
                                    to: `/manage/drive/${row.row.original.id}`,
                                })
                            }
                        >
                            {name}
                        </div>
                    );
                }
                return name;
            },
        },
        {
            key: "createdAt",
            cell: (row) => new Date(row.row.getValue("createdAt")).toLocaleString(),
        },
        {
            key: "updatedAt",
            cell: (row) => new Date(row.row.getValue("createdAt")).toLocaleString(),
        },
    ]);
    const columns = [
        createSelectionColumn<FSResponseDTO>(),
        ...schemaColumns,
        createActionColumn<RoleResponseDTO>({
            onEdit: (row) => navigate({ to: `/manage/drive/update/${row.id}` }),
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
    const list = useGetAllNodes({
        parentId: id === "root" ? undefined : Number(id),
        size: pagination.size,
        page: pagination.page - 1,
        sort: sorts.map((s) => `${s.key},${s.direction}`),
        filter: "",
    });
    const deleteMutation = useDeleteNode({
        mutation: {
            onSuccess: () => {
                toast.success("Role deleted successfully");
                list.refetch();
            },
            onError: (error) => {
                toast.error(`Error deleting role: ${error.message}`);
            },
        },
    });
    const { table, density, setDensity } = useDataTable<RoleResponseDTO>({
        columns,
        data: list.data?.data?.content || [],
    });
    return (
        <>
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
            <PageTitle
                name="Role Management"
                breadcrumbList={[
                    { name: "Home", href: "/" },
                    { name: "Role", href: "/manage/role" },
                ]}
            />
            <div className="flex justify-between items-center mb-4">
                <div></div>
                <div className="flex flex-wrap gap-2">
                    <Button variant={"outlineSecondary"}>Upload</Button>
                    <CreateFolderModal onSuccess={() => list.refetch()}/>
                </div>
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
            <SeparateTable
                columnWidths={{ select: "50px", actions: "50px", name: "3fr" }}
                table={table}
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
        </>
    );
};
