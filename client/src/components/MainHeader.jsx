import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = styled.div`
  height:85px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color:white;
`;

const LogoLink = styled.div`
  .logo__link {
    font-family: 'KoHo';
  font-weight: 700;
  font-size: 35px;
  text-align: center;
  color: #000000;
  text-decoration: none;
  }
`

const NavUl = styled.ul`
  display: flex;
  list-style: none;

  .navigation__link {
    margin-inline: 40px;

    font-family: 'Inter';
    font-style: normal;
    font-size: 23px;
    font-weight: 400;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: center;

    color:#000000;
    text-decoration: none;
  }

`;

const LoginUl = styled.ul`
  display: flex;
  padding: 15px;
  list-style: none;

  .loginOut__link {
    margin-inline: 5px;
    font-family: 'Inter';
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: center;

    color: #818181;
    text-decoration: none;
  }

`;

function LogoFunc(){
  return (
    <LogoLink>
      <Link to="/" className='logo__link'>EX-MAP</Link>
    </LogoLink>
  )
}

function Nav(){
  return <NavUl>
    <li><Link to="/exhibition" className="navigation__link">전시</Link></li>
    <li><Link to="/map" className="navigation__link">지도</Link></li>
    <li><Link to="/promotion" className="navigation__link">홍보</Link></li>
    <li><Link to="/review" className="navigation__link">후기</Link></li>
    <li><Link to="/qna" className="navigation__link">Q&amp;A</Link></li>
  </NavUl>
}

function LoginOut(loginId){
  if(loginId.loginId !== undefined && loginId.loginId !== '') {
    return <div>
      <LoginUl>
        <li><a href="/" className='loginOut__link'>로그아웃</a></li>
        <li>|</li>
        <li><Link to={"/mypage/"+loginId.loginId} className='loginOut__link'>마이페이지</Link></li>
      </LoginUl>
    </div>
  }

  return <div>
    <LoginUl>
      <li><Link to="/login" className='loginOut__link'>로그인</Link></li>
      <li>|</li>
      <li><Link to="/signup" className='loginOut__link'>회원가입</Link></li>
    </LoginUl>
  </div>
}

function MainHeader({ loginId, loginState, loginName }) {
  return (
    <>
    <Header>
    <LogoFunc></LogoFunc>
    <Nav></Nav>
    <LoginOut loginId={loginId} ></LoginOut>
    </Header>
    </>
  );
}

export default MainHeader;