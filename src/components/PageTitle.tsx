import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
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
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={item.href}>
                <BreadcrumbPage className="text-zinc-600 font-semibold text-xl">
                  {item.name}
                </BreadcrumbPage>
              </BreadcrumbLink>
              {index < breadcrumbList.length - 1 && (
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
