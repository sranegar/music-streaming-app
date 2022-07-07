import { Menu, Grid, Segment, Icon } from "semantic-ui-react";
import { useAuth } from "../services/useAuth";

const MusicPlayer = ({ curPlaying, activeSong }) => {
  const { user } = useAuth();
 

  return (
    <Segment basic padded>
      {user && (
        <Menu
          widths={1}
          fixed="bottom"
          style={{ backgroundColor: "#010204f1", padding: "5px" }}
        >
          <Menu.Item style={{ padding: "0px" }}>
            <audio src={curPlaying} autoPlay={true} controls />
          </Menu.Item>
        </Menu>
      )}
    </Segment>
  );
};

export default MusicPlayer;
