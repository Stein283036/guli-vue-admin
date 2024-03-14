import request from "@/utils/request";

const SECTION_BASE_URL = "/edu/service/sections";

export function deleteSectionByIdAPI(sectionId) {
  return request({
    url: `${SECTION_BASE_URL}/${sectionId}`,
    method: "delete",
  });
}

export function saveSectionAPI(data) {
  return request({
    url: `${SECTION_BASE_URL}`,
    method: "post",
    data,
  });
}

export function updateSectionByIdAPI(data) {
  return request({
    url: `${SECTION_BASE_URL}`,
    method: "put",
    data,
  });
}

export function getSectionByIdAPI(sectionId) {
  return request({
    url: `${SECTION_BASE_URL}/${sectionId}`,
  });
}
