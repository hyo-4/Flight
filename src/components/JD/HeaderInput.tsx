import styled from "styled-components";

const HeaderInput = () => {
  return (
    <HeaderContainer>
      <Header placeholder="자기소개서 문항을 옮겨 적어주세요." />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: var(--neutral-50, #fbfbfd);
  margin: 1rem 0rem;
`;
const Header = styled.input`
  width: 100%;
  ${(props) => props.theme.fonts.subtitle1};
  color: ${(props) => props.theme.colors.neutral700};
  border: none;
  background-color: transparent;
  outline: none;
  padding: 12px 24px;
`;

export default HeaderInput;
