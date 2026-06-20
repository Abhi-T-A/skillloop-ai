import * as studyApi from "../api/studyApi";

export const requestStudyGuide = async (payload) => {
  return studyApi.generateStudyGuide(payload);
};

export const fetchStudyHistory = async () => {
  return studyApi.getStudyHistory();
};
