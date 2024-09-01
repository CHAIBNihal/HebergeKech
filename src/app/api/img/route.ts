import formidable, {File} from "formidable";
import fs from "fs/promises";
import { NextApiHandler, NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

import path from "path";


export const  config = {
    api:{
        bodyParser:false,
    },
};


const readFile = (
    req:NextApiRequest,
     saveLocally?:boolean
):Promise<{fields: formidable.Fields; files:formidable.Files}> => {

    const options : formidable.Options = {};
    if(saveLocally){
        options.uploadDir = path.join(process.cwd(), "/public/uploads");
        options.filename = (name, ext, path, form) =>{
            return Date.now().toString() + "_" + path.originalFilename;
        }
    }
    const form = formidable(options)
    return new Promise((resolve, reject)=> {

        form.parse(req, (err, fields, files) => {
            if(err)reject(err)
            resolve({fields, files})
        })
    })
}

export const POST: NextApiHandler = async (req: NextApiRequest) => {
    if (req.method === "POST") {
      try {
        await fs.readdir(path.join(process.cwd() + "/public", "/uploads"));
      } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/uploads"));
      }
  
      try {
        const result = await readFile(req, true);
        NextResponse.json({ done: "ok", result }, {status:200});
      } catch (error:any) {
        NextResponse.json({ error: "Failed to process the file" }, {status:500});
      }
    } else {
     return  NextResponse.json({ error: "Method not allowed" }, {status:405});
    }
  };
  




