import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { CreateFolderRequestDTO } from "@/gen/models";
import { Route } from "@/routes/_app/manage/drive/$id";
import { useForm } from "react-hook-form";

export default function CreateFolderModal() {
  const { id } = Route.useParams();
  const form = useForm<CreateFolderRequestDTO>({
    defaultValues: {
      name: "",
      parentId: id === "root" ? null : id,
      hidden: false,
      locked: false,
    },
  });
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outlinePrimary">Create folder</Button>
        </DialogTrigger>
        <DialogContent className="w-xl">
          <DialogHeader>
            <DialogTitle>Create folder</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel className="custom-required-label ml-2">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="custom-textbox col-span-3"
                        placeholder="Enter your email address"
                      />
                    </FormControl>
                    <div className="min-h-[17px] col-span-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hidden"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel className="custom-required-label ml-2">
                      Hidden
                    </FormLabel>
                    <FormControl>
                      <Switch
                        className="col-span-3"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="min-h-[17px] col-span-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="locked"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4">
                    <FormLabel className="custom-required-label ml-2">
                      Locked
                    </FormLabel>
                    <FormControl>
                      <Switch
                        className="col-span-3"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="min-h-[17px] col-span-4">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </Form>
          <DialogFooter className="">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
