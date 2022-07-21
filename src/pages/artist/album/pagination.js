/*
Name: Stephanie Ranegar
Date: 6/16/2022
File: pagination.js
Description: This script creates functionality for pagination for albums
*/


import {settings} from "../../../config/config";
import {useState, useEffect} from "react";
import {Grid, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";

const Paginate = ({albums, setUrl, setTerm}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(albums.limit);
    const [offset, setOffset] = useState(0);
    const [sort, setSort] = useState("title:asc");
    const [pages, setPages] = useState({});  //first, last, previous, and next pages


    useEffect(() => {
        if (albums) {
            let pages = {};
            setLimit(albums.limit);
            setOffset(albums.offset);

            setTotalPages(Math.ceil(albums.totalCount / limit));
            setCurrentPage(albums.offset / albums.limit + 1);

            //Extract offset from each link and store it in pages
            albums.links.map((link) => {
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
    }, [albums]);

    const handlePageClick = (e) => {
        setUrl(e.target.id + "&sort=" + sort);
    }

    const setItemsPerPage = (e) => {
        setLimit(e.target.value);
        setOffset(0);
        setUrl(`${settings.baseApiUrl}/albums?limit=${e.target.value}&offset=0&sort=${sort}`);
    }

    const sortArtists = (e) => {
        setSort(e.target.value);
        setUrl(`${settings.baseApiUrl}/albums?limit=${limit}&offset=${offset}&sort=${e.target.value}`);
    }

    return (
        <>
            {albums && <Grid.Column textAlign='center'>
                <Grid centered padded style={{paddingTop: '20px'}}>
                    <Header style={{margin: '0px'}} as='h6' inverted>{currentPage} / {totalPages}&nbsp;</Header>
                    <Grid.Row>
                        <Grid.Column> <Link to="#" id={pages.first} onClick={handlePageClick} className='pagination'
                                            style={{color: '#A7A7A7B2', fontSize: '16px', fontFamily: 'Impact fantasy'}} >&lt;&lt;</Link>
                        </Grid.Column>
                        <Grid.Column textAlign='center'> <Link to="#" id={pages.prev} onClick={handlePageClick}
                                            style={{color: '#A7A7A7B2', fontSize: '16px', fontFamily: 'Impact fantasy'}}>&lt;</Link>
                        </Grid.Column>
                        <Grid.Column textAlign='center'> <Link to="#" id={pages.next} onClick={handlePageClick}
                                            style={{color: '#A7A7A7B2', fontSize: '16px', fontFamily: 'Impact fantasy'}}>&gt;</Link>
                        </Grid.Column>
                        <Grid.Column textAlign='right'> <Link to="#" id={pages.last} onClick={handlePageClick}
                                            style={{color: '#A7A7A7B2', fontSize: '16px', fontFamily: 'Impact fantasy'}}>&gt;&gt;</Link>
                        </Grid.Column>

                    </Grid.Row>
                    <Grid.Row columns={5}>
                        <Grid.Column textAlign='center'>  <span style={{fontSize: '12px', fontVariantCaps: 'small-caps', verticalAlign: 'middle', paddingRight: '20px'}}>Items per page</span>
                            <select onChange={setItemsPerPage} defaultValue={limit} >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value={albums.totalCount}>All</option>
                            </select></Grid.Column>
                    <Grid.Column textAlign='center'> <span style={{fontSize: '12px', fontVariantCaps: 'small-caps', paddingRight: '20px'}}>Sort by</span>
                        <select onChange={sortArtists} >
                            <option value="title:asc">Title A-Z</option>
                            <option value="title:desc">Title Z-A</option>
                        </select></Grid.Column>
                    </Grid.Row>
                </Grid>

            </Grid.Column>}
        </>
    );
};

export default Paginate;