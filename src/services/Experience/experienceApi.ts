import { ExperienceType } from "../../types/experience";
import client from "../client";

// 경험 등록
export const postExperience = async (
  expData: ExperienceType,
  token: string
) => {
  return await client.post(`/api/experiences`, expData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 경험 상세 조회
export const getExperience = async (expId: string, token: string) => {
  return await client.get(`/api/experiences/${expId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 경험 수정
export const patchExperience = async (
  expId: string,
  expData: ExperienceType,
  token: string
) => {
  return await client.patch(`/api/experiences/${expId}`, expData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 경험 삭제
export const deleteExperience = async (expId: string, token: string) => {
  return await client.delete(`/api/experiences/${expId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 유저 경험 연도 목록 조회
export const getExperienceYears = async (token: string) => {
  return await client.get(`/api/experiences/all-years`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// 경험 목록 조회
export const getExperienceList = async (
  year: number,
  primeTagId: string,
  subTagId: string | undefined,
  token: string
) => {
  if (subTagId) {
     return await client.get(
       `/api/experiences?year=${year}&parent-tag=${primeTagId}&child-tag=${subTagId}`,
       {
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     );
  }
  return await client.get(
    `/api/experiences?year=${year}&parent-tag=${primeTagId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
