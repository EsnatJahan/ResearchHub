export default function ProjectCard({
project
}:any){

return (

<div
className="
bg-white
rounded-xl
shadow-sm
border
p-6
hover:shadow-md
transition
"
>


<div className="flex justify-between">


<h2 className="
text-xl
font-semibold
">
{project.title}
</h2>


<span
className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-sm
"
>
{project.status}
</span>


</div>



<p className="
text-gray-600
mt-3
">
{project.description}
</p>



<div className="
grid
grid-cols-2
gap-3
mt-5
text-sm
text-gray-700
">


<div>
📄 {project.papers} Papers
</div>

<div>
📊 {project.datasets} Datasets
</div>

<div>
🤖 {project.models} Models
</div>

<div>
🧪 {project.experiments} Experiments
</div>


</div>




<div className="mt-6">


<div className="
flex
justify-between
text-sm
">

<span>
Progress
</span>

<span>
{project.progress}%
</span>

</div>



<div className="
bg-gray-200
h-2
rounded-full
mt-2
">

<div

className="
bg-blue-600
h-2
rounded-full
"

style={{
width:`${project.progress}%`
}}

/>


</div>


</div>




<p className="
text-xs
text-gray-500
mt-5
">

Created: {project.created}

</p>


</div>

)

}

