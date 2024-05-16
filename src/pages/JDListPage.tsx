import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import JobAnnouncementCard from "../components/JD/Announcement";
import { jobAnnouncements } from "../services/JD/jdData"; //더미 데이터
import PlaneLoading from "../components/common/Loading"; // api 연결후 로딩 처리
import btnbg from "../assets/icons/icon_plus_button_bg.svg";
import prebtn from "../assets/icons/icon_page_prev.svg";
import nextbtn from "../assets/icons/icon_page_next.svg";
import prebtn_v2 from "../assets/icons/icon_prev_btn_v2.svg";
import nextbtn_v2 from "../assets/icons/icon_next_btn_v2.svg";
import { useNavigate } from "react-router-dom";
import PlusIcon from "../assets/icons/icon_plus_white.svg";

const JDListPage: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>("전체"); // "전체", "작성전", "작성중", "작성완료", "지원완료"
  const [selectedSort, setSelectedSort] = useState<string>("등록순"); // 등록순 or 마감순 , 초기값은 등록순
  const [currentPage, setCurrentPage] = useState(1); //현재 위치한 페이지
  const [pageTotal, setpageTotal] = useState(20);
  const [pages, setPages] = useState<React.ReactNode[]>([]);
  const nav = useNavigate();

  const Filterbuttons = ["전체", "작성전", "작성중", "작성완료", "마감"];
  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const handleSortChange = (sortType: string) => {
    setSelectedSort(sortType);
  };

  const navToDetail = () => {
    nav("/jd/post");
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    //...을 제외한 페이지 렌더 부분
    const renderPageNumber = (i: number) => (
      <PageNumber
        key={i}
        activePage={currentPage === i}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </PageNumber>
    );
    let tempPages: any = [];
    const generatePages = () => {
      if (pageTotal !== 1) {
        tempPages.push(renderPageNumber(1));
      }

      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(pageTotal - 1, currentPage + 2);

      if (currentPage <= 4) {
        startPage = 2;
        endPage = Math.min(5, pageTotal - 1);
      } else if (currentPage >= pageTotal - 2) {
        startPage = Math.max(pageTotal - 4, 2);
        endPage = pageTotal - 1;
      }

      if (startPage > 2) {
        tempPages.push(<span key="left-ellipsis">...</span>);
      } else if (pageTotal === 6 && currentPage === 6) {
        tempPages.push(<span key="right-ellipsis">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        tempPages.push(renderPageNumber(i));
      }

      if (
        (pageTotal === 6 && currentPage !== 6) ||
        currentPage < pageTotal - 2
      ) {
        tempPages.push(<span key="right-ellipsis">...</span>);
      }
      tempPages.push(renderPageNumber(pageTotal));
    };

    generatePages();
    setPages(tempPages);
  }, [currentPage, pageTotal]);

  return (
    <StyledDivContainer className="page">
      <TopTitleBar>
        <Title>등록한 공고 목록</Title>
      </TopTitleBar>
      <MiddleContainer>
        <LeftFilterBox>
          {Filterbuttons.map((button) => (
            <FilterButton
              key={button}
              active={activeButton === button}
              onClick={() => handleClick(button)}
            >
              {button.toUpperCase()}
            </FilterButton>
          ))}
        </LeftFilterBox>
        <RightFilterBox>
          <SortContainer>
            <SelectableDiv
              isSelected={selectedSort === "등록순"}
              onClick={() => handleSortChange("등록순")}
            >
              등록순
            </SelectableDiv>
            <DivideLine>|</DivideLine>
            <SelectableDiv
              isSelected={selectedSort === "마감순"}
              onClick={() => handleSortChange("마감순")}
            >
              마감순
            </SelectableDiv>
          </SortContainer>
        </RightFilterBox>
      </MiddleContainer>
      {/* <PlaneLoading /> api 추가 되었을때 loading 처리해주기 */}
      {jobAnnouncements.length === 0 ? (
        <NullContainer>
          <div>아직 등록된 공고가 없어요.</div>
          <div>새 공고를 등록해주세요.</div>
          <button onClick={navToDetail}>
            공고 등록하기 <img src={PlusIcon} alt="plus" />
          </button>
        </NullContainer>
      ) : (
        <MainContainer>
          {jobAnnouncements.map((announcement, index) => (
            <JobAnnouncementCard key={index} announcement={announcement} />
          ))}
        </MainContainer>
      )}
      <PagenationContainer>
        <PagenationButton
          src={currentPage > 1 && pageTotal !== 1 ? prebtn_v2 : prebtn}
          alt="prevbtn"
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
        />
        <PageNumbers>{pages}</PageNumbers>
        <PagenationButton
          src={currentPage === pageTotal ? nextbtn_v2 : nextbtn}
          alt="nextbtn"
          onClick={() =>
            setCurrentPage(
              currentPage < pageTotal ? currentPage + 1 : pageTotal
            )
          }
        />
      </PagenationContainer>
      {jobAnnouncements.length !== 0 ? (
        <PostButton>
          <img src={btnbg} alt="공고등록" onClick={navToDetail} />
        </PostButton>
      ) : null}
    </StyledDivContainer>
  );
};

export default JDListPage;

const StyledDivContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #FBFBFD;
  overflow-x: hidden;
`;

const TopTitleBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const MiddleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  grid-gap: 1rem; 
  margin-top: 1rem;
  box-sizing: border-box;
  /* @media (max-width: 768px) {
    grid-template-columns: 1fr; 
  } */
`;

const LeftFilterBox = styled.div`
    width: 100%;
    flex: 1;
`;

const RightFilterBox = styled.div`
    width: 100%;
    flex: 1;
    justify-content: end;
    display: flex;
    flex-direction: row;
`;

const Title = styled.h1`
  color:#343A5D;
`;

const FilterButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#63698D" : "#EEEFF7")};
  color:  ${(props) => (props.active ? "#FFF" : "#343A5D")};
  margin-right: 5px;
  border: none;
  cursor: pointer;
  padding: 0.6rem 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  border-radius: 0.5rem;
  
  &:focus {
    outline: none;
  }
`;

const SortContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
`;

const SelectableDiv = styled.div<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "#7D82FF" : "#343A5D")};
  background-color: "transparent";
  padding: 0.25rem;
  justify-content: center;
  text-align: center;
  align-items: center;
  cursor: pointer;
`;

const DivideLine = styled.div`
  display: flex;
  color:var(--neutral-500, #A6AAC0);
  font-size: 1.1rem;
  padding-bottom: 0.25rem;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PostButton = styled.div`
  position: fixed;      
  bottom: 4.6rem;       
  right: 5rem;        
  cursor: pointer;      
  z-index: 1000;   
`;

const NullContainer = styled.div`
    display: flex;
    width: 100%;
    height: 20rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div{
        ${(props) => props.theme.fonts.title2}
        color:${(props) => props.theme.colors.neutral700}
    }
    button{
        width: 15rem;
        height: 3rem;
        border: none;
        margin-top: 2rem;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        color: #FFF;
        ${(props) => props.theme.fonts.title4}
        border-radius: 3.125rem;
        background:${(props) => props.theme.colors.main500}
    }
`;

const PagenationContainer = styled.div`
    width: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 2.5rem;
`;

const PagenationButton = styled.img`

`;

const PageNumbers = styled.div`
    display: inline-flex;
    flex-direction: row;
    gap: 0.75rem;
`;

interface ButtonProps {
  activePage: boolean;
}

const buttonActiveStyle = css`
    color: var(--main-500, #7D82FF);
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.25rem;
`;

const PageNumber = styled.div<ButtonProps>`
    color: var(--neutral-500, #A6AAC0);
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    ${({ activePage }) => activePage && buttonActiveStyle}
`;
