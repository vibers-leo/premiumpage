
import os
import json
import glob
from bs4 import BeautifulSoup

# Directory containing HTML files
html_dir = 'public/hstech'
output_file = 'app/templates/hs-tech/product_specs.json'

specs_data = {}

html_files = glob.glob(os.path.join(html_dir, '*.html'))
print(f"Found {len(html_files)} HTML files.")

for file_path in html_files:
    filename = os.path.basename(file_path)
    # Remove extension and normalize
    key = os.path.splitext(filename)[0]
    
    # Also create a normalized key (lowercase, underscore)
    norm_key = key.lower().replace(' ', '_')
    
    # Read file
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            soup = BeautifulSoup(f, 'html.parser')
            
            # Find tables
            tables_data = []
            tables = soup.find_all('table')
            
            for table in tables:
                rows_data = []
                rows = table.find_all('tr')
                for row in rows:
                    cols = row.find_all(['td', 'th'])
                    cols_text = [ele.get_text(strip=True) for ele in cols]
                    if any(cols_text): # Skip empty rows
                        rows_data.append(cols_text)
                if rows_data:
                    tables_data.append(rows_data)
            
            # If no standard tables, try to find "Technical Data" section text block if tables fail? 
            # Or maybe div-based tables?
            # For now, just tables.
            
            if tables_data:
                specs_data[key] = tables_data
                specs_data[norm_key] = tables_data
                print(f"Extracted {len(tables_data)} tables from {filename}")
            else:
                print(f"No tables found in {filename}")
                
    except Exception as e:
        print(f"Error processing {filename}: {e}")

# Save to JSON
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(specs_data, f, indent=2, ensure_ascii=False)

print(f"Saved specs data to {output_file}")
