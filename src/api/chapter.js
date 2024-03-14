import request from "@/utils/request";

const CHAPTER_BASE_URL = "/edu/service/chapters";

export function treeListChapterAPI(courseId) {
  return request({
    url: `${CHAPTER_BASE_URL}/tree/${courseId}`,
  });
}
