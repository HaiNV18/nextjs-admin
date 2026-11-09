import { MongoClient, Db } from "mongodb";

// Giữ kết nối trong biến global để tránh tạo lại nhiều lần
const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
};

export async function getDb(): Promise<Db> {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;

    if (!uri) {
        throw new Error("Vui lòng cấu hình biến môi trường MONGODB_URI trong .env.local hoặc trên Render");
    }

    if (!globalWithMongo._mongoClientPromise) {
        const client = new MongoClient(uri);
        globalWithMongo._mongoClientPromise = client.connect();
    }

    const client = await globalWithMongo._mongoClientPromise;
    return client.db(dbName);
}
