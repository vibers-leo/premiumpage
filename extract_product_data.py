
import os
import re
import json
from bs4 import BeautifulSoup

# Set base directory for HTML files
BASE_DIR = '/Users/admin/Desktop/jcatalog/public/hstech'
OUTPUT_FILE = '/Users/admin/Desktop/jcatalog/extracted_data_full.json'

def clean_text(text):
    if not text: return ""
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_product_data():
    files = [f for f in os.listdir(BASE_DIR) if f.endswith('.html')]
    extracted_data = {}

    for fname in files:
        product_id = fname.replace('.html', '').lower()
        file_path = os.path.join(BASE_DIR, fname)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            soup = BeautifulSoup(content, 'html.parser')
            
            # --- Images ---
            images = []
            # Look for images in widget wrappers
            img_widgets = soup.find_all('div', class_=lambda x: x and 'image' in x and 'widget' in x)
            for w in img_widgets:
                img_tag = w.find('img')
                if img_tag and img_tag.get('src'):
                    src = img_tag['src']
                    if src.startswith('./'):
                        src = '/hstech/' + src[2:]
                    elif not src.startswith('/'):
                        src = '/hstech/' + src
                    # Filter out likely icons/logos
                    if 'icon' not in src.lower() and 'logo' not in src.lower():
                        images.append(src)
            
            main_image = images[0] if images else ""

            # --- Description ---
            description = []
            text_widgets = soup.find_all('div', class_='widget_text_wrap')
            for w in text_widgets:
                text = w.get_text(" ", strip=True)
                # Filter out navigation breadcrumbs and common footer junk
                if any(x in text for x in ["Home >", "Copyright", "Contact Us", "Company Registration", "HS TECH", "Inquiry:"]):
                    # If it's short and contains these, skip. If it's long, might be mixed.
                    # Usually "Home > Product..." is its own widget.
                    if len(text) < 100: continue
                    
                    # If it is long but starts with Breadcrumbs, try to strip them
                    if text.startswith("Home >"):
                        parts = text.split(">")
                        if len(parts) > 3:
                            # Try to find the actual description after the breadcrumb title
                            # This is fuzzy, so maybe just take the clean text if it's long enough
                            pass

                if "PRODUCT" in text and len(text) < 50: continue # Header only
                
                # Check for substantial content
                if len(text) > 40:
                    description.append(clean_text(text))
            
            # Join top paragraph(s)
            full_desc = "\n\n".join(description[:5])
            
            # Basic cleanup of description
            full_desc = full_desc.replace("Home > Product >", "")
            full_desc = re.sub(r'HS TECH.*Co\.,.*Ltd', '', full_desc, flags=re.IGNORECASE)
            
            # --- Technical Specifications ---
            specs = []
            
            # Strategy 1: The 'tg' table (Technical Data)
            tg_tables = soup.find_all('table', class_='tg')
            for table in tg_tables:
                # Iterate rows
                for row in table.find_all('tr'):
                    cells = row.find_all(['td', 'th'])
                    # We are looking for cells that contain "ranges", "output", "accuracy" etc.
                    # Or key-value pairs in columns.
                    row_text = [clean_text(c.get_text(" ", strip=True)) for c in cells]
                    
                    # Check for keywords in ANY cell
                    keywords = {
                        'Output': ['output', 'analog output', 'current output'],
                        'Range': ['measurement range', 'rh range', 'temp range', 'range'],
                        'Accuracy': ['accuracy'],
                        'Power': ['power supply', 'operating voltage'],
                        'Temperature': ['temperature', 'operating temp'],
                        'Pressure': ['pressure'],
                        'Dimensions': ['dimensions', 'size', 'diameter'],
                        'IP Rating': ['ip rating', 'housing'],
                        'Interface': ['interface', 'rs-485', 'rs-232']
                    }
                    
                    for cell_content in row_text:
                        # Split by newline or bullet points if possible
                        lines = re.split(r'[:▪■\n]', cell_content)
                        for line in lines:
                            line = clean_text(line)
                            if not line: continue
                            
                            for label, trigger_words in keywords.items():
                                # Check if line starts with a trigger word
                                low_line = line.lower()
                                if any(low_line.startswith(t) for t in trigger_words):
                                    # Found a potential spec line!
                                    # Extract value
                                    val = line
                                    for t in trigger_words:
                                        if low_line.startswith(t):
                                            val = line[len(t):].strip()
                                            break
                                    
                                    # Further cleanup value
                                    val = val.lstrip(':').strip()
                                    if val and len(val) < 100: # Reasonable length
                                         if not any(s['label'] == label for s in specs):
                                            specs.append({'label': label, 'value': val})
            
            # Strategy 2: Text scraping if table didn't yield much
            if len(specs) < 2:
                all_text = soup.get_text("\n", strip=True).split('\n')
                current_spec_label = None
                
                keywords_plain = ['Output', 'Range', 'Accuracy', 'Temperature', 'Pressure', 'Power', 'Dimensions', 'IP Rating']
                
                for line in all_text:
                    line = clean_text(line)
                    if not line: continue
                    
                    # Ignore common footer junk
                    if "Transformer" in line and "Power" in line: continue # filter bad data
                    
                    for kw in keywords_plain:
                        if line.startswith(kw) or (f"{kw}:" in line):
                             # Try to split
                             parts = line.split(':', 1)
                             if len(parts) == 2:
                                 val = parts[1].strip()
                                 if val and len(val) < 100:
                                     if not any(s['label'] == kw for s in specs):
                                         specs.append({'label': kw, 'value': val})
                             elif len(line) < 60:
                                 # Maybe the value is on next line? Or inline?
                                 # Heuristic: "Output 4...20mA"
                                 val = line.replace(kw, '').strip()
                                 if val:
                                      if not any(s['label'] == kw for s in specs):
                                         specs.append({'label': kw, 'value': val})
            
            # Filter out "Power: Transformer" explicitly as it appeared erroneously
            specs = [s for s in specs if not (s['label'] == 'Power' and 'Transformer' in s['value'])]

            extracted_data[product_id] = {
                'id': product_id,
                'image': main_image,
                'desc': full_desc[:500] + "..." if len(full_desc) > 500 else full_desc,
                'specs': specs
            }

        except Exception as e:
            print(f"Error processing {fname}: {e}")

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(extracted_data, f, indent=2, ensure_ascii=False)
    
    print(f"Refined extraction for {len(extracted_data)} products to {OUTPUT_FILE}")

if __name__ == "__main__":
    extract_product_data()
