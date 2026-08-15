import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashIp } from "@/lib/hash-ip";

export async function POST(req: NextRequest) {
    const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        req.headers.get("x-real-ip") ??
        "unknown";

    const ipHash = hashIp(ip);

    try {
        await prisma.uniqueVisitor.upsert({
            where: { ipHash },
            update: {},
            create: { ipHash },
        });
    } catch (err) {
        console.error("visitor upsert failed", err);
    }

    const count = await prisma.uniqueVisitor.count();
    return NextResponse.json({ count });
}

export async function GET() {
    const count = await prisma.uniqueVisitor.count();
    return NextResponse.json({ count });
}