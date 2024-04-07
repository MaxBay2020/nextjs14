import {NextRequest, NextResponse} from "next/server";
import connectToDb from "../../../lib/utils";
import {Post} from "../../../lib/models";

export const GET = async (req: NextRequest) => {
    await connectToDb()

    const posts = await Post.find()
    return Response.json(posts)
}