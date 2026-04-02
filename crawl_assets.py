
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import time
import re

# 설정
TARGET_SITES = [
    {"name": "hs-tech", "url": "https://www.hs-tech.co.kr/"},
    {"name": "hangseong", "url": "http://www.hangseong.co.kr/"},
    {"name": "gentop", "url": "http://www.gentop.co.kr/"}
]
BASE_DIR = "public/downloads"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def clean_filename(url):
    """URL에서 파일명을 추출하고 안전한 이름으로 변환"""
    path = urlparse(url).path
    name = os.path.basename(path)
    if not name or '.' not in name:
        name = f"image_{int(time.time()*1000)}.jpg"
    name = re.sub(r'[^\w\-.]', '_', name) # 특수문자 제거
    return name

def download_image(img_url, save_dir):
    """이미지 다운로드"""
    try:
        if img_url.startswith('data:'): return # data URI 제외
        
        filename = clean_filename(img_url)
        save_path = os.path.join(save_dir, filename)
        
        if os.path.exists(save_path): return # 이미 존재하면 스킵

        response = requests.get(img_url, headers=HEADERS, timeout=10, verify=False)
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                f.write(response.content)
            print(f"  [IMG] Saved: {filename}")
        else:
            print(f"  [ERR] Image download failed: {response.status_code}")
    except Exception as e:
        print(f"  [ERR] Image Error: {e}")

def crawl_site(name, start_url):
    print(f"\n🚀 Starting Crawl: {name} ({start_url})")
    
    save_dir = os.path.join(BASE_DIR, name)
    img_dir = os.path.join(save_dir, "images")
    os.makedirs(img_dir, exist_ok=True)
    
    text_file = os.path.join(save_dir, "content.txt")
    
    visited = set()
    to_visit = [start_url]
    domain = urlparse(start_url).netloc
    
    # 텍스트 파일 초기화
    with open(text_file, 'w', encoding='utf-8') as f:
        f.write(f"=== {name} Crawled Data ===\n\n")

    count = 0
    max_pages = 20 # 너무 많이 긁지 않도록 제한

    while to_visit and count < max_pages:
        url = to_visit.pop(0)
        if url in visited: continue
        visited.add(url)
        count += 1
        
        print(f"Processing ({count}/{max_pages}): {url}")
        
        try:
            resp = requests.get(url, headers=HEADERS, timeout=10, verify=False)
            # 인코딩 자동 감지 (오래된 사이트 대비)
            resp.encoding = resp.apparent_encoding 
            
            if resp.status_code != 200: continue
            
            soup = BeautifulSoup(resp.text, 'html.parser')
            
            # 1. 텍스트 추출 및 저장
            title = soup.title.string.strip() if soup.title else "No Title"
            body_text = soup.body.get_text(separator='\n', strip=True) if soup.body else ""
            cleaned_text = '\n'.join([line for line in body_text.splitlines() if len(line) > 50]) # 너무 짧은 줄 제외 (메뉴 등)
            
            with open(text_file, 'a', encoding='utf-8') as f:
                f.write(f"\n\n--- Page: {title} ({url}) ---\n")
                f.write(cleaned_text[:2000]) # 페이지당 텍스트 양 제한
                f.write("\n")

            # 2. 이미지 다운로드 (로고, 제품 이미지 위주)
            for img in soup.find_all('img'):
                src = img.get('src')
                if src:
                    full_img_url = urljoin(url, src)
                    download_image(full_img_url, img_dir)
            
            # 3. 내부 링크 수집 (같은 도메인만)
            for a in soup.find_all('a', href=True):
                href = a['href']
                full_url = urljoin(url, href)
                parsed_link = urlparse(full_url)
                
                # 같은 도메이고, html/php/jsp 등으로 끝나는 텍스트 페이지, 이미 방문 안함
                if parsed_link.netloc == domain and full_url not in visited and full_url not in to_visit:
                    # 파일 다운로드 제외
                    if not any(full_url.endswith(ext) for ext in ['.pdf', '.zip', '.hwp', '.doc']):
                        to_visit.append(full_url)
                        
        except Exception as e:
            print(f"  [ERR] Page Error: {e}")

    print(f"✅ Finished {name}")

if __name__ == "__main__":
    # SSL 경고 무시
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    
    for site in TARGET_SITES:
        crawl_site(site['name'], site['url'])
