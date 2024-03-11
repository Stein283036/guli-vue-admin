import request from "@/utils/request";

const SUBJECT_BASE_URL = "/edu/service/subjects";

export function treeListSubjectAPI() {
  return request({
    url: `${SUBJECT_BASE_URL}/tree`,
  });
}
