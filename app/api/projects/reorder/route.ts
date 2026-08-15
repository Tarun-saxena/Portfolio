import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json();
        const { orders } = body;

        if (!Array.isArray(orders)) {
            return NextResponse.json({ error: "Invalid orders format" }, { status: 400 });
        }

        // Run updates in a transaction
        await prisma.$transaction(
            orders.map((item: { id: number; order: number }) =>
                prisma.project.update({
                    where: { id: item.id },
                    data: { order: item.order },
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error("batch reorder failed", err);
        return NextResponse.json({ error: "Failed to reorder projects" }, { status: 500 });
    }
}
