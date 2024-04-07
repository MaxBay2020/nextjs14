import {NextRequest} from "next/server";
import connectToDb from "../../../../lib/utils";
import {Post} from "../../../../lib/models";

export const GET = async (_req: NextRequest, context) => {
    const { params: { slug } } = context
    await connectToDb()

    const post = await Post.findOne({ slug })
    return Response.json(post)

}