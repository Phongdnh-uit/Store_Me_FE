import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface PageTitleProps {
    name: string;
    breadcrumbList: { name: string; href: string }[];
}

export const PageTitle = ({ name, breadcrumbList }: PageTitleProps) => {
    return (
        <div className="mb-8">
            <h1 className="text-4xl font-semibold text-zinc-800">{name}</h1>
            <Breadcrumb className="mt-2">
                <BreadcrumbList>
                    {breadcrumbList.map((item, index) => (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={item.href}
                                    className="text-zinc-600 font-semibold text-xl"
                                >
                                    {item.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < breadcrumbList.length - 1 && (
                                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                            )}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};
