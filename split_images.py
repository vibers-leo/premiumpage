from PIL import Image
import os
import sys

# Input file path (Fixed)
input_path = "/Users/admin/.gemini/antigravity/brain/b62bd3fa-cc93-4c90-8722-af4f52b556b9/media__1770859223701.png"
output_dir = "/Users/admin/Desktop/jcatalog/public/templates/hangseong/images/products"

# Create output directory if not exists
os.makedirs(output_dir, exist_ok=True)

try:
    print(f"📂 Opening image: {input_path}")
    # Open the image
    img = Image.open(input_path)
    width, height = img.size
    print(f"ℹ️ Image size: {width}x{height}")

    # Crop dimensions (2x2 grid)
    mid_x = width // 2
    mid_y = height // 2

    # Top Left
    img_tl = img.crop((0, 0, mid_x, mid_y))
    # Top Right
    img_tr = img.crop((mid_x, 0, width, mid_y))
    # Bottom Left
    img_bl = img.crop((0, mid_y, mid_x, height))
    # Bottom Right
    img_br = img.crop((mid_x, mid_y, width, height))

    # Save images
    img_tl.save(f"{output_dir}/hvac_case_01.png")
    img_tr.save(f"{output_dir}/hvac_cover_02.png")
    img_bl.save(f"{output_dir}/hvac_bracket_03.png")
    img_br.save(f"{output_dir}/hvac_core_04.png")

    print(f"✅ Images successfully split and saved to {output_dir}")

except FileNotFoundError:
    print(f"❌ Error: Could not find image at {input_path}")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error during processing: {e}")
    sys.exit(1)
