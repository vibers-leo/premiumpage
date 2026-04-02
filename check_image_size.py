from PIL import Image
import os

base_dir = "/Users/admin/.gemini/antigravity/brain/b62bd3fa-cc93-4c90-8722-af4f52b556b9"
files = [
    "media__1770861004958.jpg",
    "media__1770861004961.jpg",
    "media__1770859223701.png"
]

for f in files:
    path = os.path.join(base_dir, f)
    try:
        if os.path.exists(path):
            img = Image.open(path)
            print(f"File: {f}, Size: {img.size}")
        else:
            print(f"File: {f} not found")
    except Exception as e:
        print(f"Error reading {f}: {e}")
