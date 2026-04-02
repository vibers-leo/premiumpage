from bs4 import BeautifulSoup
import os

html_path = 'public/hstech/HS-TECH.html'
with open(html_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

brands = ['VAISALA', 'SETRA', 'JUMO', 'KNICK']
results = {}

for brand in brands:
    # Find text
    target = soup.find(lambda tag: tag.name in ['span', 'strong', 'p', 'div'] and brand in tag.string if tag.string else False)
    if target:
        # Search for nearby images
        parent = target.parent
        for _ in range(5):
            if parent:
                imgs = parent.find_all('img')
                if imgs:
                    results[brand] = [img['src'] for img in imgs]
                    break
                parent = parent.parent

print(results)
