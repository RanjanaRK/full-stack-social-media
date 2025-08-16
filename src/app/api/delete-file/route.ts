import { NextResponse } from "next/server";
// import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const fileId = body.fileId;

    if (!fileId || typeof fileId !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid object key" },
        { status: 400 }
      );
    }

    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

    console.log(privateKey);

    if (!privateKey) {
      throw new Error("IMAGEKIT_PRIVATE_KEY is not set");
    }
    const basicAuth = Buffer.from(`${privateKey}:`).toString("base64");

    const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${basicAuth}`,

        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = await response.json();
      return NextResponse.json(
        {
          error: errorBody.message || "ImageKit deletion failed",
          details: errorBody,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "File deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete file." },
      { status: 500 }
    );
  }
}
