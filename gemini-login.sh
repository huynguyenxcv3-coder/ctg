#!/bin/bash
echo "====================================="
echo "  GEMINI CLI LOGIN HELPER"
echo "====================================="
echo ""
echo "Dang khoi dong trinh dang nhap Gemini..."
echo "Khi xuat hien URL, hay sao chep URL do va mo tren dien thoai/may tinh khac."
echo ""
echo "Sau khi dang nhap thanh cong, nhan Enter tai day."
echo "-------------------------------------"
echo ""

gemini

echo ""
echo "Dang luu credentials..."
bash /home/runner/workspace/gemini-save.sh
echo ""
echo "Hoan tat! Lan sau mo shell chi can chay: bash gemini-restore.sh"
