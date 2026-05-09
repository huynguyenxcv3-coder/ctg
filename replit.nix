{ pkgs }: {
  deps = [
    pkgs.nano
    pkgs.novnc
    pkgs.python311Packages.websockify
    pkgs.tigervnc
    pkgs.fluxbox
    pkgs.chromium
    pkgs.xterm
    pkgs.xorg.xorgserver
    pkgs.xorg.xinit
    pkgs.xorg.xauth
    pkgs.xorg.xset
    pkgs.shared-mime-info
    pkgs.hicolor-icon-theme
  ];
}
