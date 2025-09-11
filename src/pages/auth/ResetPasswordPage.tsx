import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
    newPassword: z.string(),
    confirmPassword: z.string(),
});

type formDataType = z.infer<typeof formSchema>;

export default function ResetPasswordPage() {
    const form = useForm<formDataType>({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onSubmit",
        resolver: zodResolver(formSchema),
    });
    const onSubmit = (data: formDataType) => {
        console.log(data.newPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="fixed top-0 w-full h-[100px] bg-white"></div>
            <Card className="w-[600px] h-[500px]">
                <CardHeader>
                    <CardTitle className="text-[30px]">Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="newPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="custom-required-label">
                                            new password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="custom-textbox"
                                                {...field}
                                                placeholder="Enter your new password"
                                            />
                                        </FormControl>
                                        <div className="min-h-[17px]">
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="confirmPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="custom-required-label">
                                            confirm password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="custom-textbox"
                                                {...field}
                                                placeholder="Confirm your new password"
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
