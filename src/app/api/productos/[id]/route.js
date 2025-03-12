import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb"; 

export async function OPTIONS(request) {
    return new Response("OK", { status: 200 });
}

export async function GET(request, { params }) {
    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION_PRODUCTOS);

    const { id } = await params
    const results = await collection.find({ _id: new ObjectId(id) }).toArray();

    return Response.json(results[0]);
}