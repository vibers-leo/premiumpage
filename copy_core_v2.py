import shutil
import os

brain_dir = "/Users/admin/.gemini/antigravity/brain/b62bd3fa-cc93-4c90-8722-af4f52b556b9"
target_dir = "/Users/admin/Desktop/jcatalog/public/templates/hangseong/images/products"
os.makedirs(target_dir, exist_ok=True)

# Source: Correct image (thin metal plates + yellow part)
src_file = "media__1770865585663.jpg" 
# Destination: NEW filename to bust cache
dst_file = "hvac_wide_core_v2.jpg"

src_path = os.path.join(brain_dir, src_file)
dst_path = os.path.join(target_dir, dst_file)

if os.path.exists(src_path):
    shutil.copy(src_path, dst_path)
    print(f"✅ Created {dst_file} from {src_file}")
else:
    print(f"❌ Source file {src_file} not found in {brain_dir}")
