import client from "../client";

// 역량 키워드 등록
export const postKeyword = async (names: { name: string }[], token: string) => {
  return await client.post(
    `/api/strong-points`,
    {
      names: names,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// 역량 키워드 조회
export const getKeywords = async (token: string) => {
  return await client.get(`/api/strong-points`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
