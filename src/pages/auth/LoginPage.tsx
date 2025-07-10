import { useForm } from "react-hook-form";
import { LoginRequestSchema, type LoginRequestType } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
    const form = useForm<LoginRequestType>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onSubmit",
        resolver: zodResolver(LoginRequestSchema),
    });

    const onSubmit = (data: LoginRequestType) => {
        console.log(data);
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="custom-required-label">email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="custom-textbox"
                                        placeholder="Enter your email address"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="custom-required-label">
                                    password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        className="custom-textbox"
                                        placeholder="Enter your password"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
}
