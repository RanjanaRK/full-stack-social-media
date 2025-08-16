import editProfileInfo from "@/actions/profile/editProfileInfo.action";
import { EditProfileFormSchemaType } from "@/lib/types";
import { editProfileFormSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

type EditProfileInfoFormProps = {
  id: string;
  name: string;
  bio: string;
  onSuccess: () => void;
};

const EditProfileInfoForm = ({
  // id,
  name,
  bio,
  onSuccess,
}: EditProfileInfoFormProps) => {
  const form = useForm<EditProfileFormSchemaType>({
    defaultValues: {
      name: name,
      bio: bio,
    },
    resolver: zodResolver(editProfileFormSchema),
    mode: "all",
  });

  const editProfileHandle = async (values: EditProfileFormSchemaType) => {
    console.log(values);

    const { success, message } = await editProfileInfo({
      name: values.name,
      bio: values.bio,
    });

    if (!success) {
      toast(message);
    }

    if (success) {
      toast(message);
      form.reset();
      onSuccess();
      // push("/feed");
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(editProfileHandle)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "  Edit info"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditProfileInfoForm;
