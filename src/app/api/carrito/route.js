import { connectToDatabase } from "@/lib/mongodb";

export async function OPTIONS(request) {
    return new Response("OK", { status: 200 });
}

export async function GET(request, { params }) {
    const search = request.nextUrl.searchParams.get("search");

    console.log(search);

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION_PRODUCTOS);

    const results = await collection.find({ nombre: { $regex: `.*${search}.*`, $options: "i" } }).toArray();

    console.log(results);

    return Response.json(results);
}