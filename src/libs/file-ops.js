import { s3Client } from "@/utils/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import React from "react";

export async function uploadImage({ key, folder, body }) {
  const buffer = Buffer.from(await body.arrayBuffer());

  try {
    const commannd = new PutObjectCommand({
      Bucket: "zephon-eventmaker",
      Key: `${folder}/${key}`,
      Body: buffer,
      ContentType: body.type,
    });
    const fileUpload = await s3Client.send(commannd);
    console.log(fileUpload);
  } catch (error) {
    console.log(error);
  }
}
