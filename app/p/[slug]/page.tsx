import { getProjectBySlug } from "@/lib/projectsRepo";
import SmsShareButton from "@/components/SmsShareButton";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const p = getProjectBySlug(slug);
    if (!p) return {};

    const title = `${p.sizePy ? `${p.sizePy}평 ` : ""}${p.title} | An_DesignECO`;
    const desc = `현장: ${p.locationGu} · ${p.costDisplay} · ${p.durationDisplay} · ${p.summary}`;

    return {
        title,
        description: desc,
        openGraph: {
            title,
            description: desc,
            images: [{ url: p.coverImage.url, width: 1200, height: 630 }],
            type: "article",
        },
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const p = getProjectBySlug(slug);
    if (!p) return notFound();

    const shareUrl = `https://an-design-match.vercel.app/p/${p.slug}`; // 임시 도메인

    return (
        <main style={{ minHeight: "100vh", paddingBottom: "80px" }}>
            <header className="glass-nav">
                <div className="container" style={{ height: "60px", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Link href="/" style={{ color: "var(--text-muted)", fontSize: "1.25rem" }}>←</Link>
                    <h1 style={{ fontSize: "1.125rem", fontWeight: "700" }}>An_DesignECO</h1>
                </div>
            </header>

            <article className="container" style={{ paddingTop: "80px" }}>
                {/* Project Header */}
                <div style={{ marginBottom: "2.5rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                        {p.tags.map(tag => (
                            <span key={tag} style={{ color: "var(--primary)", fontWeight: "600", fontSize: "0.875rem" }}>#{tag}</span>
                        ))}
                    </div>
                    <h2 style={{ fontSize: "2rem", fontWeight: "800", marginBottom: "1.5rem", lineHeight: "1.2" }}>{p.title}</h2>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "1rem",
                        padding: "1.5rem",
                        background: "var(--accent)",
                        borderRadius: "16px"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: "0.25rem" }}>전용면적</p>
                            <p style={{ fontWeight: "700" }}>{p.sizePy}평</p>
                        </div>
                        <div style={{ textAlign: "center", borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: "0.25rem" }}>예상 견적</p>
                            <p style={{ fontWeight: "700" }}>{p.costDisplay}</p>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginBottom: "0.25rem" }}>공사 기간</p>
                            <p style={{ fontWeight: "700" }}>{p.durationDisplay}</p>
                        </div>
                    </div>
                </div>

                {/* Info & Spec */}
                <section style={{ marginBottom: "3rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>시공 상세 정보</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {p.spec.map((item, idx) => (
                            <div key={idx} style={{ display: "flex", padding: "1rem", borderBottom: "1px solid var(--border)" }}>
                                <span style={{ width: "80px", fontWeight: "600", color: "var(--text-muted)" }}>{item.label}</span>
                                <span>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Before Images - Show first */}
                {p.beforeImages && p.beforeImages.length > 0 && (
                    <section style={{ marginBottom: "4rem" }}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "1.5rem", color: "var(--text-muted)" }}>
                            Before <span style={{ fontSize: "0.875rem", fontWeight: "400", marginLeft: "0.5rem" }}>시공 전 모습</span>
                        </h3>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "1rem"
                        }}>
                            {p.beforeImages.map((img, idx) => (
                                <div key={idx} style={{ position: "relative", aspectRatio: "4/3", borderRadius: "12px", overflow: "hidden" }}>
                                    <Image src={img.url} alt={img.caption || "시공 전"} fill style={{ objectFit: "contain" }} unoptimized={true} />
                                    <div style={{ position: "absolute", bottom: "0.5rem", left: "0.5rem", background: "rgba(0,0,0,0.6)", color: "white", padding: "0.2rem 0.5rem", fontSize: "0.75rem", borderRadius: "4px" }}>
                                        {img.caption}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* After Sections - Categorized */}
                {p.afterSections && p.afterSections.length > 0 && (
                    <section style={{ marginBottom: "3rem" }}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "2rem", color: "var(--primary)" }}>
                            After <span style={{ fontSize: "0.875rem", fontWeight: "400", marginLeft: "0.5rem", color: "var(--foreground)" }}>시공 후 변화된 공간</span>
                        </h3>

                        {p.afterSections.map((section, sIdx) => (
                            <div key={sIdx} style={{ marginBottom: "4rem" }}>
                                <div style={{ marginBottom: "1.5rem" }}>
                                    <h4 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem" }}>{section.title}</h4>
                                    <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: "1.6" }}>{section.description}</p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                    {section.images.map((imgUrl, iIdx) => (
                                        <div key={iIdx} style={{ position: "relative", width: "100%", aspectRatio: "3/2", borderRadius: "16px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
                                            <Image src={imgUrl} alt={`${section.title} 이미지 ${iIdx + 1}`} fill style={{ objectFit: "contain" }} unoptimized={true} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </article>

            {/* Floating CTA Bar */}
            <div className="cta-bar">
                <a
                    href={`tel:${p.contacts.phone}`}
                    style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        height: "54px",
                        background: "var(--foreground)",
                        color: "var(--background)",
                        borderRadius: "12px",
                        fontWeight: "700",
                        textDecoration: "none",
                    }}
                >
                    <span>📞 전화 상담</span>
                </a>
                <SmsShareButton
                    phone={p.contacts.sms}
                    projectTitle={p.title}
                    projectUrl={shareUrl}
                />
            </div>
        </main>
    );
}
