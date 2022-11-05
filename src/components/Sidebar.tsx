import  { useState } from "react";
import type { IHighlight } from "../library";

interface Props {
  highlights: Array<IHighlight>;
  resetHighlights: () => void;
  toggleDocument: () => void;
  handleCurrentId: any;
  verifiedIdArray: any;
  declinedIdArray: any;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};

export function Sidebar({
  highlights,
  toggleDocument,
  resetHighlights,
  handleCurrentId,
  verifiedIdArray,
  declinedIdArray,
}: Props) {

  const [showMenu, setShowMenu] = useState(true);
  return (
    <div className="sidebar sidebarContaibner w-full" >
      <div className="description py-8 px-5 flex items-center justify-between " >
        <h2 className="text-3xl text-black font-bold">Document Name</h2>
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <div className="text-indigo-700 ml-2">Undo</div>
        </div>
      </div>

      <div onClick={() => setShowMenu(!showMenu)} className="">
        <div className="flex p-4 text-black w-full border-y border-gray-200 bg-gray-100 font-medium shadow-md">
          {showMenu ? <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
            : <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          }
          Basic Information
        </div>
      </div>

      {showMenu && <div className={`h-4/6 bg-white pb-32 border-b border-gray-300 shadow-md`}>
        <ul className="sidebar__highlights ">
          {highlights.map((highlight, index) => (
            <li
              key={index}
              className="sidebar__highlight"
              onClick={(e: any) => {
                updateHash(highlight);
                handleCurrentId(highlight.id);
              }}
            >
              <div className="flex justify-start ">
                <div className="w-1/4 py-2  flex items-center">
                  <div className="h-1/2 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`rounded pt-2 h-3 w-3 ${index % 2 === 0 && index % 3 !== 0 ? 'bg-yellow-500' : index % 3 === 0 ? 'bg-blue-500' : 'bg-indigo-500'} `} >
                    </svg>
                  </div>
                  <div className="">
                    <strong>{highlight.comment.text}</strong>
                  </div>
                </div>
                <div className="w-3/4">
                  <div className="flex">
                    {highlight.content.text ? (
                      <div className="w-full mr-4" >
                        <input className="px-4 py-2 w-full rounded-md border border-gray-200" value={`${highlight.content.text.slice(0, 90).trim()}…`} />
                      </div>
                    ) : null}
                    {highlight.content.image ? (
                      <div
                        className="highlight__image"
                      >
                        <img src={highlight.content.image} alt={"Screenshot"} />
                      </div>
                    ) : null}

                    <div className="flex">
                      {!verifiedIdArray.includes(highlight.id) && !declinedIdArray.includes(highlight.id) && <div className="py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400 border border-green-400 rounded-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>}

                      {verifiedIdArray.includes(highlight.id) && !declinedIdArray.includes(highlight.id) && <div className="py-2 ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white border border-green-400 bg-green-400 rounded-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>}

                      {declinedIdArray.includes(highlight.id) && <div className="py-1.5 ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>}
                    </div>
                  </div>
                </div>

              </div>
              {/*  <div className="highlight__location">
                Page {highlight.position.pageNumber}
              </div> */}
            </li>
          ))}
        </ul>
      </div>}
      <div className="flex justify-between px-4 py-8">
        <div className="flex">
          <button
            type="button"
            className="mr-2 inline-flex items-center px-6 py-2 border border-indigo-700 shadow-sm text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset
          </button>

          <button
            type="button"
            className="mr-2 w-full justify-cente inline-flex items-center px-6 py-2 border border-indigo-700 shadow-sm text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Download
          </button>
        </div>
        <div className="w-1/4">
          <button
            type="button"
            className=" text-center inline-flex w-full justify-center py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Confirm
          </button>
        </div>
      </div>
      {/* <div style={{ padding: "1rem" }}>
        <button onClick={toggleDocument}>Toggle PDF document</button>
      </div>
      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <button onClick={resetHighlights}>Reset highlights</button>
        </div>
      ) : null} */}
    </div>
  );
}
