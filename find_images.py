import os
import json

root_dir = '/Users/admin/Desktop/jcatalog/public/hstech'
result = {}

for item in os.listdir(root_dir):
    if item.endswith('_files') and os.path.isdir(os.path.join(root_dir, item)):
        dir_path = os.path.join(root_dir, item)
        images = []
        for f in os.listdir(dir_path):
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
                size = os.path.getsize(os.path.join(dir_path, f))
                if size > 10000: # Filter small icons
                    images.append({'name': f, 'size': size})
        
        # Sort by size desc
        images.sort(key=lambda x: x['size'], reverse=True)
        # Keep top 3
        result[item] = [img['name'] for img in images[:3]]

print(json.dumps(result, indent=2))
