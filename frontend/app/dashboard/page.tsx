import StatCard from "@/components/statcard";
import ProjectCard from "@/components/project";
export default function Dashboard(){

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="text-gray-500">
        Manage your research workspace
      </p>


      {/* Statistics */}
      <div className="grid grid-cols-4 gap-5 mt-6">

        <StatCard 
          title="Projects"
          value="5"
        />

        <StatCard 
          title="Papers"
          value="32"
        />

        <StatCard 
          title="Datasets"
          value="8"
        />

        <StatCard 
          title="Models"
          value="12"
        />

      </div>



      {/* Projects */}

      <h2 className="text-xl font-semibold mt-10">
        Active Projects
      </h2>


      <div className="grid grid-cols-2 gap-5 mt-4">

        <ProjectCard
          name="LLM Test Generation"
          progress="70"
          papers="12"
          models="4"
        />


        <ProjectCard
          name="IoT Anomaly Detection"
          progress="40"
          papers="5"
          models="3"
        />

      </div>


    </div>
  )
}