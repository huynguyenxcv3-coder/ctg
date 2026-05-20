#!/bin/bash

# 1. Tạo thư mục cấu hình SSH
mkdir -p ./ssh_server
cd ./ssh_server

# 2. Tạo Host Keys (Nếu chưa có)
ssh-keygen -f ssh_host_rsa_key -N '' -t rsa
ssh-keygen -f ssh_host_ed25519_key -N '' -t ed25519

# 3. Tạo file cấu hình sshd_config custom
cat > sshd_config <<EOF
Port 2222
HostKey $(pwd)/ssh_host_rsa_key
HostKey $(pwd)/ssh_host_ed25519_key
AuthorizedKeysFile $(pwd)/authorized_keys
PasswordAuthentication yes
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM no
PidFile $(pwd)/sshd.pid
Subsystem sftp /usr/lib/ssh/sftp-server
EOF

# 4. Thiết lập mật khẩu cho phiên làm việc
# Lưu ý: Vì Replit không cho sửa /etc/shadow, ta dùng một mẹo nhỏ 
# là chạy sshd qua một chương trình bọc để xác thực mật khẩu.
# Nhưng cách đơn giản nhất trên Replit là dùng AuthorizedKeys (SSH Key).

echo "Đang khởi động SSH Server ở cổng 2222..."
/usr/sbin/sshd -f $(pwd)/sshd_config -h $(pwd)/ssh_host_rsa_key -D &

echo "Đang tạo đường ống Cloudflare..."
../cloudflared tunnel --url tcp://localhost:2222
