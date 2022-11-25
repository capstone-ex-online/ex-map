import React from 'react'
import GlobalStyle from '../components/GlobalStyle';
import Map from '../components/Map'
import MainHeader from '../components/MainHeader'


const MapPage = ({...loginUserProps}) => {

    return (
        <div>
            <GlobalStyle />
            <MainHeader {...loginUserProps} />
            <Map />
        </div>
    )
}

export default MapPage;