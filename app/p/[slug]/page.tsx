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
    const desc = `${p.costDisplay} · ${p.durationDisplay} · ${p.summary}`;

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
                <div style={{ marginBottom: "3.5rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                        {p.tags.map(tag => (
                            <span key={tag} style={{ color: "var(--primary)", fontWeight: "700", fontSize: "1rem" }}>#{tag}</span>
                        ))}
                    </div>
                    <h2 className="title-xl" style={{ marginBottom: "2rem" }}>{p.title}</h2>

                    <div className="stat-card">
                        <div>
                            <p className="stat-label">전용면적</p>
                            <p className="stat-value">{p.sizePy}평</p>
                        </div>
                        <div style={{ borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>
                            <p className="stat-label">예상 견적</p>
                            <p className="stat-value" style={{ color: "var(--primary)" }}>{p.costDisplay}</p>
                        </div>
                        <div>
                            <p className="stat-label">공사 기간</p>
                            <p className="stat-value">{p.durationDisplay}</p>
                        </div>
                    </div>
                </div>

                {/* Info & Spec */}
                <section style={{ marginBottom: "5rem" }}>
                    <h3 className="title-lg" style={{ marginBottom: "1.5rem" }}>시공 상세 정보</h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                        {p.spec.map((item, idx) => (
                            <div key={idx} style={{
                                display: "flex",
                                padding: "1.5rem",
                                borderTop: "1px solid var(--border)",
                                background: idx % 2 === 0 ? "transparent" : "rgba(0,0,0,0.01)"
                            }}>
                                <span style={{ width: "120px", fontWeight: "700", color: "var(--text-muted)", fontSize: "1.125rem" }}>{item.label}</span>
                                <span style={{ fontSize: "1.125rem", fontWeight: "500" }}>{item.value}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Full Gallery Section */}
                <section style={{ marginBottom: "5rem" }}>
                    <h3 className="title-lg" style={{ marginBottom: "2rem" }}>시공 사례 상세보기</h3>
                    {p.afterSections.map((section, sIdx) => (
                        <div key={sIdx} style={{ marginBottom: "4rem" }}>
                            <div style={{ marginBottom: "2rem", borderLeft: "6px solid var(--primary)", paddingLeft: "1.5rem" }}>
                                <h4 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "0.5rem" }}>{section.title}</h4>
                                <p style={{ color: "var(--text-muted)", fontSize: "1.125rem", lineHeight: "1.6" }}>{section.description}</p>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                                {section.images.map((imgUrl, iIdx) => (
                                    <div key={iIdx} style={{ position: "relative", width: "100%", aspectRatio: "3/2", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                                        <Image src={imgUrl} alt={`${section.title} 상세`} fill style={{ objectFit: "contain" }} unoptimized={true} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
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
