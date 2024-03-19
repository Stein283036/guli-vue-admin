import request from "@/utils/request";

const COURSE_BASE_URL = "/edu/service/courses";

export function removeCourseByIdWithCascade(id) {
  return request({
    url: `${COURSE_BASE_URL}/${id}`,
    method: "delete",
  });
}

export function pageCoursesWithConditionAPI(current, size, params) {
  return request({
    url: `${COURSE_BASE_URL}/page/condition/${current}/${size}`,
    params,
  });
}

export function pageCoursesAPI(current, size) {
  return request({
    url: `${COURSE_BASE_URL}/page/${current}/${size}`,
  });
}

export function publishCourseAPI(courseId) {
  return request({
    url: `${COURSE_BASE_URL}/publish/${courseId}`,
    method: "post",
  });
}

export function getCoursePublishInfoByCourseIdAPI(courseId) {
  return request({
    url: `${COURSE_BASE_URL}/publish/${courseId}`,
  });
}

export function getCourseByIdAPI(courseId) {
  return request({
    url: `${COURSE_BASE_URL}`,
    params: {
      courseId,
    },
  });
}

export function updateCourseAPI(data) {
  return request({
    url: `${COURSE_BASE_URL}`,
    method: "put",
    data,
  });
}

export function saveCourseAPI(data) {
  return request({
    url: `${COURSE_BASE_URL}`,
    method: "post",
    data,
  });
}
