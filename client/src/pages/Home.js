import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostMasonry from '../components/PostMasonry'
import PostGrid from '../components/PostGrid'
import { listPosts } from '../actions/postActions'
import Loader from '../components/Loader'
import {PlusCircleOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import { getAllCategories } from '../actions/categoriesAction'
import Meta from '../components/Meta'


export default function Home({match}) {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const allPosts = useSelector(state => state.allPosts)
    const {isLoading, error, posts, page, pages} = allPosts
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(listPosts(keyword, pageNumber))
        dispatch(getAllCategories())
    },[dispatch, keyword, pageNumber])
    
    
     const recentPosts =[...posts, ...posts, ...posts]
        const windowWidth = window.innerWidth
    return (
        <>
        <Meta/>
        {isLoading ? <h1><Loader/></h1> : error ?(<h1>{error.message}</h1>) :
        (<div className='home'>
           <div> {userInfo ? <Link to='/create'><PlusCircleOutlined /></Link> :<Link to='/login'><PlusCircleOutlined /></Link> }</div> 
           {windowWidth >900 ?
        <section className='container'>
        <div className='row'>
            <h2>trending Posts</h2>
            <PostMasonry columns={3} tagsOnTop={true}/>
        </div>
        </section> :''}
    <section className='container'>
        <div className='row'>
            <h2>recent posts</h2>
            <PostGrid posts={recentPosts} tagsOnTop={true} page={page} pages={pages} pageNumber={pageNumber}/>
        </div> 
    </section>
    </div>)}
        </>
    )
}


