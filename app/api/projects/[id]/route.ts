import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface Params {
    id: string;
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { id } = await params;
    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
        return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { title, slug, description, status, techStack, imageUrl, projectUrl, pinned, order } = body;

        const updatedProject = await prisma.project.update({
            where: { id: projectId },
            data: {
                title,
                slug,
                description,
                status,
                techStack,
                imageUrl,
                projectUrl,
                pinned,
                order,
            },
        });

        return NextResponse.json(updatedProject);
    } catch (err: any) {
        if (err.code === "P2002") {
            return NextResponse.json({ error: "Slug already exists" }, { status: 409 });
        }
        if (err.code === "P2025") {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        console.error("project update failed", err);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<Params> }
) {
    const { id } = await params;
    const projectId = parseInt(id, 10);
    if (isNaN(projectId)) {
        return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    try {
        await prisma.project.delete({
            where: { id: projectId },
        });
        return NextResponse.json({ success: true });
    } catch (err: any) {
        if (err.code === "P2025") {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        console.error("project delete failed", err);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
