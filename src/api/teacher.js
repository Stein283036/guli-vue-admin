import request from "@/utils/request";

const TEACHER_BASE_URL = "/edu/service/teachers";

export function updateTeacherAPI(data) {
  return request({
    url: `${TEACHER_BASE_URL}`,
    method: "put",
    data,
  });
}

export function getTeacherByIdAPI(id) {
  return request({
    url: `${TEACHER_BASE_URL}/${id}`,
  });
}

export function saveTeacherAPI(data) {
  return request({
    url: `${TEACHER_BASE_URL}`,
    method: "post",
    data,
  });
}

export function pageTeachersWithConditionAPI(current, size, params) {
  return request({
    url: `${TEACHER_BASE_URL}/page/condition/${current}/${size}`,
    params,
  });
}

export function pageTeachersAPI(current, size) {
  return request({
    url: `${TEACHER_BASE_URL}/page/${current}/${size}`,
  });
}

export function removeTeacherByIdAPI(id) {
  return request({
    url: `${TEACHER_BASE_URL}/${id}`,
    method: "delete",
  });
}

export function listTeachersAPI() {
  return request({
    url: "${TEACHER_BASE_URL}",
  });
}
