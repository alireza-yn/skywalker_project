import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    server:"http://127.0.0.1:8000",
    ws:"http://127.0.0.1:8001",
    dashboard:'/user/dashboard'
  }
};

export default nextConfig;
