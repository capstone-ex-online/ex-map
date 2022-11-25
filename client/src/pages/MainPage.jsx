import React from 'react'
import GlobalStyle from '../components/GlobalStyle'
import Main from '../components/Main'
const MainPage = ({...loginUserProps}) => {
    return (
        <div>
            <GlobalStyle />
            <Main {...loginUserProps} />
        </div>
    )
}

export default MainPage;