import React from 'react';
import {Link} from 'react-router-dom';
import './RepoPreview.css'


export const RepoPreview = ({repositoryData}) => {

    const repositoryThemes = ['pink','light-green','blue','orange','purpl']

    const formatDate= (date) => {

        let dd = date.getDate();
        if (dd < 10) dd = '0' + dd;
      
        let mm = date.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
      
        let yy = date.getFullYear() % 100;
        if (yy < 10) yy = '0' + yy;

        let hh = ("0" + date.getHours()).slice(-2)

        let mins = ("0" + date.getMinutes()).slice(-2)

        return dd + '.' + mm + '.' + yy + " " + hh + ":" + mins;
      }

    return(
    <div className={`repository repository_${repositoryThemes[repositoryData.repository_theme_number - 1]}`}>
        <div className="repository__header">
            <Link to={{
                pathname:`/repository-card/${repositoryData.name}`,
                repositoryData: repositoryData,
                }}
                style={{ textDecoration: 'none' }}>
                <p className="repository__title" >{repositoryData.name}</p>
            </Link>
        </div>
        <div className="repository__main">
            <div className="repository__stars">
                <div className="repository__stars-icon">
                    <svg height="16" className="repository__octicon-star" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fillRule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                </div>
                <p className="repository__stars-text">Stars:</p>
                <p className="repository__stars-count">{repositoryData.stargazers_count}</p>
            </div>
        </div>
        <div className="repository__footer">
            <div className="repository__commit">
                <p className="repository__commit-text">
                    Last commit: 
                </p>
                <p className="repository__commit-date">
                    {formatDate(new Date(repositoryData.updated_at))}
                </p>
            </div>
            <a href={repositoryData.html_url} className="repository__link">
                <svg height="24" className="repository__octicon-mark-github" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            </a>
        </div>
    </div>
    )
}


