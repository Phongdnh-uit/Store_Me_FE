import { Button } from "@/components/ui/button";
import {Separator} from "@/components/ui/separator.tsx";
import {Link} from "@tanstack/react-router"
import {motion} from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function FirstPage(){
    return (
        <div className="flex lg:flex-row">
            <div className="h-screen w-full lg:w-5/9 flex items-center justify-center">
                <Card className="w-[400px] h-[550px]">
                    <CardHeader>
                        <CardTitle className="text-[30px]">
                            Sign up new Account
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 mt-16 mb-20">
                            <motion.div
                                className="w-full"
                                whileHover={{ scale: 1.025 }}
                                whileTap={{ scale: 0.975 }}
                            >
                                <Button className="custom-outline-button w-full">
                                    <FcGoogle className="size-10"/>Sign In with Google
                                </Button>
                            </motion.div>

                            <Separator className="my-3" />

                            <motion.div
                                className="w-full"
                                whileHover={{ scale: 1.025 }}
                                whileTap={{ scale: 0.975 }}
                            >
                                <Link to={"/auth/login"}>
                                    <Button className="custom-primary-button w-full">
                                        Sign In with Email
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        <div className="mt-auto pt-6">
                            <Separator className="mb-4" />
                            <div className="text-center">
                                <span className="text-zinc-900 text-base sm:text-lg lg:text-xl">
                                    Already have account?{" "}
                                </span>
                                <motion.div
                                    className="mt-3 relative inline-block cursor-pointer"
                                    initial="rest"
                                    whileHover="hover"
                                >
                                    <Link to={"/auth/login"} className="text-[var(--primary-blue)] text-base sm:text-lg lg:text-xl">
                                        Login now
                                    </Link>
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
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="hidden h-screen w-full bg-white lg:block"></div>
        </div>
    )
}