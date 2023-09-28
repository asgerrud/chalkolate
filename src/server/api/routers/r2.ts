import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import z from "zod";
import { env } from "~/env.mjs";

export const GetSignedUrlSchema = z
  .object({
    fileName: z.string()
  })
  .strict();

export const LoadFileSchema = z
  .object({
    fileName: z.string()
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
  getSignedUrl: protectedProcedure.input(GetSignedUrlSchema).mutation(async ({ input }) => {
    const preSignedUrl = await getSignedUrl(
      S3,
      new PutObjectCommand({ Bucket: process.env.R2_UPLOAD_BUCKET, Key: input.fileName }),
      {
        expiresIn: 3600
      }
    );

    return {
      url: preSignedUrl
    };
  }),
  loadFile: protectedProcedure.input(LoadFileSchema).mutation(async ({ input }) => {
    return {
      url: env.R2_PUBLIC_URL + input.fileName
    };
  })
});
