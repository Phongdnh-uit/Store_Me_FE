import { useForm } from "react-hook-form"
import { SignupRequestSchema, type SignupRequestType} from "@/types/auth";
import {
    Form,
    FormItem,
    FormControl,
    FormLabel,
    FormMessage,
    FormField
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-toastify";
import {motion} from "motion/react";
import {Separator} from "@/components/ui/separator.tsx";
import { useNavigate } from "@tanstack/react-router"
export default function SingupPage(){
    const navigate = useNavigate();
    const form = useForm<SignupRequestType>({
        defaultValues:{
            fullname: "",
            email: "",
            password: "",
        },
        mode:"onSubmit",
        resolver: zodResolver(SignupRequestSchema),
    });
    const onsubmit = (data: SignupRequestType) => {

        if (data.email === "admin@gmail.com" || data.email === "dnhp123@gmail.com") {
            toast.error("Email already exists!", {
                position: "top-center",
            });
        } else {
            if (data.email.length < 6) {
                toast.error("loi", {
                    position: "top-center",
                });
            } else {
                toast.success("OK!", {
                    position: "top-center",
                });
            }

    }
};
return (
    <div className="flex flex-col lg:flex-row">
        <div className="h-screen w-full lg:w-5/9 flex items-center justify-center">
            <Card className="w-[500px] h-[670px]">
                <CardHeader>
                    <CardTitle className="text-[30px]">
                        Sign up with Email
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onsubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="custom-required-label ml-2">
                                            fullname
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="custom-textbox"
                                                placeholder="Enter your fullname"
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="custom-required-label ml-2">
                                            password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="custom-textbox"
                                                placeholder="Enter your password"
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
                                    Log in
                                </Button>
                            </motion.button>
                        </form>
                    </Form>
                    <Separator className="mt-3" />
                    <div>
              <span className="text-zinc-900 text-[20px]">
                Already have account?{" "}
              </span>
                        <motion.div
                            className="mt-3 relative inline-block cursor-pointer"
                            initial="rest"
                            whileHover="hover"
                        >
                <a onClick={() => navigate({ to: "/auth/login" })} className="text-[var(--primary-blue)] text-[20px]">
                  Login now
                </a>
                            <motion.div
                                variants={{
                                    rest: { width: 0 },
                                    hover: { width: "100%" },
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="absolute bottom-0 left-0 h-[2px] bg-[var(--primary-blue)]"
                            />
                        </motion.div>
                    </div>
                    </CardContent>
                </Card>

            </div>
        <div className="hidden h-screen w-full bg-white lg:block"></div>
        </div>
    );
}
