export const transferImageToS3 = async (
  imageUrl: string,
  key: string
): Promise<string> => {
  try {
    // Download the image from the URL
    console.log("Downloading image from URL:", imageUrl)
    const response = await fetch(imageUrl)
    console.log("Image downloaded successfully")
    const arrayBuffer = await response.arrayBuffer()

    // Prepare the parameters for uploading to S3
    const params = {
      Bucket: BUCKET,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType:
        response.headers.get("content-type") || "application/octet-stream",
      ContentLength: parseInt(
        response.headers.get("content-length") || "0",
        10
      ),
    }

    console.log("Prepare for upload to S3")

    // Upload the image to the S3 bucket
    await s3.upload(params).promise()

    console.log("Upload complete")

    // Construct the public URL for the image
    const publicUrl = `https://${BUCKET}.s3.amazonaws.com/${key}`
    console.log("Image uploaded successfully:", publicUrl)
    return publicUrl
  } catch (error) {
    console.error("Error uploading image to S3:", error)
    throw new Error("Error uploading image to S3")
  }
}
