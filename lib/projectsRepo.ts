import projects from "@/data/projects.json";

export type Project = (typeof projects)[number];

export function getAllProjects(): Project[] {
  return projects as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projects as Project[]).find((p) => p.slug === slug);
}
