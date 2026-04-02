import shutil
import os
import time

base_dir = "/Users/admin/.gemini/antigravity/brain/b62bd3fa-cc93-4c90-8722-af4f52b556b9"
out_dir = "/Users/admin/Desktop/jcatalog/public/templates/hangseong/images/products"

# Swap mapping logic:
# We suspect 958 is Case, and 961 is Bracket.
files = {
    "media__1770861004958.jpg": "hvac_wide_case.jpg",
    "media__1770861004961.jpg": "hvac_wide_bracket.jpg"
}

print("🔄 Swapping images...")
for src, dst in files.items():
    src_path = os.path.join(base_dir, src)
    dst_path = os.path.join(out_dir, dst)
    
    if os.path.exists(src_path):
        try:
            # Add timestamp to force cache bust (optional, but good practice if filename same)
            # But here we keep filename same for data.ts consistency.
            # Next.js might cache, so we might need to rely on hard refresh.
            shutil.copy(src_path, dst_path)
            print(f"✅ Copied {src} -> {dst}")
        except Exception as e:
            print(f"❌ Error copying {src}: {e}")
    else:
        print(f"⚠️ Source not found: {src}")
