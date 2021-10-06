import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import noImage from '../noimage.png';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    //document.title = `NewsTiger - ${this.capitalize(props.category)}`;

    const capitalize = (string) => {
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

    const updateNews = async()=> {
        props.setProgress(20); //This is used to load progress bar at the top of the page
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        props.setProgress(35);
        setLoading(true);
        props.setProgress(45);
        let data = await fetch(url);
        props.setProgress(70);
        let parsedData = await data.json();
        props.setProgress(90);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);

        props.setProgress(100);
    }

    useEffect(() => {
        console.log('useEffect starts');
        document.title = `${capitalize(props.category)} - NewsMonkey`;
        updateNews(); 
        console.log('useEffect Ends');
        // eslint-disable-next-line
    }, [])

    /* handleClickPrev = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page: .page - 1,
        //     article: parsedData.articles,
        //     loading: false
        // });
        this.setState({ page: .page - 1 });
        this.update();
    } */

    /* handleClickNext = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${.page + 1}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     page: .page + 1,
        //     article: parsedData.articles,
        //     loading: false
        // });
        this.setState({ page: .page + 1 });
        this.update();
    } */

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1 );
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };

            return (
            <>
                <h1 className="text-center" style={{ margin: '40px 0px' }}>NewsTiger - Top {capitalize(props.category)} Headlines</h1>
                {loading && <Spinner />}

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults} //to be changed
                    loader={<Spinner />} //add spinner here *<h4>Loading...</h4>*
                >
                    
                        <div className="row" style={{width: '90%', margin:'auto'}}>
                            {!loading && articles.map((element) => {

                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title?element.title.slice(0, 50) : "*No Title to display*"} description={element.description?element.description.slice(0, 100) : "Click on 'Read More' to know more about the story"} imageUrl={element.urlToImage?element.urlToImage : { noImage }} url={element.url} author={element.author?element.author : "unknown"} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    
                </InfiniteScroll>


                {/*Previous and Next button*/}
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={.page <= 1} className="btn btn-dark" onClick={this.handleClickPrev}>&larr; Previous</button>
                    <button type="button" disabled={.page + 1 > Math.ceil(.totalResults / props.pageSize)} className="btn btn-dark" onClick={this.handleClickNext}>Next &rarr;</button>
                </div> */}
            </>
        )
    }


News.defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 15,
    totalResults: 0
}
News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
}
