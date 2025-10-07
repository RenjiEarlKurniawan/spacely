import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/services/authService";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const response = await loginUser(values.email, values.password);
      console.log("Login sukses, token:", response.token);

      localStorage.setItem("token", response.token);

      navigate("/home");
    } catch (error) {
      console.error("login gagal: ", error);
      form.setError("root", { message: "Email atau password salah." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="px-4 container py-8 flex flex-col justify-center items-center max-w-screen h-[100vh]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="w-full max-w-96">
          <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>Enter your email below to login to your account</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
              )}
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
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Link to="/register">
                <Button variant="link" className="hover:cursor-pointer">
                  Sign up
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </main>
  );
};

export default LoginPage;
