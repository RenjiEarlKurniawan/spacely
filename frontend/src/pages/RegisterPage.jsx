import { registerUser } from "@/services/authService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (values) => {
    setIsLoading(true);
    try {
      const response = await registerUser(values.name, values.email, values.password);
      console.log("Register sukses, token: ", response.token);

      localStorage.setItem("token", response.token);

      navigate("/home");
    } catch (error) {
      console.error("sign up gagal: ", error);
      form.setError("root", { message: "Email sudah digunakan" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen h-[100vh]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className="w-full max-w-96">
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
              )}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="em@gmail.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type={isChecked ? "text" : "Password"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-password"
                  onCheckedChange={(checked) => {
                    setIsChecked(checked);
                  }}
                  className="hover:cursor-pointer"
                />
                <Label htmlFor="show-password" className="hover:cursor-pointer">
                  Show Password
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-1.5 w-full">
              <Button className="hover:cursor-pointer w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <Link to="/login">
                <Button variant="link" className="hover:cursor-pointer">
                  Login
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default RegisterPage;
