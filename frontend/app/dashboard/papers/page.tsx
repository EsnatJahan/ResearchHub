import PaperCard from "@/components/papercard";


const papers = [
  {
    id: 1,
    name: "TestSpark Paper",
    pdf_url: "/papers/testspark.pdf",
    note: "Important for methodology"
  },

  {
    id: 2,
    name: "Mutation Testing Paper",
    pdf_url: "/papers/mutation.pdf",
    note: ""
  }
];


export default function PapersPage(){

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        Papers
      </h1>


      <div className="mt-6 space-y-4">

        {
          papers.map((paper)=>(
            <PaperCard
              key={paper.id}
              paper={paper}
            />
          ))
        }

      </div>


    </div>
  );
}