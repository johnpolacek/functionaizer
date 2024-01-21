import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { initializeS3Client, getCurrentDate } from "../util";

interface Usage {
  usage: number;
}

export const readUsage = async (): Promise<Usage> => {
  const s3: S3Client = initializeS3Client();
  const bucketName = "functionaizer";
  const key = `usage-${getCurrentDate()}.json`;

  try {
    const { Body } = await s3.send(new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    }));

    // Convert Body to string only if it's not undefined
    if (Body) {
      const data = Body instanceof Buffer ? Body.toString('utf-8') : (typeof Body === 'string' ? Body : '');

      // Check if data is not an empty string before parsing
      if (data) {
        return JSON.parse(data);
      }
    }
    
    // Return default if Body is undefined or data is an empty string
    return { usage: 0 };
  } catch (error: unknown) {
    if (typeof error === 'object' && error && 'name' in error && (error as Error).name === 'NoSuchKey') {
      return { usage: 0 };
    }
    throw error;
  }
}
