import { Component } from "react";

import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup,
  AreaHighlight,
} from "../library";

import type { IHighlight, NewHighlight } from "../library";

import { testHighlights as _testHighlights } from "./test-highlights";
import { Spinner } from "./Spinner";
import { Sidebar } from "./Sidebar";

const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;
interface State {
  url: string;
  highlights: Array<IHighlight>;
  currentId: string;
  verifiedIdArray: any;
  declinedIdArray: any;
}

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

// const HighlightPopup = ({
//   comment,
// }: {
//   comment: { text: string; emoji: string };
// }) =>
//   comment.text ? (
//     <div className="f Highlight__popup">
//       {comment.emoji} {comment.text}
//     </div>
//   ) : null;

const PRIMARY_PDF_URL = "/testPdf.pdf";
const SECONDARY_PDF_URL = "/testPdf.pdf";

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

class App extends Component<{}, State> {
  state = {
    url: initialUrl,
    highlights: testHighlights[initialUrl]
      ? [...testHighlights[initialUrl]]
      : [],
    currentId: "",
    verifiedIdArray: [],
    declinedIdArray: [],
  };

  setCurrentId = (value: string) => {
    return this.setState({
      currentId: value,
    });
  };

  setVerifiedIdArray = (value: string) => {
    let cloneArray = [...this.state.declinedIdArray];
    let index = cloneArray.indexOf(value as never);
    console.log("accept log", value);

    if (!this.state.verifiedIdArray?.includes(value as never)) {
      this.setState({
        verifiedIdArray: [...this.state.verifiedIdArray, value],
      });
    }
    if (index !== -1) {
      cloneArray.splice(index, 1);
      console.log("cloneArray log", cloneArray);
      this.setState({ declinedIdArray: [...cloneArray] });
    }
  };

  setDeclinedIdArray = (value: string) => {
    console.log("declain log");

    let cloneArray = [...this.state.verifiedIdArray];
    let index = cloneArray.indexOf(value as never);
    if (!this.state.declinedIdArray?.includes(value as never)) {
      this.setState({
        declinedIdArray: [...this.state.declinedIdArray, value],
      });
    }
    if (index !== -1) {
      cloneArray.splice(index, 1);
      this.setState({ verifiedIdArray: [...cloneArray] });
    }
  };

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };

  toggleDocument = () => {
    const newUrl =
      this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    this.setState({
      url: newUrl,
      highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
    });
  };

  scrollViewerTo = (highlight: any) => {};

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find((highlight) => highlight.id === id);
  }

  addHighlight(highlight: NewHighlight) {
    const { highlights } = this.state;

    this.setState({
      highlights: [{ ...highlight, id: getNextId() }, ...highlights],
    });
  }

  updateHighlight(highlightId: string, position: Object, content: Object) {
    this.setState({
      highlights: this.state.highlights.map((h) => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest,
            }
          : h;
      }),
    });
  }

  render() {
    const { url, highlights } = this.state;
    console.log("url", url, highlights);
    return (
      <div className="App bg-blue-100">
        <div className="pdfDisplayClass">
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {(pdfDocument) => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
                // pdfScaleValue="page-width"
                scrollRef={(scrollTo) => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={(comment) => {
                      this.addHighlight({ content, position, comment });

                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      id={highlight.id}
                      currentId={this.state.currentId}
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      isScrolledTo={isScrolledTo}
                      highlight={highlight}
                      onChange={(boundingRect) => {
                        this.updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <>
                      {highlight?.id === this.state.currentId && (
                        <Popup
                          popupContent={
                            <div className="bg-gray-200 p-4 rounded-md text-black">
                              <div>Descriptation</div>
                              <div>
                                <input
                                  disabled
                                  className="px-4 py-2 bg-white w-full rounded-md border border-gray-200"
                                  value={highlight?.content?.text}
                                />
                              </div>
                              <div className="flex mt-2 justify-center ">
                                <button>
                                  <svg
                                    onClick={() =>
                                      this.setDeclinedIdArray(highlight?.id)
                                    }
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white border border-red-600 bg-red-600 rounded-md"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                                <button
                                  onClick={() =>
                                    this.setVerifiedIdArray(highlight?.id)
                                  }
                                  className="ml-2"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-white border border-green-400 bg-green-400 rounded-md"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            // <HighlightPopup {...highlight} />
                          }
                          onMouseOver={(popupContent) =>
                            setTip(highlight, (highlight) => popupContent)
                          }
                          onMouseOut={hideTip}
                          key={index}
                          children={component}
                        />
                      )}
                    </>
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
        </div>
        <div className="w-2/5">
          <Sidebar
            highlights={highlights}
            handleCurrentId={this.setCurrentId}
            verifiedIdArray={this.state.verifiedIdArray}
            declinedIdArray={this.state.declinedIdArray}
            resetHighlights={this.resetHighlights}
            toggleDocument={this.toggleDocument}
          />
        </div>
      </div>
    );
  }
}

export default App;
