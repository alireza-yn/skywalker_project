"use client";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";

import { LayoutDashboard, BugIcon, GraduationCap } from "lucide-react";
import Profile from "./TabContent/Profile";
import Cookies from "js-cookie";
import { performRequest } from "@/lib/api";
import { set } from "date-fns";
type Props = {

  user:any[]
};



const Dashboard = (props: Props) => {


  const TabTrigger = [
    {
      label: "پروفایل",
      icon: LayoutDashboard,
      content: <Profile user={props.user}/>,
    },
    {
      label: "آموزش",
      icon: GraduationCap,
      content: <span>sdfdsf</span>,
    },
    {
      label: "دیباگ",
      icon: BugIcon,
      content: <span>sdfdsf</span>,
    },
    {
      label: "درخواست ها",
      icon: BugIcon,
      content: <span>sdfdsf</span>,
    },
    {
      label: "اعلانات",
      icon: BugIcon,
      content: <span>sdfdsf</span>,
    },
  ];
  return (
    <div className="container mx-auto box-border px-4" dir="rtl">
      <Tabs defaultValue="پروفایل" >
        <div className="mb-4 max-w-3xl mx-auto ">
          <TabsList className="flex flex-row-reverse w-full bg-transparent border-b-2 rounded-none ">
            {TabTrigger.map((item) => (
              <TabsTrigger
                value={item.label}
                className="flex-1 gap-6 data-[state=active]:border-b-2 data-[state=active]:border-b-blue-700 data-[state=active]:text-blue-700 data-[state=active]:bg-slate-200 rounded-none shadow-none"
                key={item.label}
              >
                <span>{item.label}</span>
                <item.icon className="mr-2" />
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="w-full">
          {TabTrigger.map((item) => (
            <TabsContent value={item.label} className="w-full" key={item.label}>
              {item.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Dashboard;
