import React, {useState,useEffect,useRef} from 'react';
import './HomePage.css'
import {RepoPreview} from '../RepoPreview/RepoPreview'

export const HomePage = () => {
    const [searchValue, setSearchValue] = useState(localStorage.getItem("github_dashboard") ? JSON.parse(localStorage.getItem("github_dashboard")).search_value : "")
    const [repositories, setRepositories] = useState([])
    const [pagination, setPagination] = useState([])
    const [pagesCount, setPagesCount] = useState(1)
    const [pageNumber,setPageNumber] = useState(localStorage.getItem("github_dashboard") ? JSON.parse(localStorage.getItem("github_dashboard")).page_number : 1)
    const [firstPage,setFirstPage] = useState(true)
    const [lastPage,setLastPage] = useState(false)
    const isMountRef = useRef(true);
 
    const requestUrl = `https://api.github.com/search/repositories?q=${searchValue}&sort=stars&order=desc&per_page=10&page=${pageNumber}`

    useEffect(() => {
        isMountRef.current = false;
        return 
      }, []);

    useEffect(()=>{
        if(!searchValue.trim()){
            setSearchValue('')
            const searchTopRepos = async()=>{
                const response = await fetch(`https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=10&page=1`)
                const data = await response.json();
                const repositoryData = data.items && data.items.map(el=>{
                    return {
                        ...el,
                        'repository_theme_number' : Math.floor(Math.random() * 5) + 1
                    }
                })
                setRepositories(repositoryData)
                setPagination([])
            }
            searchTopRepos()
        }else{
            const searchRepos = async(targetUrl)=>{
                const response = await fetch(targetUrl)
                const data = await response.json();
                const link = response.headers.get("link")
                const repositoryData = data.items && data.items.map(el=>{
                    return {
                        ...el,
                        'repository_theme_number' : Math.floor(Math.random() * 5) + 1
                    }
                })
                setRepositories(repositoryData)
                if(link){
                    createPaginator(link)
                } else{
                    setPagesCount(0)
                    setPagination([]) 
                }
            }
            searchRepos(requestUrl)
        }
        if(isMountRef.current){
            setPageNumber(1)
        }
        updateData();
    },[searchValue])

    useEffect(()=>{
        const searchRepos = async(targetUrl)=>{
            const response = await fetch(targetUrl)
            const data = await response.json();
            const repositoryData = data.items && data.items.map(el=>{
                return {
                    ...el,
                    'repository_theme_number' : Math.floor(Math.random() * 5) + 1
                }
            })
            setRepositories(repositoryData)
        }
        searchRepos(requestUrl)
        updateData();
    },[pageNumber])

    useEffect(()=>{
        if(pagesCount<1){
            return;
        }else if(+pagesCount<5){
            let pages = []
            for(let i=1; i<=pagesCount;i++){
                pages.push(i)
            }
            setPagination(pages)
        }else{
            if(+pageNumber===10){
                setPagination([6,7,8,9,10])
            }
            else if(pageNumber>4){
                const paginationTemp = [];
                for(let i=0;i<5;i++){
                    paginationTemp.push(pageNumber-3+i)
                }
                setPagination(paginationTemp)
            }else{
                setPagination([1,2,3,4,5])
            }  
        }
    },[pagesCount])

    useEffect(()=>{
        if(+pageNumber===1){
            setFirstPage(true)
        }else if(+pageNumber===10){
            setFirstPage(false)
            setLastPage(true)
        }else{
            setFirstPage(false)
            setLastPage(false)
        }
    },[pageNumber])


    const createPaginator = (link) =>{
        const links =  link.split(",")
        links.forEach(link=>{
            const  url =  link.split(";")[0].replace("<","").replace(">","")
            const  title = link.split(";")[1].split("=")[1].replace(`"`,"").replace(`"`,"")
            if(title==="last"){
                const pagesCountTemp = url.match(/&page=(\d+).*$/)[1]
                if(pagesCountTemp>10){
                    setPagesCount(10)
                }else{
                    setPagesCount(pagesCountTemp)
                }
            }
        }) 
    }

    const handlerClickPaginator = (event) => {
        let numberOfPage = +pageNumber;
        if(event.target.closest('.paginator__arrow-prev') && +pageNumber!==1){
            numberOfPage-=1;
            if(+pageNumber === +pagination[0]){ 
                setPagination(pagination.map(el=>el-=1))
            }
        }else if(event.target.closest('.paginator__arrow-next')&& +pageNumber < +pagesCount && +pageNumber<10){
            numberOfPage+=1;
            if(+pageNumber === +pagination[pagination.length-1]){
                setPagination(pagination.map(el=>el+=1))
            }
        }else if(event.target.closest('.paginator__item')){
            numberOfPage  = event.target.textContent;
            if(+numberOfPage === +pagination[pagination.length-1] && +numberOfPage< +pagesCount && +numberOfPage<10){
                setPagination(pagination.map(el=>el+=1))
            }else if(+numberOfPage === +pagination[0] && +numberOfPage!==1){
                setPagination(pagination.map(el=>el-=1))
            }
        }

        setPageNumber(numberOfPage)
    }

    const updateData = () => {
        const dataToUpdate = {
            search_value: searchValue,
            page_number: pageNumber,
        }
        localStorage.setItem("github_dashboard",JSON.stringify(dataToUpdate))
    }

    return(
        <>
        <header className="header">
            <h1><svg height="24" viewBox="0 0 16 16" version="1.1" width="24" aria-hidden="true"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="#000000"></path></svg> Github Dashboard</h1>
        </header>
        <section className="search">
            <div className="search__search-line search-line">
                <input 
                    className="search-line__input" 
                    type="text"
                    placeholder="Type repository name..."
                    onChange={(event)=>setSearchValue(event.target.value)}
                    value = {searchValue}
                />
            </div>

            <div className="search__results">
                {repositories && repositories.length>1 ? repositories.map((repository,idx)=>{
                    return <RepoPreview key={idx} repositoryData={repository}/>
                })
                :
                <p className="search__no-results">
                    No results for {searchValue}
                </p>
                }
            </div>
            {pagination && pagination.length>1 &&
                <div className="search__results-paginator paginator" onClick={(event)=>handlerClickPaginator(event)}>
                    <div className={`paginator__arrow-prev ${firstPage?"paginator__arrow-prev_disabled":""}`}>
                        <p>&lt;</p>
                    </div>
                    <div className="paginator__items">
                    {pagination.map((paginationPage,idx)=>{
                        return (
                            <p key={idx} className={`paginator__item${+paginationPage === +pageNumber ? " pagination__item_active" : ""}`}>
                                {paginationPage}
                            </p>
                        )
                    })}
                    </div>
                    <div className={`paginator__arrow-next ${lastPage?"paginator__arrow-next_disabled":""}`}>
                        <p>></p>
                    </div>
                </div>
            }
        </section>
        </>
    )
}


