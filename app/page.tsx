import { getAllProjects } from "@/lib/projectsRepo";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const projects = getAllProjects();

  return (
    <main className="hero-gradient" style={{ minHeight: "100vh" }}>
      <header className="glass-nav">
        <div className="container" style={{ height: "70px", display: "flex", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "800", letterSpacing: "-0.02em" }}>
            An_DesignECO
          </h1>
        </div>
      </header>

      <section className="container" style={{ padding: "4rem 1.5rem" }}>
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "1rem", lineHeight: 1.2 }}>
            당신의 공간에 완벽한 <span style={{ color: "var(--primary)" }}>감각을 디자인합니다</span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.125rem", maxWidth: "600px" }}>
            엄선된 인테리어 시공 사례를 확인하고, 당신의 취향에 딱 맞는 견적 상담을 받아보세요.
          </p>
        </div>

        <div className="grid" style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gap: "2.5rem"
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <footer className="container" style={{ padding: "4rem 1.5rem", borderTop: "1px solid var(--border)", marginTop: "4rem" }}>
        <p style={{ color: "var(--text-muted)", textAlign: "center", fontSize: "0.875rem" }}>
          © 2026 An_DesignECO. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
