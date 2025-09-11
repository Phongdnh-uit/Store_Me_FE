import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MESSAGES } from "@/constants/message";
import { forgotPassword } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    email: z.email(MESSAGES.VALIDATION.INVALID_EMAIL),
});

type formDataType = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
    const form = useForm<formDataType>({
        defaultValues: {
            email: "",
        },
        mode: "onSubmit",
        resolver: zodResolver(formSchema),
    });
    const onSubmit = (data: formDataType) => {
        forgotPassword(data.email);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="fixed top-0 w-full h-[100px] bg-white"></div>
            <Card className="w-[600px] h-[400px]">
                <CardHeader>
                    <CardTitle className="text-[30px]">Forgot password?</CardTitle>
                    <CardDescription className="text-[20px]">
                        Enter the email address, and we will send you a link to reset your
                        password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="email"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="custom-required-label">
                                            email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="custom-textbox"
                                                {...field}
                                                placeholder="Enter your email address"
                                            />
                                        </FormControl>
                                        <div className="min-h-[17px]">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <motion.button
                                className="w-full"
                                whileHover={{ scale: 1.025 }}
                                whileTap={{ scale: 0.975 }}
                            >
                                <Button className="custom-primary-button" type="submit">
                                    Submit
                                </Button>
                            </motion.button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
