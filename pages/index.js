import { data } from "../SpeakerData";
import Speaker from "../src/components/Speaker";


const IndexPage = () => {
  return (
    <div className="constiner speakers-list">
      <div className="row">
        {data.map(function (speaker) {
          return <Speaker key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
};

export default IndexPage;
