import "../../portfolio.css";
import { notFound } from "next/navigation";
import ProjectPage from "@/components/project-page";
import { getProjectBySlug, projects } from "@/lib/portfolio-content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectPage project={project} />;
}
