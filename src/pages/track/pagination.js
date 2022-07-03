/*
Name: Stephanie Ranegar
Date: 6/16/2022
File: pagination.js
Description: This script creates functionality for pagination for tracks
*/


import {settings} from "../../config/config";
import {useState, useEffect} from "react";

import {Grid, Header,Segment} from "semantic-ui-react";

import React from 'react';
import {Link} from "react-router-dom";

const Paginate = ({tracks, setUrl}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(tracks.limit);
    const [offset, setOffset] = useState(0);
    const [sort, setSort] = useState("title:asc");
    const [pages, setPages] = useState({});  //first, last, previous, and next pages


    useEffect(() => {
        if (tracks) {
            let pages = {};
            setLimit(tracks.limit);
            setOffset(tracks.offset);
            setTotalPages(Math.ceil(tracks.totalCount / limit));
            setCurrentPage(tracks.offset / tracks.limit + 1);

            //Extract offset from each link and store it in pages
            tracks.links.map((link) => {
                pages[link.rel] = link.href;
            });

            if (!pages.hasOwnProperty('prev')) {
                pages.prev = pages.self;
            }

            if (!pages.hasOwnProperty('next')) {
                pages.next = pages.self;
            }
            setPages(pages);
        }
    }, [tracks]);

    const handlePageClick = (e) => {
        setUrl(e.target.id + "&sort=" + sort);
    }

    const setItemsPerPage = (e) => {
        setLimit(e.target.value);
        setOffset(0);
        setUrl(`${settings.baseApiUrl}/tracks?limit=${e.target.value}&offset=0&sort=${sort}`);
    }

    const sortTracks = (e) => {
        setSort(e.target.value);
        setUrl(`${settings.baseApiUrl}/tracks?limit=${limit}&offset=${offset}&sort=${e.target.value}`);
    }


    return (
        <>
            {tracks && <Grid.Column textAlign='center'>
                <Grid  columns={16} centered style={{paddingTop: '0px'}}>

                    <Grid.Column> <Link to="#" id={pages.first} onClick={handlePageClick} className='pagination'
                                        style={{
                                            color: '#A7A7A7B2',
                                            fontSize: '16px',
                                            fontFamily: 'Impact fantasy'
                                        }}>&lt;&lt;</Link>
                    </Grid.Column>
                    <Grid.Column textAlign='center'> <Link to="#" id={pages.prev} onClick={handlePageClick}
                                                           style={{
                                                               color: '#A7A7A7B2',
                                                               fontSize: '16px',
                                                               fontFamily: 'Impact fantasy'
                                                           }}>&lt;</Link>
                    </Grid.Column>
                    <Header style={{margin: '0px', padding: '0 100px 0px'}} as='h6'
                            inverted>{currentPage} / {totalPages}&nbsp;</Header>
                    <Grid.Column textAlign='center'> <Link to="#" id={pages.next} onClick={handlePageClick}
                                                           style={{
                                                               color: '#A7A7A7B2',
                                                               fontSize: '16px',
                                                               fontFamily: 'Impact fantasy'
                                                           }}>&gt;</Link>
                    </Grid.Column>
                    <Grid.Column textAlign='right'> <Link to="#" id={pages.last} onClick={handlePageClick}
                                                          style={{
                                                              color: '#A7A7A7B2',
                                                              fontSize: '16px',
                                                              fontFamily: 'Impact fantasy'
                                                          }}>&gt;&gt;</Link>
                    </Grid.Column>
                </Grid>
                <Segment floated='right' basic style={{padding: '0px 60px 0px 0px'}}>
                    <select onChange={sortTracks}>
                        <option value="title:asc">Title A-Z</option>
                        <option value="title:desc">Title Z-A</option>
                    </select>
                </Segment>
                    <Segment floated='right' basic style={{padding: '0px'}}>
                        <select onChange={setItemsPerPage} defaultValue={limit}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value={tracks.totalCount}>All</option>
                        </select>
                    </Segment>
            </Grid.Column>}
        </>
    );
};

export default Paginate;