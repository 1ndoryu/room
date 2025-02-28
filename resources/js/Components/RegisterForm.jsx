// resources/js/Components/RegisterForm.jsx
import { cn } from "@/lib/utils"
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({
    className,
    errors,
    processing,
    setData,
    data,
    submit,
    ...props
}) {
    return (
        <div className={cn("mx-auto flex flex-col gap-6 max-w-[500px]", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create an Account</CardTitle>
                    <CardDescription>
                        Enter your information below to create your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Your username"
                                    required
                                    value={data.username}
                                    onChange={(e) => setData('username', e.target.value)}
                                />
                                {errors.username && <div className="text-sm text-red-500">{errors.username}</div>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <div className="text-sm text-red-500">{errors.email}</div>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <div className="text-sm text-red-500">{errors.password}</div>}
                            </div>
                            {/*Aqui imprimo el error de strapi */}
                            {errors.strapi && <div className="text-sm text-red-500">{errors.strapi}</div>}

                            <Button type="submit" className="w-full" disabled={processing}>
                                Register
                            </Button>
                        </div>

                        <div className="mt-4 text-sm text-center">
                            Already have an account?{" "}
                            <Link href="/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}