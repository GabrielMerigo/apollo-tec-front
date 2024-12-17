import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";

type AvatarProps = {
  image: string;
};

export const Avatar: React.FC<AvatarProps> = ({ image }) => {
  const [hasFailed, setHasFailed] = useState(false);

  return hasFailed ? (
    <CgProfile fontSize="24px" color="#2A2A2A" />
  ) : (
    <Image
      src={image}
      roundedCircle
      style={{ width: "24px", height: "24px" }}
      onError={() => setHasFailed(true)}
    />
  );
};
