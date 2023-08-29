import Speaker from "./Speaker";
import ReactPlaceHolder from "react-placeholder";
import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import { useContext } from "react";
import SpeakerAdd from "./SpeakerAdd";
import data from "../../SpeakerData";

function SpeakersList() {
  const {
    data: speakerData,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestRest();

  const { searchQuery, eventYear } = useContext(SpeakerFilterContext);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  // if (isLoading === true) return <div>Loading...</div>;

  return (
    <div className="constiner speakers-list">
      <ReactPlaceHolder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
        <SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} />
        <div className="row">
          {speakerData
            .filter(function (speaker) {
              return (
                speaker.first.toLowerCase().includes(searchQuery) ||
                speaker.last.toLowerCase().includes(searchQuery)
              );
            })
            .filter(function (speaker) {
              return speaker.sessions.find((session) => {
                return session.eventYear === eventYear;
              });
            })
            .map(function (speaker) {
              return (
                <Speaker
                  key={speaker.id}
                  speaker={speaker}
                  updateRecord={updateRecord}
                  insertRecord={insertRecord}
                  deleteRecord={deleteRecord}
                />
              );
            })}
        </div>
      </ReactPlaceHolder>
    </div>
  );
}

export default SpeakersList;
