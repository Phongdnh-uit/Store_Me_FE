import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./ui/alert-dialog";
import { motion } from "motion/react";
import { Trash2 } from "lucide-react";

export type DeleteConfirmDialogProps = {
    /** Tên thực thể hiển thị trong dialog, ví dụ: "người dùng", "sản phẩm"... */
    itemName?: string;
    /** Mô tả bổ sung (tuỳ chọn). */
    description?: string;
    /** Gọi khi người dùng xác nhận xoá. Trả về Promise nếu cần async. */
    onConfirm: () => void | Promise<void>;
    /** Trạng thái đang xử lý (để disable nút). */
    loading?: boolean;
    /** Tuỳ biến nhãn nút xác nhận. */
    confirmLabel?: string;
    /** Tuỳ biến nhãn nút huỷ. */
    cancelLabel?: string;
    /** Tuỳ biến tiêu đề. */
    title?: string;
    /** Kiểm soát mở/đóng từ bên ngoài (optional). */
    open: boolean;
    /** Sự kiện thay đổi open khi controlled. */
    onOpenChange: (open: boolean) => void;
};

export default function DeleteConfirmDialog(props: DeleteConfirmDialogProps) {
    const {
        itemName = "mục này",
        description,
        onConfirm,
        loading = false,
        confirmLabel = "Xoá",
        cancelLabel = "Huỷ",
        title = "Bạn có chắc muốn xoá?",
        open,
        onOpenChange,
    } = props;

    const handleConfirm = async () => {
        await onConfirm();
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="sm:max-w-[480px]">
                <AlertDialogHeader>
                    <div className="flex items-start gap-3">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="rounded-2xl p-2 border"
                        >
                            <Trash2 className="size-5" />
                        </motion.div>
                        <div className="space-y-1">
                            <AlertDialogTitle className="text-base sm:text-lg">
                                {title}
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                {description ?? (
                                    <>
                                        Hành động này sẽ <b>không thể hoàn tác</b>.{" "}
                                        {`Bạn sắp xoá ${itemName}.`}
                                    </>
                                )}
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>
                        {cancelLabel}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        {loading ? "Đang xoá…" : confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
