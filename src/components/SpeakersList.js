import { data } from "../../SpeakerData";
import Speaker from "./Speaker";
import { useState } from "react";

function SpeakersList({ showSessions }) {
  const [speakerData, setSpeakerData] = useState(data);

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

  return (
    <div className="constiner speakers-list">
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
    </div>
  );
}

export default SpeakersList;
