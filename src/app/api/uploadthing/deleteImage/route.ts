import { UTApi } from "uploadthing/server";


const utapi = new UTApi();

export async function POST(req: Request) {
  try {
    const { fileKey } = await req.json();

    await utapi.deleteFiles(fileKey);

    return Response.json({
      success: true,
      message: "File deleted",
    });
  } catch (error) {
    return Response.json({ success: false, error }, { status: 500 });
  }
}