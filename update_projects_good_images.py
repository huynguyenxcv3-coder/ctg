import re

good_images = [
    '/ong-gio-cong-truong-1.png',
    '/ong-gio-cong-truong-2.png',
    '/ong-gio-cong-truong-3.png',
    '/ong-gio-cong-truong-4.png',
    '/ong-gio-cong-truong-5.png',
    '/ong-gio-cong-truong-6.png',
    '/he-thong-ong-gio-cong-truong.png',
    '/thi-cong-ong-gio.png'
]

with open('/home/runner/workspace/cuong-thong-gio/src/pages/projectsData.ts', 'r') as f:
    content = f.read()

lines = content.split('\n')
new_lines = []
img_idx = 0

for line in lines:
    if line.strip().startswith('{ name: '):
        # Remove the old image property if it exists
        line = re.sub(r", image: '[^']+'", "", line)
        # Add new nice image
        img = good_images[img_idx % len(good_images)]
        line = line.replace(' }', f", image: '{img}' }}")
        img_idx += 1
    new_lines.append(line)

with open('/home/runner/workspace/cuong-thong-gio/src/pages/projectsData.ts', 'w') as f:
    f.write('\n'.join(new_lines))
