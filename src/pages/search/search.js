import { useState } from "react";
import {
  useOutletContext,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  NavLink,
} from "react-router-dom";
import "./search.css";
import { settings } from "../../config/config";

import useXmlHttp from "../../services/useXmlHttp";
import UseFetch from "../../services/useFetch";
import { useAuth } from "../../services/useAuth";
import {
  Grid,
  Segment,
  Header,
  Image,
  Loader,
  Dimmer,
  Container,
  Divider,
  Card,
  Form,
  Button,
} from "semantic-ui-react";


const Search = () => {
  const { error, isLoading, data: response, getAll, search } = UseFetch();

  const handleSearch = (e) => {
    e.preventDefault();
    const term = document.getElementById("album-search-term").value;
    // if (term == "") setSubHeading("Search");
    // else if (isNaN(term))
    //   setSubHeading("Artists containing term '" + term + "'");
    // search(term);
    };
    
  const clearSearchBox = (e) => {
    e.preventDefault();
    document.getElementById("album-search-term").value = "";
    search("");
  };

  return (
    <Grid columns={1} padded style={{ padding: "0px 5px" }}>
 
   

      {error && <div>{error}</div>}

      {isLoading && (
        <Dimmer page active>
          <Loader
            inline="centered"
            size="huge"
            inverted
            active
            content="Loading"
          />
        </Dimmer>
      )}
    </Grid>
  );
};

export default Search;
