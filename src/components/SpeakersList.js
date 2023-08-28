import { data } from "../../SpeakerData";
import Speaker from "./Speaker";
import { useState, useEffect } from "react";
import ReactPlaceHolder from "react-placeholder";

function SpeakersList({ showSessions }) {
  const [speakerData, setSpeakerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrored, setHasErrored] = useState(false);
  const [error, setError] = useState("");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(2000);
        // throw "Had Error."
        setIsLoading(false);
        setSpeakerData(data);
      } catch (e) {
        setIsLoading(false);
        setHasErrored(true);
        setError(e);
      }
    }
    delayFunc();
  }, []);

  function onFavoriteToggle(id) {
    const speakersRecPrevious = speakerData.find(function (rec) {
      return rec.id === id;
    });
    const speakerRecUpdated = {
      ...speakersRecPrevious,
      favorite: !speakersRecPrevious.favorite,
    };
    const SpeakerDataNew = speakerData.map(function (rec) {
      return rec.id === id ? speakerRecUpdated : rec;
    });

    setSpeakerData(SpeakerDataNew);
  }
  if (hasErrored === true) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Speaker Data Failed {error}</b>
      </div>
    );
  }

  if (isLoading === true) return <div>Loading...</div>;

  return (
    <div className="constiner speakers-list">
      <ReactPlaceHolder
        type="media"
        rows={15}
        className="speakerslist-placeholder"
        ready={isLoading === false}
      >
        <div className="row">
          {speakerData.map(function (speaker) {
            return (
              <Speaker
                key={speaker.id}
                speaker={speaker}
                showSessions={showSessions}
                onFavoriteToggle={() => {
                  onFavoriteToggle(speaker.id);
                }}
              />
            );
          })}
        </div>
      </ReactPlaceHolder>
    </div>
  );
}

export default SpeakersList;
