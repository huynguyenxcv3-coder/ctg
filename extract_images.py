import sys

def extract_images(filename):
    with open(filename, 'rb') as f:
        data = f.read()

    # Find JPEGs
    start = 0
    count = 1
    while True:
        start = data.find(b'\xff\xd8\xff', start)
        if start == -1:
            break
        # Find end of JPEG
        end = data.find(b'\xff\xd9', start)
        if end == -1:
            break
        end += 2
        
        with open(f'/home/runner/workspace/cuong-thong-gio/public/project-{count}.jpg', 'wb') as img:
            img.write(data[start:end])
        print(f"Extracted project-{count}.jpg")
        count += 1
        start = end

    # Find PNGs
    start = 0
    while True:
        start = data.find(b'\x89PNG\r\n\x1a\n', start)
        if start == -1:
            break
        # PNG has IEND chunk at the end: IEND\xaeB`\x82 (or similar, 4 bytes crc)
        end = data.find(b'IEND', start)
        if end == -1:
            break
        end += 8 # IEND + 4 bytes crc
        
        with open(f'/home/runner/workspace/cuong-thong-gio/public/project-{count}.png', 'wb') as img:
            img.write(data[start:end])
        print(f"Extracted project-{count}.png")
        count += 1
        start = end

extract_images('/home/runner/workspace/ctg/Ho-So-Nang-Luc-_CTG.doc')
