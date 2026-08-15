"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    status: string;
    techStack: string[];
    imageUrl: string | null;
    projectUrl: string | null;
    pinned: boolean;
    order: number;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Modal Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formTitle, setFormTitle] = useState("");
    const [formSlug, setFormSlug] = useState("");
    const [formDescription, setFormDescription] = useState("");
    const [formStatus, setFormStatus] = useState("live");
    const [formTechStack, setFormTechStack] = useState("");
    const [formImageUrl, setFormImageUrl] = useState("");
    const [formProjectUrl, setFormProjectUrl] = useState("");
    const [formPinned, setFormPinned] = useState(false);
    const [formOrder, setFormOrder] = useState(0);
    const [formError, setFormError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Fetch projects
    async function loadProjects() {
        try {
            setIsLoading(true);
            const res = await fetch("/api/projects");
            if (!res.ok) throw new Error("Failed to fetch projects");
            const data = await res.json();
            // Sort by pinned desc, order asc, createdAt desc
            setProjects(data);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadProjects();
    }, []);

    // Auto-generate slug from title if not manually edited
    useEffect(() => {
        if (!editingProject) {
            const generated = formTitle
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");
            setFormSlug(generated);
        }
    }, [formTitle, editingProject]);

    // Open modal for add
    function openAddModal() {
        setEditingProject(null);
        setFormTitle("");
        setFormSlug("");
        setFormDescription("");
        setFormStatus("live");
        setFormTechStack("");
        setFormImageUrl("");
        setFormProjectUrl("");
        setFormPinned(false);
        // Default order to next slot
        const maxOrder = projects.reduce((max, p) => (p.order > max ? p.order : max), -1);
        setFormOrder(maxOrder + 1);
        setFormError("");
        setIsModalOpen(true);
    }

    // Open modal for edit
    function openEditModal(project: Project) {
        setEditingProject(project);
        setFormTitle(project.title);
        setFormSlug(project.slug);
        setFormDescription(project.description);
        setFormStatus(project.status);
        setFormTechStack(project.techStack.join(", "));
        setFormImageUrl(project.imageUrl || "");
        setFormProjectUrl(project.projectUrl || "");
        setFormPinned(project.pinned);
        setFormOrder(project.order);
        setFormError("");
        setIsModalOpen(true);
    }

    // Save project
    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setFormError("");
        setIsSaving(true);

        const techArray = formTechStack
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);

        const bodyData = {
            title: formTitle,
            slug: formSlug,
            description: formDescription,
            status: formStatus,
            techStack: techArray,
            imageUrl: formImageUrl || null,
            projectUrl: formProjectUrl || null,
            pinned: formPinned,
            order: Number(formOrder),
        };

        try {
            const url = editingProject ? `/api/projects/${editingProject.id}` : "/api/projects";
            const method = editingProject ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to save project");
            }

            setIsModalOpen(false);
            loadProjects();
        } catch (err: any) {
            setFormError(err.message || "Something went wrong");
        } finally {
            setIsSaving(false);
        }
    }

    // Delete project
    async function handleDelete(id: number) {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to delete project");
            }
            loadProjects();
        } catch (err: any) {
            alert(err.message);
        }
    }

    // Toggle Pin status
    async function handleTogglePin(project: Project) {
        try {
            const res = await fetch(`/api/projects/${project.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pinned: !project.pinned }),
            });
            if (!res.ok) throw new Error("Failed to update pin status");
            loadProjects();
        } catch (err: any) {
            alert(err.message);
        }
    }

    // Batch save order
    async function saveNewOrder(updatedList: Project[]) {
        try {
            const res = await fetch("/api/projects/reorder", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orders: updatedList.map((p, idx) => ({ id: p.id, order: idx })),
                }),
            });
            if (!res.ok) throw new Error("Failed to save reorder changes");
            loadProjects();
        } catch (err: any) {
            alert(err.message);
        }
    }

    // Move Up/Down in list
    async function handleMove(index: number, direction: -1 | 1) {
        const nextIndex = index + direction;
        if (nextIndex < 0 || nextIndex >= projects.length) return;

        const reordered = [...projects];
        const temp = reordered[index];
        reordered[index] = reordered[nextIndex];
        reordered[nextIndex] = temp;

        setProjects(reordered);
        await saveNewOrder(reordered);
    }

    // Logout
    async function handleLogout() {
        try {
            const res = await fetch("/api/admin/logout", { method: "POST" });
            if (res.ok) {
                router.push("/admin/login");
            } else {
                alert("Logout failed");
            }
        } catch (err) {
            console.error("Logout failed", err);
        }
    }

    // HTML5 Drag and Drop handlers
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    function handleDragStart(e: React.DragEvent, index: number) {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
    }

    function handleDragOver(e: React.DragEvent, index: number) {
        e.preventDefault();
    }

    async function handleDrop(e: React.DragEvent, targetIndex: number) {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === targetIndex) return;

        const reordered = [...projects];
        const draggedItem = reordered[draggedIndex];
        reordered.splice(draggedIndex, 1);
        reordered.splice(targetIndex, 0, draggedItem);

        setDraggedIndex(null);
        setProjects(reordered);
        await saveNewOrder(reordered);
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col font-sans">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-violet-500 animate-pulse"></span>
                    <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent">
                        Portfolio Admin
                    </h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-sm font-medium transition duration-200"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </header>

            {/* Main Area */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Projects Directory</h2>
                        <p className="text-sm text-zinc-400">Manage, sort, and highlight projects displayed on your portfolio.</p>
                    </div>
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2.5 rounded-xl font-semibold shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 hover:-translate-y-0.5 transition duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Project
                    </button>
                </div>

                {error && (
                    <div className="bg-rose-950/30 border border-rose-900 text-rose-300 px-4 py-3.5 rounded-xl mb-6 flex items-start gap-3">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3 text-zinc-400">
                        <span className="w-8 h-8 rounded-full border-2 border-zinc-700 border-t-violet-500 animate-spin"></span>
                        <p className="text-sm">Fetching projects...</p>
                    </div>
                ) : projects.length === 0 ? (
                    <div className="border border-zinc-800 border-dashed rounded-2xl p-12 text-center flex flex-col items-center gap-4 bg-zinc-900/10">
                        <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800 text-zinc-500">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">No projects yet</h3>
                            <p className="text-sm text-zinc-400 mt-1">Get started by creating your first portfolio showcase.</p>
                        </div>
                        <button
                            onClick={openAddModal}
                            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:border-zinc-600 px-4 py-2 rounded-lg font-medium transition"
                        >
                            Create Project
                        </button>
                    </div>
                ) : (
                    <div className="border border-zinc-800 bg-zinc-900/20 rounded-2xl overflow-hidden backdrop-blur-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider bg-zinc-900/30">
                                        <th className="py-3.5 px-4 w-12 text-center">Sort</th>
                                        <th className="py-3.5 px-6">Project Title</th>
                                        <th className="py-3.5 px-6">Status</th>
                                        <th className="py-3.5 px-6">Pin</th>
                                        <th className="py-3.5 px-6">Order</th>
                                        <th className="py-3.5 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project, index) => (
                                        <tr
                                            key={project.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, index)}
                                            onDragOver={(e) => handleDragOver(e, index)}
                                            onDrop={(e) => handleDrop(e, index)}
                                            className="border-b border-zinc-850 hover:bg-zinc-900/40 transition duration-150 group cursor-grab active:cursor-grabbing"
                                        >
                                            {/* Handle & Manual Sort */}
                                            <td className="py-4 px-4 text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <button
                                                        onClick={() => handleMove(index, -1)}
                                                        disabled={index === 0}
                                                        className="text-zinc-600 hover:text-zinc-300 disabled:opacity-0 p-0.5 transition"
                                                        title="Move Up"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                                                        </svg>
                                                    </button>
                                                    <div className="text-zinc-600 group-hover:text-zinc-400 p-0.5 cursor-grab">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                                        </svg>
                                                    </div>
                                                    <button
                                                        onClick={() => handleMove(index, 1)}
                                                        disabled={index === projects.length - 1}
                                                        className="text-zinc-600 hover:text-zinc-300 disabled:opacity-0 p-0.5 transition"
                                                        title="Move Down"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>

                                            {/* Project Info */}
                                            <td className="py-4 px-6">
                                                <div className="font-semibold text-zinc-100">{project.title}</div>
                                                <div className="text-xs text-zinc-500 font-mono mt-0.5">/{project.slug}</div>
                                            </td>

                                            {/* Status badge */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                                    project.status === "live"
                                                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                        : project.status === "building"
                                                        ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                                        : "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
                                                }`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${
                                                        project.status === "live"
                                                            ? "bg-emerald-400"
                                                            : project.status === "building"
                                                            ? "bg-amber-400"
                                                            : "bg-zinc-400"
                                                    }`}></span>
                                                    {project.status === "live"
                                                        ? "Live"
                                                        : project.status === "building"
                                                        ? "Building"
                                                        : "Not Started"
                                                    }
                                                </span>
                                            </td>

                                            {/* Pinned toggle */}
                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => handleTogglePin(project)}
                                                    className={`transition p-1.5 rounded-lg border ${
                                                        project.pinned
                                                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                                                            : "bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-zinc-400 hover:border-zinc-700"
                                                    }`}
                                                    title={project.pinned ? "Unpin from home" : "Pin to home"}
                                                >
                                                    <svg className="w-4 h-4" fill={project.pinned ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.243.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                    </svg>
                                                </button>
                                            </td>

                                            {/* Order value */}
                                            <td className="py-4 px-6 font-mono text-sm text-zinc-500">
                                                {project.order}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => openEditModal(project)}
                                                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition"
                                                        title="Edit project"
                                                    >
                                                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
                                                        className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/20 rounded-lg transition"
                                                        title="Delete project"
                                                    >
                                                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col my-8">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                            <h3 className="text-lg font-bold">
                                {editingProject ? "Edit Showcase Project" : "Add Showcase Project"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-500 hover:text-zinc-300 transition"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSave} className="p-6 flex flex-col gap-4.5 overflow-y-auto">
                            {formError && (
                                <div className="bg-rose-950/20 border border-rose-900 text-rose-300 p-3 rounded-lg text-sm">
                                    {formError}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                    Project Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    placeholder="My Awesome App"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 transition outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                    Slug *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formSlug}
                                    onChange={(e) => setFormSlug(e.target.value)}
                                    placeholder="my-awesome-app"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 font-mono text-sm transition outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    placeholder="Provide a clean description of your project highlights and achievements..."
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 text-sm transition outline-none resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                        Development Status
                                    </label>
                                    <select
                                        value={formStatus}
                                        onChange={(e) => setFormStatus(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-3.5 py-2.5 text-zinc-100 transition outline-none"
                                    >
                                        <option value="live">Live / Production</option>
                                        <option value="building">In Development</option>
                                        <option value="not_started">Concept / Not Started</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                        Sort Order Value
                                    </label>
                                    <input
                                        type="number"
                                        value={formOrder}
                                        onChange={(e) => setFormOrder(Number(e.target.value))}
                                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-3.5 py-2.5 text-zinc-100 font-mono transition outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                    Tech Stack (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={formTechStack}
                                    onChange={(e) => setFormTechStack(e.target.value)}
                                    placeholder="nextjs, typescript, tailwind, prisma, postgres"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 transition outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    value={formImageUrl}
                                    onChange={(e) => setFormImageUrl(e.target.value)}
                                    placeholder="https://myphoto.com/image.png"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 text-sm transition outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
                                    Project URL
                                </label>
                                <input
                                    type="text"
                                    value={formProjectUrl}
                                    onChange={(e) => setFormProjectUrl(e.target.value)}
                                    placeholder="https://myproject.com"
                                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 text-sm transition outline-none"
                                />
                            </div>

                            <div className="flex items-center gap-2.5 py-1">
                                <input
                                    type="checkbox"
                                    id="pinned"
                                    checked={formPinned}
                                    onChange={(e) => setFormPinned(e.target.checked)}
                                    className="h-4.5 w-4.5 rounded border-zinc-800 bg-zinc-950 text-violet-600 focus:ring-violet-500/20"
                                />
                                <label htmlFor="pinned" className="text-sm text-zinc-300 select-none cursor-pointer">
                                    Pin this project to home page highlight list
                                </label>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex items-center justify-end gap-3 mt-4 border-t border-zinc-800 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 rounded-xl text-zinc-300 hover:text-white transition font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold shadow-lg shadow-violet-600/20 hover:shadow-violet-600/30 transition disabled:opacity-55 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? "Saving..." : "Save Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
