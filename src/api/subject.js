import request from "@/utils/request";

const SUBJECT_BASE_URL = "/edu/service/subjects";

export function listSubjectSecondBySubjectParentIdAPI(subjectParentId) {
  return request({
    url: `${SUBJECT_BASE_URL}/second/${subjectParentId}`,
  });
}

export function listSubjectFirstAPI() {
  return request({
    url: `${SUBJECT_BASE_URL}/first`,
  });
}

export function treeListSubjectAPI() {
  return request({
    url: `${SUBJECT_BASE_URL}/tree`,
  });
}
