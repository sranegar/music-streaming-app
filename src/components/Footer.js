/*
Name: Stephanie Ranegar
Date: 6/10/2022
File: Footer.js
Description: create the page footer
*/

import {Grid} from 'semantic-ui-react';

const Footer = () => {
    return (

        <Grid centered style={{backgroundColor: '#15161CFF', color: 'white'}}>
            <Grid.Row>
                <Grid.Column textAlign='center' style={{
                    fontSize: '9px',
                    letterSpacing: '1.3px',
                    fontFamily: 'helvetica',
                    color: 'rgba(135,135,135,0.78)'
                }}>
                    2022 Music App &copy; All Rights Reserved
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
};

export default Footer;