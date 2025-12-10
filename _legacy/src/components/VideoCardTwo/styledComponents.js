import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const NavLink = styled(Link)`
  color: ${props => props.textColor};
  text-decoration: none;

  margin-bottom: 10px;
`

export const VideoCardContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  list-style-type: none;
  cursor: pointer;
  margin: 0px;

  border-bottom: 1px solid #000000;
  padding-bottom: 10px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0px;
  }
`

export const ThumbnailImage = styled.img`
  height: 250px;
  object-fit: scale-down;
`
export const VideoCardBottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

export const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 10px;
`
export const VideoDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  width: 100%;
`
export const VideoDetailsText = styled.p`
  color: ${props => props.textColor};
  font-family: 'Roboto';
  font-size: ${props => props.size}px;
  font-weight: bold;
  width: 80%;
`

export const SmallDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: 'space-around';
  align-items: center;
  width: 80%;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: 'space-around';
    align-items: 'center';

    padding-left: '0px';
    margin-left: '0px';
    margin-right: '10px';
  }
`
