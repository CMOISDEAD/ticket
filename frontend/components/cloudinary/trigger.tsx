"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { useState } from "react";

export const Trigger = () => {
  const [resource, setResource] = useState();

  return (
    <>
      <CldUploadWidget
        uploadPreset="ml_default"
        onSuccess={(result, { widget }) => {
          // @ts-ignore
          setResource(result?.info); // { public_id, secure_url, etc }
        }}
      >
        {({ open }) => {
          function handleOnClick() {
            setResource(undefined);
            open();
          }
          return <Button onClick={handleOnClick}>Upload an Image</Button>;
        }}
      </CldUploadWidget>
      <button onClick={() => console.log(resource)}>console</button>
    </>
  );
};
