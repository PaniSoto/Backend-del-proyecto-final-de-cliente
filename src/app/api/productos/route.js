import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request, { params }) {
    const search = request.nextUrl.searchParams.get("search") || "";
    const categoria = request.nextUrl.searchParams.get("categoria");
    const sexo = request.nextUrl.searchParams.get("sexo");

    console.log({ search, categoria, sexo });

    const { database } = await connectToDatabase();
    const collection = database.collection(process.env.MONGODB_COLLECTION_PRODUCTOS);

    const filtro = {
        nombre: { $regex: `.*${search}.*`, $options: "i" },
    };

    if (categoria) {
        filtro.categoria = categoria;
    }

    if (sexo) {
        filtro.sexo = sexo;
    }

    const results = await collection.find(filtro).toArray();

    console.log(results);

    return Response.json(results);
}