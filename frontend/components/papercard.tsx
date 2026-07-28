export default function PaperCard({ paper }: any) {

  return (
    <div className="
      border
      rounded-xl
      p-5
      bg-white
    ">

      {/* Paper name */}
      <div className="flex justify-between items-center">

        <a
          href={paper.pdf_url}
          target="_blank"
          className="
            text-lg
            font-semibold
            text-blue-600
          "
        >
          📄 {paper.name}
        </a>


        {/* Delete paper */}
        <button
          className="
            text-red-500
            hover:text-red-700
          "
        >
          Delete Paper
        </button>

      </div>


      {/* Note section */}
      <div className="mt-4">


        {
          paper.note ? (

            <div>

              <p className="text-gray-700">
                {paper.note}
              </p>


              <div className="flex gap-3 mt-3">

                <button
                  className="
                    px-3
                    py-1
                    rounded
                    bg-gray-200
                  "
                >
                  Edit Note
                </button>


                <button
                  className="
                    px-3
                    py-1
                    rounded
                    bg-gray-200
                  "
                >
                  Remove Note
                </button>

              </div>

            </div>


          ) : (

            <button
              className="
                text-blue-600
              "
            >
              + Add Note
            </button>

          )

        }


      </div>


    </div>
  );
}