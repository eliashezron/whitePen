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
import { getTopUsers } from '../actions/userActions'
import Usercard from '../components/Usercard'
import StickyBox from "react-sticky-box/dist/esnext";
import { Divider } from 'antd'
export default function Home({match}) {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const allPosts = useSelector(state => state.allPosts)
    const {isLoading, error, posts, page, pages} = allPosts
    const loginUser = useSelector(state => state.loginUser)
    const {userInfo} = loginUser
    const topUsers = useSelector(state => state.topUsers)
    const {users}= topUsers
    const categoriesPost = useSelector(state => state.categoriesPost)
    const {categoriesInfo} = categoriesPost

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(listPosts(keyword, pageNumber))
        dispatch(getAllCategories())
        dispatch(getTopUsers())
    },[dispatch, keyword, pageNumber])
    
    //  const recentPosts =[...posts, ...posts, ...posts]
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
        <Divider orientation="left">Trending posts</Divider>
            <PostMasonry columns={3} tagsOnTop={true}/>
        </div>
        </section> :''}
    <section className='container' style={{display:'flex', alignItems:'flex-start'}}>
        <div className='row' style={{flex:"8"}}>
        <Divider orientation="left">Lastest posts</Divider>
            <PostGrid posts={posts} tagsOnTop={true} />
        </div> 
        {window.innerWidth > 900 && 
        <StickyBox style={{flex:"4" , right:'0'}}>
        <Usercard categories={categoriesInfo} users={users}/>    
        </StickyBox>}
    </section>
    </div>)}
        </>
    )
}


