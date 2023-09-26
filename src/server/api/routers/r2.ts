import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import z from "zod";

export const UploadFileSchema = z
  .object({
    name: z.string()
  })
  .strict();

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string
  }
});

export const r2Router = createTRPCRouter({
  uploadFile: protectedProcedure.input(UploadFileSchema).mutation(async ({ ctx, input }) => {
    const preSignedUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({ Bucket: process.env.R2_UPLOAD_BUCKET, Key: input.name }),
      {
        expiresIn: 3600
      }
    );

    return {
      url: preSignedUrl
    };
  })
});
