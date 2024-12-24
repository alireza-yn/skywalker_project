"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import axios from "axios";
import Cookies from "js-cookie";
export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [phone, setPhone] = useState("09398231219");
    const [value, setValue] = useState("")
    const [showOtp, setShowOtp] = useState(false)


    const loginHandler = async ()=>{
        try {
            const request = await axios.post(`${process.env.server}/auths/login/`, {
                phone: phone,
            })
            const response = await request.data
            console.log(response);
            if (response.status == 200 || response.status == 201){
                Cookies.set("token",response.access)
                setShowOtp(true)
            }
        } catch (err: any) {
            if (err?.response.status == 401){
                console.log(err)
            }
            else if (err?.response.status == 400){
                console.log(err)
            }
            else if (err?.response.status == 500){
                console.log(err)
        }
    }
    }
  return (
    <div className={cn(`${showOtp ? "hidden" : "flex"} flex-col gap-6`, className)} {...props}>
      <div className="w-auto h-auto">
        <Card className="overflow-hidden">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">به دیباگچی خوش آمدید</h1>
                  <p className="text-balance text-muted-foreground my-4">
                    دیباگچی دنیای کد نویسی
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">شماره تلفن</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="09xxxxxxxxx"
                    required
                  />
                </div>
               
                <Button type="submit" className="w-full">
                  ورود
                </Button>
             
              </div>
            </form>
            <div className="relative hidden bg-muted md:block">
              <img
                src="/placeholder.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>

      <Card className={`${showOtp ? "flex" : "hidden"}}`}>
        <CardHeader>
          <CardTitle>کد تایید</CardTitle>
          <CardDescription>کد شش رقمی برای شماره تلفن {phone} ارسال شده</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
        <div className="space-y-2" dir="ltr">
      <InputOTP

        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
     
    </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">تایید</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
