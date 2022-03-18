import LogoImage from "assets/logo/logo_color.svg";
import Image from "components/image/image";
import React from "react";

export const RadiColorLogo = () => {
  return (
    <Image
      src={LogoImage}
      alt={"Logo"}
      width={135}
      height={135}
      layout="fixed"
    />
  );
}
