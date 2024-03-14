import request from "@/utils/request";

const CHAPTER_BASE_URL = "/edu/service/chapters";

export function deleteChapterByIdAPI(chapterId) {
  return request({
    url: `${CHAPTER_BASE_URL}/${chapterId}`,
    method: "delete",
  });
}

export function updateChapterByIdAPI(data) {
  return request({
    url: `${CHAPTER_BASE_URL}`,
    method: "put",
    data,
  });
}

export function getChapterByIdAPI(chapterId) {
  return request({
    url: `${CHAPTER_BASE_URL}/${chapterId}`,
  });
}

export function saveChapterAPI(data) {
  return request({
    url: `${CHAPTER_BASE_URL}`,
    method: "post",
    data,
  });
}

export function treeListChapterAPI(courseId) {
  return request({
    url: `${CHAPTER_BASE_URL}/tree/${courseId}`,
  });
}
