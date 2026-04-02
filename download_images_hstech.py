import requests
import os
import time

# Target Directory
OUTPUT_DIR = "public/templates/hs-tech/images/products"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Image List (Product ID -> URL)
IMAGES = {
    # Re-download targets (failed previously)
    "hmt330_v1.jpg": "https://cdn.imweb.me/thumbnail/20190415/5cb3e390234a4.jpg",
    "hmt310_v1.jpg": "https://cdn.imweb.me/thumbnail/20190415/5cb3e778602b9.jpg",
    "hmt120_v1.jpg": "https://cdn.imweb.me/thumbnail/20190415/5cb3e8b835e30.jpg",
    "hmm170_v1.png": "https://cdn.imweb.me/thumbnail/20210228/491b8a5369688.png",
    "hmp1_9_v1.png": "https://cdn.imweb.me/thumbnail/20210228/486be2e680ccf.png",
    "hmp155_v1.png": "https://cdn.imweb.me/thumbnail/20210228/96d004655f002.png",
    "hmp60_v1.png": "https://cdn.imweb.me/thumbnail/20210228/9986326ed2a41.png",
    "hm70_v1.jpg": "https://cdn.imweb.me/thumbnail/20210228/2dc64cbd01088.jpg",
    "hm40_v1.png": "https://cdn.imweb.me/thumbnail/20210228/4789ab851dd25.png",
    
    # New downloads (Handheld/Probes that might have been skipped)
    "indigo80_hmp80_v1.jpg": "https://cdn.imweb.me/thumbnail/20231123/c1358d36f4818.jpg",
    "shm40_v1.jpg": "https://cdn.imweb.me/thumbnail/20210228/9a60152e8f2db.jpg",
    "hmk15_v1.png": "https://cdn.imweb.me/thumbnail/20210228/50e31ebdea359.png"
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Referer": "https://hs-tech-en.imweb.me/"
}

def download_file(filename, url):
    filepath = os.path.join(OUTPUT_DIR, filename)
    print(f"Downloading {filename}...")
    try:
        response = requests.get(url, headers=HEADERS, timeout=10)
        response.raise_for_status()
        
        # Check if it's actually an image (not error HTML)
        if 'image' not in response.headers.get('Content-Type', ''):
             # Try determining by content
             if b'<html' in response.content[:100] or b'<Error' in response.content[:100]:
                 print(f"  [ERROR] Content is not image (HTML/XML error): {filename}")
                 return False

        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"  [OK] Saved to {filepath} ({len(response.content)} bytes)")
        return True
    except Exception as e:
        print(f"  [FAIL] {filename}: {e}")
        return False

# Execute
success_count = 0
for filename, url in IMAGES.items():
    if download_file(filename, url):
        success_count += 1
    time.sleep(0.5) # Nice delay

print(f"\nCompleted: {success_count}/{len(IMAGES)} images downloaded.")
