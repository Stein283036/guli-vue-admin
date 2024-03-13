import request from "@/utils/request";

const COURSE_BASE_URL = "/edu/service/courses";

export function getCourseByIdAPI(courseId) {
  return request({
    url: `${COURSE_BASE_URL}`,
    params: {
      courseId,
    },
  });
}

export function saveCourseAPI(data) {
  return request({
    url: `${COURSE_BASE_URL}`,
    method: "post",
    data,
  });
}
