import re

images = [
    '/project-7.jpg', '/project-8.jpg', '/project-9.jpg', '/project-10.jpg',
    '/project-14.jpg', '/project-15.jpg', '/project-16.jpg', '/project-17.jpg',
    '/project-18.jpg', '/project-19.jpg', '/project-32.jpg', '/project-36.jpg',
    '/project-37.jpg', '/project-38.jpg', '/project-65.jpg', '/project-66.jpg',
    '/project-68.jpg', '/project-69.jpg', '/project-70.jpg', '/project-72.jpg',
    '/project-73.jpg', '/project-74.jpg', '/project-75.jpg', '/project-77.jpg',
    '/project-78.jpg', '/project-79.jpg', '/project-80.jpg', '/project-81.jpg',
    '/project-82.jpg', '/project-83.jpg', '/project-84.jpg', '/project-85.jpg'
]

with open('/home/runner/workspace/cuong-thong-gio/src/pages/projectsData.ts', 'r') as f:
    content = f.read()

# Update TrackRecordItem interface
content = content.replace(
    'export interface TrackRecordItem {\n  name: string\n  scale: string\n}',
    'export interface TrackRecordItem {\n  name: string;\n  scale: string;\n  image?: string;\n}'
)

lines = content.split('\n')
new_lines = []
img_idx = 0
for line in lines:
    if line.strip().startswith('{ name: '):
        if img_idx < len(images):
            # insert image before closing bracket
            line = line.replace(' }', f", image: '{images[img_idx]}' }}")
            img_idx += 1
    new_lines.append(line)

with open('/home/runner/workspace/cuong-thong-gio/src/pages/projectsData.ts', 'w') as f:
    f.write('\n'.join(new_lines))
