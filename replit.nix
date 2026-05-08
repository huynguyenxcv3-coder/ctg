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
    pkgs.xorg.xauth
    pkgs.shared-mime-info
    pkgs.hicolor-icon-theme
  ];
}
