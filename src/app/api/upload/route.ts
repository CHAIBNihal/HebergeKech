import fs from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const formDataEntryValues = Array.from(formData.values());
  const filePaths: string[] = [];

  for (const formDataEntryValue of formDataEntryValues) {
    if (
      typeof formDataEntryValue === "object" &&
      "arrayBuffer" in formDataEntryValue
    ) {
      const file = formDataEntryValue as unknown as Blob;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = `public/${file.name}`;
      fs.writeFileSync(filePath, buffer);
      filePaths.push(filePath.split('public/')[1]);
    }
  }

  return NextResponse.json({
    success: true,
    message: "Files uploaded successfully",
    paths: filePaths, // Chemins des fichiers créés
  });
}
