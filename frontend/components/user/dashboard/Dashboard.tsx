import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs'
import React from 'react'
import { LayoutDashboard } from 'lucide-react'

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className="container mx-auto px-4">
      <Tabs defaultValue="account" className="w-ful">
        <div className="mb-4 max-w-3xl mx-auto">
          <TabsList className="flex w-full bg-transparent border-b-2 border-transparent">
            <TabsTrigger 
              value="account" 
              className="flex-1 gap-4 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-700 data-[state=active]:text-blue-700 rounded-none shadow-none"
            >
              <span>پروفایل</span>
              <LayoutDashboard />
            </TabsTrigger>
            <TabsTrigger 
              value="password"
              className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-700 data-[state=active]:text-blue-700 rounded-none shadow-none"
            >
              Password
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="w-full">
          <TabsContent value="account" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="password" className="w-full">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default Dashboard

