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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetAllRole } from "@/gen/endpoints/role/role";
import { useCreateUser } from "@/gen/endpoints/user/user";
import { createUserBody } from "@/gen/endpoints/user/user.zod";
import type { ApiResponseVoid, UserRequestDTO } from "@/gen/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const CreateUserPage = () => {
    const navigate = useNavigate();
    const listRole = useGetAllRole({
        size: undefined,
        page: 0,
        filter: "",
    });
    const form = useForm<UserRequestDTO>({
        defaultValues: {
            email: "",
            username: "",
            password: "",
            roleId: undefined,
            status: "UNVERIFIED",
        },
        resolver: zodResolver(createUserBody),
    });
    const createUser = useCreateUser({
        mutation: {
            onSuccess: () => {
                form.reset();
                toast.success("Create user successfully");
            },
            onError: (error) => {
                toast.error("Create user failed");
                const apiError = error.response?.data as ApiResponseVoid;
                if (apiError && apiError.error) {
                    if (apiError.error.fieldErrors) {
                        apiError.error.fieldErrors.forEach((v) => {
                            form.setError(v.key as keyof UserRequestDTO, {
                                message: v.message,
                            });
                        });
                    }
                }
            },
        },
    });
    const onSubmit = (data: UserRequestDTO) => {
        createUser.mutate({ data });
    };
    return (
        <div className="relative min-h-screen">
            <div className="absolute inset-4 bg-white rounded-2xl shadow-md p-4 overflow-auto">
                <PageTitle
                    name="Create User"
                    breadcrumbList={[
                        { name: "Home", href: "/" },
                        { name: "Users", href: "/manage/user" },
                        { name: "Create", href: "/manage/user/create" },
                    ]}
                />
                <Card className="w-[500px] md:w-5xl mx-auto mt-20">
                    <CardContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="custom-required-label ml-2">
                                                    email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="custom-textbox"
                                                        placeholder="Enter your email address"
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
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="custom-required-label ml-2">
                                                    username
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="custom-textbox"
                                                        placeholder="Enter your username"
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
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="custom-required-label ml-2">
                                                    password
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="custom-textbox pr-11"
                                                        placeholder="Enter your password"
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
                                        name="roleId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="custom-required-label ml-2">
                                                    role
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value ? "" + field.value : undefined}
                                                        onValueChange={(v) => field.onChange(Number(v))}
                                                    >
                                                        <SelectTrigger
                                                            className="custom-textbox w-full"
                                                            aria-invalid={
                                                                form.formState.errors.roleId ? "true" : "false"
                                                            }
                                                        >
                                                            <SelectValue
                                                                placeholder="Select role"
                                                                className="text-zinc-600"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {listRole.data?.data?.content?.map((role) => (
                                                                <SelectItem key={role.id} value={"" + role.id}>
                                                                    {role.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <div className="min-h-[17px]">
                                                    <FormMessage />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="custom-required-label ml-2">
                                                    status
                                                </FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value ? field.value : undefined}
                                                        onValueChange={(v) => field.onChange(v)}
                                                    >
                                                        <SelectTrigger
                                                            className="custom-textbox w-full"
                                                            aria-invalid={
                                                                form.formState.errors.status ? "true" : "false"
                                                            }
                                                        >
                                                            <SelectValue
                                                                placeholder="Select role"
                                                                className="text-zinc-600"
                                                            />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {[
                                                                "UNVERIFIED",
                                                                "ACTIVE",
                                                                "BLOCKED",
                                                                "DELETED",
                                                            ].map((status, idx) => (
                                                                <SelectItem key={idx} value={status}>
                                                                    {status}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
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
                    className="mt-10 mx-auto w-lg h-14 rounded-xl text-lg"
                    variant={"outlineSecondary"}
                    onClick={() => navigate({ to: "/manage/user" })}
                >
                    <ArrowLeft />
                    Back
                </Button>
            </div>
        </div>
    );
};
