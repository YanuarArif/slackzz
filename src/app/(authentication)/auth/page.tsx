"use client";

import { BsSlack } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { RxGithubLogo } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MdOutlineAutoAwesome } from "react-icons/md";
import { useState } from "react";
import { Provider } from "@supabase/supabase-js";
import { supabaseBrowserClient } from "@/utils/supabase/client";
import { registerWithEmail } from "@/actions/register-with-email";

function AuthPage() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Email tidak valid" })
      .min(2, { message: "Email harus diisi" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAuthenticating(true);
    const response = await registerWithEmail(values);
    const { data, error } = JSON.parse(response);
    setIsAuthenticating(false);
    if (error) {
      console.warn("Sign in error", error);
      return;
    }
  }

  async function socialAuth(provider: Provider) {
    setIsAuthenticating(true);
    await supabaseBrowserClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    setIsAuthenticating(false);
  }

  return (
    <div className="min-h-screen p-5 grid text-center place-content-center bg-white">
      <div className="max-w-[450px]">
        <div className="flex justify-center items-center gap-3 mb-4">
          <BsSlack size={30} />
          <Typography text="Slackzz" variant="h2" />
        </div>

        <Typography
          text="Login ke akun Slackzz"
          variant="h3"
          className="mb-3"
        />
        <Typography
          text="Kami sarankan untuk menggunakan email untuk pekerjaan"
          variant="p"
          className="opacity-90 mb-7"
        />
        {/* Tombol Login dengan Google dan Github */}
        <div className="flex flex-col space-y-2">
          <Button
            disabled={isAuthenticating}
            variant="outline"
            className="py-4 border-2 flex space-x-3"
            onClick={() => socialAuth("google")}
          >
            <FcGoogle size={20} />
            <Typography className="" text="Sign in with Google" variant="p" />
          </Button>
          <Button
            disabled={isAuthenticating}
            variant="outline"
            className="py-4 border-2 flex space-x-3"
            onClick={() => socialAuth("github")}
          >
            <RxGithubLogo size={20} />
            <Typography className="" text="Sign in with Github" variant="p" />
          </Button>
        </div>
        {/* Line OR */}
        <div>
          <div className="flex items-center my-6">
            <div className="mr-[10px] flex-1 border-t bg-neutral-300" />
            <Typography text="OR" variant="p" />
            <div className="ml-[10px] flex-1 border-t bg-neutral-300" />
          </div>
        </div>
        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset disabled={isAuthenticating}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="nama-email@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-primary-dark hover:bg-primary-dark/90 w-full my-5 text-white"
                variant="secondary"
                type="submit"
              >
                <Typography text="Sign in with Email" variant="p" />
              </Button>
              <div className="px-5 py-4 bg-gray-100 rounded-sm">
                <div className="text-gray-500 flex items-center space-x-3">
                  <MdOutlineAutoAwesome size={20} />
                  <Typography
                    text="We will email you a magic link for a password-free sign-in"
                    variant="p"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default AuthPage;
