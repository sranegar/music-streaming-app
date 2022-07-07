import {Grid} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import '../app.css';


const Home = () => {
    return (
        <Grid  centered padded style={{minHeight: '100vh', color: 'white'}}>
            <Grid.Row>
                <Grid.Column className='home-wrapper' textAlign='center'>
                    <h1 className='home-h1'>Stream Music</h1>
                    <p className='home-subheader'>Discover and stream music for <span className='free-text'>free</span> at anytime.</p>
                    <NavLink to='/artists'>
                        <button className="glow-on-hover" type="button">Dive in</button>
                    </NavLink>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
};

export default Home;