/*
Name: Stephanie Ranegar
Date: 6/16/2022
File: pagination.js
Description: This script creates functionality for pagination for artists
*/


import {settings} from "../../config/config";
import {useState, useEffect} from "react";
import {Grid, Header} from "semantic-ui-react";
import React from 'react';
import {Link} from "react-router-dom";

const Paginate = ({artists, setUrl}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(artists.limit);
    const [offset, setOffset] = useState(0);
    const [sort, setSort] = useState("name:asc");
    const [pages, setPages] = useState({});  //first, last, previous, and next pages


    useEffect(() => {
        if(artists) {
            let pages = {};
            setLimit(artists.limit);
            setOffset(artists.offset);
            setTotalPages(Math.ceil(artists.totalCount/limit));
            setCurrentPage(artists.offset/artists.limit + 1);

            //Extract offset from each link and store it in pages
            artists.links.map((link) => {
                pages[link.rel] = link.href;
            });

            if(!pages.hasOwnProperty('prev')) {
                pages.prev = pages.self;
            }

            if(!pages.hasOwnProperty('next')) {
                pages.next = pages.self;
            }
            setPages(pages);
        }
    },[artists]);

    const handlePageClick = (e) => {
        setUrl(e.target.id + "&sort=" + sort);
    }

    const setItemsPerPage = (e) => {
        setLimit(e.target.value);
        setOffset(0);
        setUrl(`${settings.baseApiUrl}/artists?limit=${e.target.value}&offset=0&sort=${sort}`);
    }

    const sortArtists = (e) => {
        setSort(e.target.value);
        setUrl(`${settings.baseApiUrl}/artists?limit=${limit}&offset=${offset}&sort=${e.target.value}`);
    }

    const options = [
        {value: '2', text: '2'},
        {value: '4', text: '4'},
        {value: '8', text: '8'},
        {value: '10', text: '10'}
    ]

    const sortOptions = [
        {value: "id:asc", text: "ID A-Z"},
        {value: "id:desc", text: "ID Z-A"},
        {value: "name:asc", text: "Name A-Z"},
        {value: "name:desc", text: "Name Z-A"},
    ]

    return (
        <>
            {artists && <Grid.Column textAlign='center'>
                <Header as='h5' inverted>Showing page {currentPage} of {totalPages}&nbsp;</Header>
                <Grid centered padded>
                    <Link to="#" title="First page" id={pages.first} onClick={handlePageClick} style={{color: '#A7A7A7B2', height: '40px'}}>First</Link>
                    <Link to="#" title="Previous page" id={pages.prev} onClick={handlePageClick} style={{color: '#A7A7A7B2', height: '40px'}}>Prev</Link>
                    <Link to="#" title="Next page" id={pages.next} onClick={handlePageClick} style={{color: '#A7A7A7B2', height: '40px'}}>Next</Link>
                    <Link to="#" title="Last page" id={pages.last} onClick={handlePageClick} style={{color: '#A7A7A7B2', height: '40px'}}>Last</Link>
                </Grid>
                <Grid centered>
                    <span>Items per page </span>
                    <select onChange={setItemsPerPage} defaultValue={limit}>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="10">10</option>
                    </select>
                <span>Sort by </span>
                    <select onChange={sortArtists}>
                        <option value="name:asc">Name A-Z</option>
                        <option value="name:desc">Name Z-A</option>
                    </select>
                </Grid>
            </Grid.Column>}
        </>
    );
};

export default Paginate;