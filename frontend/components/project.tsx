
export default function Project({
name,
progress,
papers,
models
}:any){

return (

<div className="
bg-white
rounded-xl
shadow
p-5
">


<h3 className="font-semibold text-lg">
{name}
</h3>


<div className="mt-4">

<div className="flex justify-between">
<span>Progress</span>
<span>{progress}%</span>
</div>


<div className="bg-gray-200 h-2 rounded mt-2">

<div
className="bg-blue-600 h-2 rounded"
style={{
width:`${progress}%`
}}
/>

</div>

</div>


<div className="flex gap-5 mt-5 text-sm text-gray-600">

<span>
📄 {papers} Papers
</span>

<span>
🤖 {models} Models
</span>


</div>


</div>

)

}