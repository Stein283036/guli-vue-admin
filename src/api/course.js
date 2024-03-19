import request from "@/utils/request";

const COURSE_BASE_URL = "/edu/service/courses";

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
