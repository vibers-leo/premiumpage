from PIL import Image
import os

base_dir = "/Users/admin/.gemini/antigravity/brain/b62bd3fa-cc93-4c90-8722-af4f52b556b9"
out_dir = "/Users/admin/Desktop/jcatalog/public/templates/hangseong/images/products"
os.makedirs(out_dir, exist_ok=True)

# 1. Convert 2x2 Case image to 1x4 Wide
case_src = os.path.join(base_dir, "media__1770859223701.png")
if os.path.exists(case_src):
    try:
        img = Image.open(case_src)
        w, h = img.size
        print(f"Converting Case 2x2 ({w}x{h}) to 1x4 Wide...")
        
        mx, my = w//2, h//2
        # Crop 4 parts
        p1 = img.crop((0, 0, mx, my))
        p2 = img.crop((mx, 0, w, my))
        p3 = img.crop((0, my, mx, h))
        p4 = img.crop((mx, my, w, h))
        
        # Target dimensions (1000px width total -> 250px each)
        final_w = 1000
        part_w = 250
        part_h = int(part_w * (my/mx))
        
        new_img = Image.new('RGB', (final_w, part_h), (255, 255, 255))
        
        # Resize parts
        p1 = p1.resize((part_w, part_h), Image.LANCZOS)
        p2 = p2.resize((part_w, part_h), Image.LANCZOS)
        p3 = p3.resize((part_w, part_h), Image.LANCZOS)
        p4 = p4.resize((part_w, part_h), Image.LANCZOS)
        
        # Paste in 1x4 layout
        new_img.paste(p1, (0, 0))
        new_img.paste(p2, (part_w, 0))
        new_img.paste(p3, (part_w*2, 0))
        new_img.paste(p4, (part_w*3, 0))
        
        new_img.save(os.path.join(out_dir, "hvac_wide_case.png"))
        print("✅ Saved hvac_wide_case.png (Converted from 2x2)")
    except Exception as e:
        print(f"❌ Error converting case image: {e}")

# 2. Copy the uploaded wide images
# We assume the user uploaded Bracket and Core/Cover
# Let's save them as hvac_wide_02.jpg and hvac_wide_03.jpg
files = {
    "media__1770861004958.jpg": "hvac_wide_cover.jpg", 
    "media__1770861004961.jpg": "hvac_wide_bracket.jpg"
}

for src, dst_name in files.items():
    src_path = os.path.join(base_dir, src)
    if os.path.exists(src_path):
        try:
            img = Image.open(src_path)
            img.save(os.path.join(out_dir, dst_name))
            print(f"✅ Saved {dst_name}")
        except Exception as e:
            print(f"❌ Error copying {dst_name}: {e}")
    else:
        print(f"⚠️ Source file not found: {src}")
