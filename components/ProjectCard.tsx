import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/projectsRepo";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link href={`/p/${project.slug}`} className="premium-card">
            <div style={{ position: "relative", width: "100%", aspectRatio: "3/2" }}>
                <Image
                    src={project.coverImage.url}
                    alt={project.coverImage.alt}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={true}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        background: "rgba(0,0,0,0.5)",
                        backdropFilter: "blur(4px)",
                        color: "white",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                    }}
                >
                    {project.locationGu}
                </div>
            </div>
            <div style={{ padding: "1.5rem" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.5rem",
                    }}
                >
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>{project.title}</h3>
                    <span style={{ color: "var(--primary)", fontWeight: "700" }}>
                        {project.sizePy}평
                    </span>
                </div>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "1rem" }}>
                    {project.summary}
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                    }}
                >
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            style={{
                                fontSize: "0.75rem",
                                padding: "0.2rem 0.5rem",
                                background: "var(--accent)",
                                borderRadius: "4px",
                                color: "var(--text-muted)",
                            }}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}
