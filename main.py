import requests
import concurrent.futures
import time

def send_request():
    result = requests.get("http://localhost:8000/api/v1/create_project/").json()
    print(result)

# ثبت زمان شروع
start_time = time.time()

# ارسال درخواست‌ها به صورت همزمان با استفاده از ThreadPoolExecutor
with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
    futures = [executor.submit(send_request) for _ in range(100)]
    
    # انتظار برای تکمیل همه درخواست‌ها
    concurrent.futures.wait(futures)

# ثبت زمان پایان
end_time = time.time()

# محاسبه مدت زمان
elapsed_time = end_time - start_time
print(f"Time taken for 100 requests: {elapsed_time:.3f} seconds")
