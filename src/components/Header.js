/*
Name: Adebayo Onifade
Date: 6/10/2022
File: Header.js
Description: Create the page header
*/

import {Grid, Button, Input, Icon, Dropdown} from 'semantic-ui-react';
import {NavLink} from "react-router-dom";
import './components.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeadphonesSimple} from '@fortawesome/free-solid-svg-icons'
import {useAuth} from "../services/useAuth";
import {useState} from 'react';


const TopNav = () => {
    const [showMenu, setShowMenu] = useState(false)
    const {isAuthed, user} = useAuth();
    const className = ({isActive}) => isActive ? "nav-link active" : "nav-link";

    const options = [
        {
            key: 'user',
            text: (
                <span>
                    You are signed in.
                </span>
            ),
            disabled: true,
        },
        {key: 'signout', text: (<NavLink to="/signout">Sign out</NavLink>)},
    ]

    function handleOnClick() {
        setShowMenu(!showMenu)
    }

    return (

        <Grid className='nav-bar' columns={12} reversed centered padded stackable verticalAlign='middle'
              style={{backgroundColor: '#312a77'}}>

            <Grid.Column className='device'>
                <Icon name='bars' color='grey' size='large' onClick={handleOnClick} style={{cursor: 'pointer'}}/>
            </Grid.Column>

            {showMenu &&
                <Grid.Row className='device'>
                    <Grid.Column textAlign='center'>
                        <NavLink className='nav-links' to="/" onClick={() => setShowMenu(false)}>Home</NavLink>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        <NavLink className='nav-links' to="/artists"
                                 onClick={() => setShowMenu(false)}>Artists</NavLink>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        <NavLink className='nav-links' to="/albums" onClick={() => setShowMenu(false)}>Albums</NavLink>
                    </Grid.Column>
                    <Grid.Column textAlign='center'>
                        <NavLink className='nav-links' to="/tracks" onClick={() => setShowMenu(false)}>Tracks</NavLink>
                    </Grid.Column>
                    <Grid.Column>
                        {isAuthed
                            ? <Button fluid className='logout-btn'  compact size='tiny' basic color='grey'> <Dropdown
                                trigger={<span><Icon size='large' name='user circle' color='green'
                                                     style={{marginRight: '8px'}}/>{user.name} </span>} options={options}/></Button>
                            :
                            <NavLink to="/signin" className={className}> <Button className='login-btn' fluid basic inverted
                                                                                 color='teal' content='Login' icon='user'
                                                                                 size='small'
                            ></Button></NavLink>
                        }

                    </Grid.Column>
                </Grid.Row>
            }

            <Grid.Row className='desktop'>
                <Grid.Column>
                    <NavLink to="/">
                        <FontAwesomeIcon className='logo' icon={faHeadphonesSimple} size="3x"/>
                    </NavLink>
                </Grid.Column>

                <Grid.Column textAlign='center'>
                    <NavLink className='nav-links' to="/">Home</NavLink>
                </Grid.Column>

                <Grid.Column textAlign='center'>
                    <NavLink className='nav-links' to="/artists">Artists</NavLink>
                </Grid.Column>

                <Grid.Column textAlign='center'>
                    <NavLink className='nav-links' to="/albums">Albums</NavLink>
                </Grid.Column>

                <Grid.Column textAlign='center'>
                    <NavLink className='nav-links' to="/tracks">Tracks</NavLink>
                </Grid.Column>

                <Grid.Column width={6}>

                </Grid.Column>
                <Grid.Column width={2}>
                    {isAuthed
                        ? <Button className='logout-btn' fluid compact size='tiny' basic inverted circular> <Dropdown
                            trigger={<span><Icon size='large' name='user circle' color='green'
                                                 style={{marginRight: '8px'}}/>{user.name} </span>} options={options}/></Button>
                        :
                        <NavLink to="/signin" className={className}> <Button className='login-btn' fluid basic inverted
                                                                             color='teal' content='Login' icon='user'
                                                                             size='small'
                        ></Button></NavLink>
                    }

                </Grid.Column>

            </Grid.Row>
        </Grid>

    )
}

export default TopNav;