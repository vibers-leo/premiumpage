
import re

def analyze_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.splitlines()
    slide_starts = []
    for i, line in enumerate(lines):
        if 'class="slide' in line and '<div' in line:
            slide_starts.append(i + 1)
    
    print(f"Total Slides found by start tag: {len(slide_starts)}")
    for start in slide_starts:
        print(f"Slide starts at line {start}: {lines[start-1].strip()}")

analyze_html('ko/index.html')
