import { useForm } from "react-hook-form";
import { LoginRequestSchema, type LoginRequestType } from "../../types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";

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
    if (data.email === "admin@gmail.com" && data.password === "admin123") {
      toast.success("Login successful!", {
        position: "top-center",
      });
    } else {
      toast.error("Invalid email or password. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="h-screen w-full lg:w-5/9 flex items-center justify-center">
        <Card className="w-[500px] h-[670px]">
          <CardHeader>
            <CardTitle className="text-[30px]">
              Log in to your account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
            <Separator className="my-3" />
            <motion.button
              className="mt-1 w-full"
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.975 }}
            >
              <Button className="custom-outline-button">
                Sign In with Google
              </Button>
            </motion.button>
            <motion.div
              className="mt-3 relative inline-block cursor-pointer"
              initial="rest"
              whileHover="hover"
            >
              <span className="text-[var(--primary-blue)] text-[20px]">
                Forgot Password?{" "}
              </span>
              <motion.div
                variants={{
                  rest: { width: 0 },
                  hover: { width: "100%" },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 h-[2px] bg-[var(--primary-blue)]"
              />
            </motion.div>
            <Separator className="mt-3" />
            <div>
              <span className="text-zinc-900 text-[20px]">
                Don't have an account?{" "}
              </span>
              <motion.div
                className="mt-3 relative inline-block cursor-pointer"
                initial="rest"
                whileHover="hover"
              >
                <span className="text-[var(--primary-blue)] text-[20px]">
                  Sign Up
                </span>
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
