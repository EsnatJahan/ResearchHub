import ProjectCard from "@/components/projectcard";


const projects = [
  {
    id:1,
    title:"LLM-based Automated Test Generation",
    description:
      "Generate Python unit tests using lightweight open-weight LLMs.",
    status:"Active",
    papers:12,
    datasets:3,
    models:5,
    experiments:15,
    progress:75,
    created:"January 2026"
  },

  {
    id:2,
    title:"IoT Anomaly Detection",
    description:
      "Detect abnormal behavior in IoT network traffic.",
    status:"Completed",
    papers:8,
    datasets:2,
    models:3,
    experiments:10,
    progress:100,
    created:"March 2025"
  },

  {
    id:3,
    title:"Medical Image Classification",
    description:
      "Deep learning based disease classification system.",
    status:"Research",
    papers:6,
    datasets:1,
    models:4,
    experiments:7,
    progress:45,
    created:"May 2025"
  }

]


export default function ProjectsPage(){

return (

<div className="p-8">


<div className="
flex 
justify-between
items-center
">

<div>

<h1 className="text-3xl font-bold">
Projects
</h1>

<p className="text-gray-500 mt-1">
Manage all your research projects
</p>

</div>


<button
className="
bg-blue-600
text-white
px-5
py-2
rounded-lg
"
>
+ New Project
</button>


</div>



<input

placeholder="Search projects..."

className="
mt-8
w-full
border
rounded-lg
p-3
outline-none
"

/>



<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
mt-8
">


{
projects.map((project)=>(
<ProjectCard
key={project.id}
project={project}
/>
))
}


</div>



</div>

)

}