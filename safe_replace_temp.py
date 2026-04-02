
import os

files = [
    "/Users/admin/Desktop/jcatalog/extracted_data.json",
    "/Users/admin/Desktop/jcatalog/app/templates/hs-tech/data.ts",
    "/Users/admin/Desktop/jcatalog/app/templates/hs-tech/page.tsx"
]

def run():
    for file_path in files:
        if not os.path.exists(file_path):
            print(f"Skipping {file_path} (not found)")
            continue

        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace " °C" -> "℃"
            # Replace "°C" -> "℃"
            # Characters: \u00B0 is degree, \u2103 is ℃
            
            new_content = content.replace(" \u00B0C", "\u2103").replace("\u00B0C", "\u2103")
            
            if content != new_content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {file_path}")
            else:
                print(f"No changes in {file_path}")
                
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

if __name__ == "__main__":
    run()
