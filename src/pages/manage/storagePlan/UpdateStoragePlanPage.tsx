import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    useGetStoragePlanById,
    useUpdateStoragePlanById,
} from "@/gen/endpoints/storage-plan/storage-plan";
import { createStoragePlanBody } from "@/gen/endpoints/storage-plan/storage-plan.zod";
import type { ApiResponseVoid, StoragePlanRequestDTO } from "@/gen/models";
import { Route } from "@/routes/_app/manage/storage-plan/update.$id";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const UpdateStoragePlanPage = () => {
    const navigate = useNavigate();
    const { id } = Route.useParams();
    const storagePlanData = useGetStoragePlanById(id);
    const form = useForm<StoragePlanRequestDTO>({
        defaultValues: {
            name: storagePlanData.data?.data?.name,
            price: storagePlanData.data?.data?.price,
            storageLimit: storagePlanData.data?.data?.storageLimit,
            description: storagePlanData.data?.data?.description,
            timeOfPlan: storagePlanData.data?.data?.timeOfPlan,
        },
        resolver: zodResolver(createStoragePlanBody),
    });
    const mutation = useUpdateStoragePlanById({
        mutation: {
            onSuccess: (data) => {
                toast.success("Update storage plan successfully");
                form.reset(data.data);
            },
            onError: (error) => {
                toast.error("Update storage plan failed");
                const apiError = error.response?.data as ApiResponseVoid;
                if (apiError && apiError.error) {
                    if (apiError.error.fieldErrors) {
                        apiError.error.fieldErrors.forEach((v) => {
                            form.setError(v.key as keyof StoragePlanRequestDTO, {
                                message: v.message,
                            });
                        });
                    }
                }
            },
        },
    });
    const onSubmit = (data: StoragePlanRequestDTO) => {
        mutation.mutate({ id, data });
    };
    return (
        <>
            <PageTitle
                name="Update Storage Plan"
                breadcrumbList={[
                    { name: "Home", href: "/" },
                    { name: "Storage Plan", href: "/manage/storage-plan" },
                    { name: "Update", href: `/manage/storage-plan/update/${id}`},
                ]}
            />
            <div className="flex flex-col items-center justify-center">
                <Card className="w-[500px] sm:w-5xl mx-auto mt-10">
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="custom-required-label ml-2">
                                                    Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="custom-textbox"
                                                        placeholder="Enter storage plan name"
                                                    />
                                                </FormControl>
                                                <div className="min-h-[17px]">
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="storageLimit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="custom-required-label ml-2">
                                                    Storage Limit
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(e.target.valueAsNumber)
                                                        }
                                                        className="custom-textbox"
                                                        placeholder="Enter storage limit"
                                                    />
                                                </FormControl>
                                                <div className="min-h-[17px]">
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="timeOfPlan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="custom-required-label ml-2">
                                                    Time of Plan (day)
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(e.target.valueAsNumber)
                                                        }
                                                        className="custom-textbox pr-11"
                                                        placeholder="Enter time of plan"
                                                    />
                                                </FormControl>
                                                <div className="min-h-[17px]">
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="custom-required-label ml-2">
                                                    Price
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={(e) =>
                                                            field.onChange(e.target.valueAsNumber)
                                                        }
                                                        className="custom-textbox pr-11"
                                                        placeholder="Enter price"
                                                    />
                                                </FormControl>
                                                <div className="min-h-[17px]">
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className="col-span-1 md:col-span-2">
                                                <FormLabel className="custom-required-label ml-2">
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="custom-textbox pr-11"
                                                        placeholder="Enter description"
                                                    />
                                                </FormControl>
                                                <div className="min-h-[17px]">
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="w-lg mx-auto">
                                    <Button
                                        variant={"primary"}
                                        className="w-full h-14 rounded-xl text-lg"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <Button
                    variant={"outlineSecondary"}
                    className="mt-4 w-lg rounded-xl text-lg h-14"
                    onClick={() => navigate({ to: "/manage/storage-plan" })}
                >
                    <ArrowLeft />
                    Back
                </Button>
            </div>
        </>
    );
};
