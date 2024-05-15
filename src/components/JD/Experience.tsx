import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { detailStore } from "../../store/jdStore";
import { Question } from "../../types/type";

interface ExpProps {
  type?: "card" | "section";
  id: number;
  title: string;
  tags: string[];
  maintag: string;
  subtag: string;
  period: string;
  bookmark: boolean;
  question?: number;
  detail?: Question[];
  onClick?: () => void;
}

const Experience: React.FC<ExpProps> = ({
  type,
  id,
  title,
  tags,
  maintag,
  subtag,
  period,
  question,
  detail,
  onClick,
}) => {
  const [detailId, setDetailId] = useRecoilState(detailStore);

  // 카드 타입, 섹션 타입 구분
  const isSection = type === "section";

  // 경험의 선택된 질문 답변
  const answer = detail?.filter((item) => item.num === question)[0];

  const handleClick = () => {
    setDetailId(id);
    if (onClick) {
      onClick();
    }
  };
  return (
    <StyledContainer
      className={isSection ? "section" : ""}
      onClick={handleClick}
    >
      <TagContainer>
        {tags.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </TagContainer>
      <TopContainer>
        <Title className={isSection ? "section" : ""}>{title}</Title>
      </TopContainer>
      <SubContainer className={isSection ? "section" : ""}>
        <div>{maintag + ">" + subtag}</div>
        <div>|</div>
        <div>{period}</div>
      </SubContainer>
      {question ? (
        <AnswerContainer>
          <div className="label">내가 작성한 답변</div>
          <hr />
          <div className={answer ? "content" : "noContent"}>
            {answer?.content || "작성한 답변이 없습니다"}
          </div>
        </AnswerContainer>
      ) : null}
    </StyledContainer>
  );
};

export default Experience;

const StyledContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 20px;
  min-width: 250px;
  display: flex;
  padding: 1.5625rem 2.75rem 1.5625rem 1.875rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  &.section {
    padding: 0px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.colors.neutral500};
  ${(props) => props.theme.fonts.cap2};
  &.section {
    ${(props) => props.theme.fonts.subtitle4};
  }
`;

const Title = styled.div`
  color: ${(props) => props.theme.colors.neutral700};
  ${(props) => props.theme.fonts.subtitle3};
  &.section {
    ${(props) => props.theme.fonts.title1};
  }
`;

const TagContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.38rem;
`;

const Tag = styled.div`
  display: flex;
  padding: 0.25rem 0.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.6875rem;
  background: ${(props) => props.theme.colors.main50};
  color: var(--main-500, #7d82ff);
  ${(props) => props.theme.fonts.cap2};
`;

const AnswerContainer = styled.div`
  width: 100%;
  padding: 19px 31px;
  border-radius: 8px;
  background: var(--neutral-50, #f7f7fb);
  .label {
    ${(props) => props.theme.fonts.body4};
    color: ${(props) => props.theme.colors.neutral600};
    margin-bottom: 12px;
  }
  .content {
    margin-top: 18px;
    ${(props) => props.theme.fonts.cap1};
    color: ${(props) => props.theme.colors.neutral700};
  }
  .noContent {
    margin-top: 18px;
    ${(props) => props.theme.fonts.cap1};
    color: ${(props) => props.theme.colors.neutral600};
  }
`;
