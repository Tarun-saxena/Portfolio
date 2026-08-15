import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Public — anyone can fetch the project list
export async function GET() {
    const projects = await prisma.project.findMany({
        orderBy: [{ pinned: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(projects);
}

// Protected by middleware — only reachable with valid admin cookie
export async function POST(req: NextRequest) {
    const body = await req.json();

    const { title, slug, description, status, techStack, imageUrl, projectUrl, pinned, order } = body;

    if (!title || !slug || !description || !status) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        const project = await prisma.project.create({
            data: {
                title,
                slug,
                description,
                status,
                techStack: techStack ?? [],
                imageUrl,
                projectUrl,
                pinned: pinned ?? false,
                order: order ?? 0,
            },
        });
        return NextResponse.json(project, { status: 201 });
    } catch (err: any) {
        if (err.code === "P2002") {
            return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
        }
        console.error("project create failed", err);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}