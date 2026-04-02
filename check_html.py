
import sys

def check_divs(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    # Simple stack-based tracker
    stack = []
    lines = content.splitlines()
    for i, line in enumerate(lines):
        # Find all tags
        import re
        tags = re.findall(r'<(div|/div|main|/main|section|/section|ul|/ul|li|/li)', line)
        for tag in tags:
            if tag.startswith('/'):
                if not stack:
                    print(f"Error: Unexpected closing tag <{tag}> at line {i+1}")
                else:
                    opening = stack.pop()
                    if opening != tag[1:]:
                        print(f"Error: Mismatched tag <{tag}> at line {i+1}, expected </{opening}>")
            else:
                stack.append(tag)
    
    print(f"Finished checking. Stack size at end: {len(stack)}")
    if stack:
        print(f"Unclosed tags: {stack}")

if __name__ == "__main__":
    check_divs('ko/index.html')
