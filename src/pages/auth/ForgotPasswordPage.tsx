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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });
  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    // Handle form submission logic here
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="fixed top-0 w-full h-[100px] bg-white"></div>
      <Card className="w-[600px] h-[400px]">
        <CardHeader>
          <CardTitle>Forgot password?</CardTitle>
          <CardDescription>
            Enter the email address, and we will send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="custom-required-label">
                      email
                    </FormLabel>
                    <Input className="custom-textbox" {...field} />
                    <FormMessage />
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
