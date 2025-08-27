import { ImgHTMLAttributes } from "react";

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/Logo KFA member of BioFarma 300x300-01.png"
      alt="Logo"
      {...props} // biar bisa kasih className, width, height, dll dari luar
    />
  );
}
