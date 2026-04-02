
import os

src_path = r'd:\코딩\EMT\e_catalog.html'
dst_dir = r'd:\코딩\EMT\ko'
dst_path = os.path.join(dst_dir, 'index.html')

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

with open(src_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace assets paths to relative parent directory
content = content.replace('src="assets/', 'src="../assets/')
content = content.replace("src='assets/", "src='../assets/")
content = content.replace('url("assets/', 'url("../assets/')
content = content.replace("url('assets/", "url('../assets/")
content = content.replace('img: "assets/', 'img: "../assets/')
content = content.replace("img: 'assets/", "img: '../assets/")

# Change HTML language attribute
content = content.replace('<html lang="en">', '<html lang="ko">')

with open(dst_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully created Korean version at: {dst_path}")
