import React, {useState,useEffect} from 'react';
import './RepoCard.css'

export const RepoCard = (props) => {
    const repositoryData = props.location.repositoryData;
    const repositoryThemes = props.location.repositoryThemes;
    const formatDate = (date)=> props.location.formatDate(date);

    const [repoLangs,setRepoLangs] = useState([])
    const [contributors,setContributors] = useState([])

    const getRepoLangs = async()=>{
        const response = await fetch(repositoryData.languages_url)
        const data = await response.json();
        setRepoLangs(Object.keys(data))
    }
    
    const getContributors= async()=>{
        const response = await fetch(repositoryData.contributors_url)
        const data = await response.json();
        setContributors((data.slice(0,10)))
    }

    useEffect(()=>{ 
        getRepoLangs();
        getContributors();
    },[])

    return(
        <div className={`repository-card repository_${repositoryThemes[repositoryData.repository_theme_number - 1]}`}>
            <div className="repository-card__left-side">
                <div className="repository-card__header">
                    <p className="repository-card__title">
                        {repositoryData.name}
                    </p>
                    <div className="repository-card__stars">
                        <div className="repository-card__stars-icon">
                            <svg height="16" className="repository-card__octicon-star" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                        </div>
                        <p className="repository-card__stars-text">Stars:</p>
                        <p className="repository-card__stars-count">{repositoryData.stargazers_count}</p>
                    </div>
                    <div className="repository-card__commit">
                        <p className="repository-card__commit-text">
                            Last commit: 
                        </p>
                        <p className="repository-card__commit-date">
                            {formatDate(new Date(repositoryData.updated_at))}
                        </p>
                    </div>
                </div>
                <div className="repository-card__main">
                    <div className="repository-card__description">
                        <p className="repository-card__description-text">
                            {repositoryData.description}
                        </p>
                    </div>
                    <div className="repository-card__owner">
                        <p className="repository-card__owner-title">
                            Owner:
                        </p>
                        <div className="repository-card__owner-main">
                            <div className="repository-card__owner-img-wrapper">
                                <img src={repositoryData.owner.avatar_url} alt="" className="repository-card__owner-img"/>
                            </div>
                            <a href={repositoryData.owner.html_url} className="repository-card__owner-nickname">
                                {repositoryData.owner.login}
                            </a>
                        </div>
                    </div>
                    {repoLangs&& 
                        <div className="repository-card__langs">
                            <p className="repository-card__langs-title">
                                Languages ​​used:
                            </p>
                            <div className="repository-card__langs-list">
                                {repoLangs.map((repoLang,idx)=>{
                                    return <div key={idx} className="repository-card__langs-list-item">{repoLang}</div>
                                })}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="repository__right-side">
                <div className="repository-card__contributors">
                    <p className="repository-card__contributors-title">
                        Most active contributors:
                    </p>
                    <div className="repository-card__contributors-main">
                        {contributors&&contributors.map((contributor,idx)=>{
                            return (
                                <div key={idx} className="repository-card__contributors-item repository-card__contributor">
                                    <div className="repository-card__contributor-img-wrapper">
                                        <img src={contributor.avatar_url} alt="" className="repository-card__contributor-img"/>
                                    </div>
                                    <div className="repository-card__contributor-info">
                                        <a href={contributor.html_url} className="repository-card__contributor-nickname">{contributor.login}</a>
                                        <p className="repository-card__contributor-contributions-text">
                                            Contributions: <span className="repository-card__contributor-contributions-amount">{contributor.contributions}</span> 
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
           </div>
    )
}


