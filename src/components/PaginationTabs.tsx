import { buttonVariants } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationTabsProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function PaginationTabs({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationTabsProps) {
    if (totalPages < 1) return null;

    const generatePages = () => {
        const pages: (number | "ellipsis")[] = [];
        const delta = 2;

        pages.push(1);

        if (currentPage - delta > 2) {
            pages.push("ellipsis");
        }

        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            pages.push(i);
        }

        if (currentPage + delta < totalPages - 1) {
            pages.push("ellipsis");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(currentPage - 1 < 1 ? 1 : currentPage - 1);
                        }}
                        className={cn(
                            buttonVariants({ variant: "outlinePrimary" }),
                            currentPage === 1 &&
                            "pointer-events-none border-blue-300 text-blue-300",
                        )}
                    />
                </PaginationItem>

                {pages.map((page, idx) =>
                    page === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${idx}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                href={`#${page}`}
                                isActive={page === currentPage}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onPageChange(page);
                                }}
                                className={cn({
                                    [buttonVariants({ variant: "default" }) + " bg-blue-500"]:
                                        page === currentPage,
                                    [buttonVariants({ variant: "outlinePrimary" })]:
                                        page !== currentPage,
                                    ["pointer-events-none"]: page === currentPage,
                                })}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ),
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onPageChange(
                                currentPage + 1 > totalPages ? totalPages : currentPage + 1,
                            );
                        }}
                        className={cn(
                            buttonVariants({ variant: "outlinePrimary" }),
                            currentPage === totalPages &&
                            "pointer-events-none border-blue-300 text-blue-300",
                        )}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
