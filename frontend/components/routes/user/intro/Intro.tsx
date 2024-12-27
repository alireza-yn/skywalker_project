"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  GraduationCap,
  Search,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { fetchMultipleRequests } from "@/lib/api";
import { get } from "http";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Cookies from "js-cookie";
const Intro = () => {
  const [checked, setChecked] = React.useState(false);
  const [question_id, setQuestion_id] = React.useState(1);
  const [data, setData] = React.useState({
    is_programmer: false,
  });
  const [fetch_data, setFetch_data] = useState<any>();
  const [selectedExpertise, setSelectedExpertise] = useState<number[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<number[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQuerySkill, setSearchQuerySkill] = useState("");
  const [resumeData, setResumeData] = useState<any>({
    title: "", // عنوان رزومه
    description: "", // توضیحات
    file: null, // فایل آپلود شده
  });



  
  const toggleSelectedExpertise = (id: number) => {
    setSelectedExpertise((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id); // حذف آیتم
      } else {
        return [...prev, id]; // اضافه کردن آیتم
      }
    });
  };
  const toggleSelectedLanguage = (id: number) => {
    setSelectedLanguage((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id); // حذف آیتم
      } else {
        return [...prev, id]; // اضافه کردن آیتم
      }
    });
  };
  const toggleSelectedSkills = (id: number) => {
    setSelectedSkills((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id); // حذف آیتم
      } else {
        return [...prev, id]; // اضافه کردن آیتم
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setResumeData((prevData: any) => ({
      ...prevData,
      file,
    }));
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
  
      // Append fields to FormData
      formData.append("programmer", data.is_programmer ? "programmer" : "student");
      formData.append("language", JSON.stringify(selectedLanguage));
      formData.append("skill", JSON.stringify(selectedSkills));
      formData.append("expertise", JSON.stringify(selectedExpertise));
      formData.append("cv_file", resumeData.file); // The file object
      formData.append("cv_title", resumeData.title);
      formData.append("cv_description", resumeData.description);
  
      // Send FormData using Axios
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/add_resume/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for FormData
            Authorization: "Bearer " + Cookies.get("token"),
          },
        }
      );
  
      console.log("Response:", response.data);
    } catch (err) {
      console.error("Error while uploading:", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMultipleRequests([
        "http://127.0.0.1:8000/api/v1/programmer-exprertise/",
        "http://127.0.0.1:8000/api/v1/programmer-skills/",
        "http://127.0.0.1:8000/api/v1/programming-languages/",
      ]);
      setFetch_data(result);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex items-center flex-col justify-center">
      <div className="flex flex-1 w-full items-center justify-center relative">
        <Card
          className={`w-96 h-96 ${
            question_id !== 1 ? "hidden" : "flex"
          } flex-col justify-between `}
        >
          <CardHeader>
            <CardTitle>سوال اول</CardTitle>
            <CardDescription>برنامه نویسی؟</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center gap-4">
            <div
              className={`flex flex-col shadow-md items-center border rounded-md text-base transition-all duration-500 p-2 box-border ${
                checked
                  ? "opacity-100 pointer-events-none scale-110 "
                  : "opacity-50"
              }`}
            >
              <Code2 />
              <span>برنامه نویسم</span>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                dir="ltr"
                onCheckedChange={(checked: boolean) => {
                  setChecked(checked);
                  setData({
                    ...data,
                    is_programmer: checked,
                  });
                }}
              />
            </div>

            <div
              className={`flex flex-col shadow-md border rounded-md  items-center text-base transition-all duration-500 p-2 box-border ${
                checked
                  ? "opacity-50"
                  : "opacity-100 pointer-events-none scale-110"
              }`}
            >
              <GraduationCap />
              <span className="w-full">میخوام یاد بگیرم</span>
            </div>
          </CardContent>

          <CardFooter className="flex">
            <Button
              className="rounded-full flex-1"
              onClick={() => setQuestion_id(2)}
            >
              <ArrowRight />
              <span>بعدی</span>
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={`w-[600px] h-[600px] ${
            question_id !== 2 ? "hidden" : "flex"
          } flex-col justify-between`}
        >
          <CardHeader>
            <CardTitle>سوال دوم</CardTitle>
            <CardDescription>حوزه تخصص خود را انتخاب کنید</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center gap-4">
            {fetch_data &&
              fetch_data[0].map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelectedExpertise(item.id)} // مدیریت انتخاب یا حذف آیتم
                  className={`flex flex-col shadow-md items-center border rounded-md text-base transition-all duration-500 p-2 box-border cursor-pointer ${
                    selectedExpertise.includes(item.id)
                      ? "bg-blue-200 text-white"
                      : "bg-white"
                  }`}
                >
                  <span>{item.title}</span>
                </div>
              ))}
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button
              className="rounded-full flex-1"
              onClick={() => setQuestion_id(3)}
            >
              <ArrowRight />
              <span>بعدی</span>
            </Button>
            <Button
              className="rounded-full flex-1"
              variant={"outline"}
              onClick={() => setQuestion_id(1)}
            >
              <span>بازگشت</span>
              <ArrowLeft />
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={`w-[600px] h-[600px] ${
            question_id !== 3 ? "hidden" : "flex"
          } flex-col justify-between `}
        >
          <CardHeader>
            <CardTitle>سوال سوم</CardTitle>
            <CardDescription>
              زبان ها و فریم ورک هایی که مسلط هستید
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 border-t border-b h-full box-border py-2 overflow-y-hidden">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-0" />
              <Input
                type="text"
                placeholder="جستجو"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 gap-4 box-border py-2 overflow-y-scroll w-full">
              {fetch_data &&
                fetch_data[2]
                  .filter((item: any) => {
                    // اگر searchQuery خالی نباشد، فیلتر روی تطابق نام با جستجو انجام می‌شود
                    if (searchQuery !== "") {
                      return item.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                    }
                    return true; // اگر searchQuery خالی باشد، همه آیتم‌ها نشان داده می‌شوند
                  })
                  .map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => toggleSelectedLanguage(item.id)} // مدیریت انتخاب یا حذف آیتم
                      className={`flex flex-col shadow-md items-center h-[180px]  border rounded-md text-base transition-all duration-500  box-border p-2 cursor-pointer ${
                        selectedLanguage.includes(item.id)
                          ? "bg-blue-200 text-blue-600"
                          : "bg-white"
                      }`}
                    >
                      <Image
                        src={item.image}
                        width={100}
                        height={100}
                        className="object-fill"
                        alt={`${item.name}_${item.level}`}
                      />
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.level}
                      </span>
                    </div>
                  ))}
            </div>
          </CardContent>

          <CardFooter className="flex gap-2 mt-4">
            <Button
              className="rounded-full flex-1"
              onClick={() => setQuestion_id(4)}
            >
              <ArrowRight />
              <span>بعدی</span>
            </Button>
            <Button
              className="rounded-full flex-1"
              variant={"outline"}
              onClick={() => setQuestion_id(2)}
            >
              <span>بازگشت</span>
              <ArrowLeft />
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={`w-[600px] h-[600px] ${
            question_id !== 4 ? "hidden" : "flex"
          } flex-col justify-between `}
        >
          <CardHeader>
            <CardTitle>سوال چهارم</CardTitle>
            <CardDescription>
              مهارت هایی که دارید رو انتخاب کنید
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 border-t border-b h-full box-border py-2 overflow-y-hidden">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-0" />
              <Input
                type="text"
                placeholder="جستجو"
                onChange={(e) => setSearchQuerySkill(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 gap-4 box-border py-2 overflow-y-scroll w-full">
              {fetch_data &&
                fetch_data[1]
                  .filter((item: any) => {
                    // اگر searchQuery خالی نباشد، فیلتر روی تطابق نام با جستجو انجام می‌شود
                    if (searchQuerySkill !== "") {
                      return item.name
                        .toLowerCase()
                        .includes(searchQuerySkill.toLowerCase());
                    }
                    return true; // اگر searchQuery خالی باشد، همه آیتم‌ها نشان داده می‌شوند
                  })
                  .map((item: any) => (
                    <div
                      key={item.id}
                      onClick={() => toggleSelectedSkills(item.id)} // مدیریت انتخاب یا حذف آیتم
                      className={`flex flex-col shadow-md items-center h-[180px]  border rounded-md text-base transition-all duration-500  box-border p-2 cursor-pointer ${
                        selectedSkills.includes(item.id)
                          ? "bg-blue-200 text-blue-600"
                          : "bg-white"
                      }`}
                    >
                      {/* <Image
                      src={item.image}
                      width={100}
                      height={100}
                      className="object-fill"
                      alt={`${item.name}_${item.level}`}
                    /> */}
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.level}
                      </span>
                    </div>
                  ))}
            </div>
          </CardContent>

          <CardFooter className="flex gap-2 mt-4">
            <Button
              className="rounded-full flex-1"
              onClick={() => setQuestion_id(5)}
            >
              <ArrowRight />
              <span>بعدی</span>
            </Button>
            <Button
              className="rounded-full flex-1"
              variant={"outline"}
              onClick={() => setQuestion_id(3)}
            >
              <span>بازگشت</span>
              <ArrowLeft />
            </Button>
          </CardFooter>
        </Card>

        <Card
          className={`w-[400px] h-auto ${
            question_id !== 5 ? "hidden" : "flex"
          } flex-col justify-between`}
        >
          <CardHeader>
            <CardTitle>روزومه</CardTitle>
            <CardDescription>اطلاعات روزومه خود را تکمیل کنید</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">عنوان رزومه</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="رزومه"
                    value={resumeData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="description">توضیحات</Label>
                  <Textarea
                    className="max-h-[200px] overflow-y-scroll"
                    placeholder="بنویسید..."
                    id="description"
                    name="description"
                    value={resumeData.description}
                    onChange={handleTextareaChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    توضیحات کوتاه و مختصر بنویسید.
                  </p>
                </div>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {resumeData.file ? (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          {resumeData.file?.name}
                        </p>
                      ) : (
                        <>
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>

                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
      <Button onClick={handleUpload}>
        <Check />
        <span>ثبت اطلاعات</span>
      </Button>
          <Button variant={"outline"} onClick={()=>{
            setQuestion_id(4)
          }}>

            <span>بازگشت</span>
          <ArrowLeft />
          </Button>

          </CardFooter>
        </Card>
      </div>

      <div className="h-20 w-full flex items-center justify-center" dir="ltr">
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className={`w-10 h-2 rounded-full ${
              index <= question_id - 1 ? "bg-blue-600 mx-1" : "bg-gray-400 mx-1"
            }`}
          ></div>
        ))}
      </div>

    </div>
  );
};

export default Intro;
