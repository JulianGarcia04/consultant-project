import { getProjects } from "../services/projects";
import CreateProjectButton from "@/components/CreateProjectButton";
import ProjectCard from "@/components/ProjectCard";

export default async function Home() {
	const projects = await getProjects();

	return (
		<div className="container mx-auto p-4 bg-gray-100 min-h-screen">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-primary">Projects</h1>
				<CreateProjectButton />
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{projects.length === 0 ? (
					<div className="italic">You do not have projects</div>
				) : null}
				{projects.map((project) => (
					<ProjectCard
						key={project._id}
						_id={project._id}
						title={project.title}
						description={project.description}
						createAt={project.createAt}
					/>
				))}
			</div>
		</div>
	);
}
