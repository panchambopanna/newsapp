import React from 'react'

export default function NewsItem(props) {
    

        let { title, description, imageUrl, url, author, date, source } = props;

        return (
            <div className="my-3">                
                <div className="card" style={{ boxShadow: '2px 1px 5px gray' }}>
                <span className="position-absolute badge rounded-pill bg-danger" style={{top:'-10px', right: '-15px', zIndex: '1'}}>{source}</span>
                    <img src={imageUrl} style={{ height: '250px' }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author}, {new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}</small></p>
                        <a href={url} target='_blank' rel='noreferrer' className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }

