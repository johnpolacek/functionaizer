import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { initializeS3Client, getCurrentDate, streamToString } from "../util";
import { json } from "stream/consumers";

interface Usage {
  usage: number;
}

export const increaseUsage = async (): Promise<Usage> => {
  const s3: S3Client = initializeS3Client();
  const bucketName = "functionaizer";
  const key = `usage-${getCurrentDate()}.json`;

  // Try to read the current usage
  try {
    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    let usage = 0
    const { Body } = await s3.send(getCommand);
    if (Body) {
      const data = Body instanceof Buffer ? Body.toString('utf-8') : (typeof Body === 'string' ? Body : '');
      if (data) {
        const jsonData = JSON.parse(data);
        usage = jsonData.usage || 0
      }
    }

    // Increase usage
    usage++

    // Write back the updated usage
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: JSON.stringify({usage}),
    });

    await s3.send(putCommand);
    return { usage }
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'NoSuchKey') {
      // If no usage data for today, start with 1
      const newUsage: Usage = { usage: 1 };
      const putCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: JSON.stringify(newUsage),
      });

      await s3.send(putCommand);
      console.log("usage increase", {newUsage})
      return newUsage;
    }
    // If the error is not of type Error or not a NoSuchKey error, rethrow it
    throw error;
  }
}
