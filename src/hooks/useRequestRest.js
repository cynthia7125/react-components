import { useEffect, useState } from "react";
import axios from "axios";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const restUrl = "api/speakers";

const fetchSpeakers = async () => {
  try {
    const response = await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            speakers {
              id
              first
              last
              company
              bio
              twitterHandle
              favorite
              sessions {
                id
                title
                eventYear
                room {
                  name
                  capacity
                }
              }
            }
          }
        `,
      }),
    });
    const { data } = await response.json();
    return data ? data.speakers : [];
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return [];
  }
};

function useRequestRest() {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const speakersData = await fetchSpeakers();
        setData(speakersData);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      } catch (error) {
        setError(error.message);
        setRequestStatus(REQUEST_STATUS.FAILURE);
      }
    };
    fetchData();
  }, []);

  function updateRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = data.map(function (rec) {
      return rec.id === record.id ? record : rec;
    });
    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.put(`${restUrl}/${record.id}`, record);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  function deleteRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = data.filter(function (rec) {
      return rec.id != record.id;
    });
    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.delete(`${restUrl}/${record.id}`, record);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  function insertRecord(record, doneCallback) {
    const originalRecords = [...data];
    const newRecords = [record, ...data];
    async function delayFunction() {
      try {
        setData(newRecords);
        await axios.post(`${restUrl}/99999`, record);
        if (doneCallback) {
          doneCallback();
        }
      } catch (error) {
        console.log("error thrown inside delayFunction", error);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalRecords);
      }
    }
    delayFunction();
  }

  return {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  };
}

export default useRequestRest;