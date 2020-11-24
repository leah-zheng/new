import './imports';

import Header from '../components/Header/index';
import NavBar from '../components/NavBar/index';
import NewsList from '../components/NewsList/index';
import PageLoading from '../components/PageLoading/index';

import {NEWS_TYPE} from '../data/index';
import serviecs from '../serviecs';
;((doc)=>{
    const oApp = doc.querySelector('#app');
    let oListWrapper = null;

    const config = {
        type:'top',
        count:10,
        pageNum:0
    };
    const newsData = {};
    
    
     const init = async()=>{
        render();
        await getNewsList();
        bindEvent();
    }

    function bindEvent(){
        NavBar.bindEvent(setType)
    }

    function render(){
        const headerTpl = Header.tpl({
            url:'/',
            title:'新闻头条',
            showLeftIcon:false,
            showRightIcon:true
        });

        const navBar = NavBar.tpl(NEWS_TYPE)
        const listWrapperTpl = NewsList.wrapperTpl(82);
        oApp.innerHTML += (headerTpl + navBar + listWrapperTpl);
        oListWrapper = oApp.querySelector('.news-list')
    }

    function renderList(data){
        const {pageNum } = config;
        const newsListTpl = NewsList.tpl({
            data,pageNum
        });
        oListWrapper.innerHTML += newsListTpl;
        NewsList.imgShow();
    }

    function setType(type){
        config.type = type;
        config.pageNum = 0;
        oListWrapper.innerHTML = '';
        getNewsList()
    }

    async function getNewsList(){
        const {type, count, pageNum} = config;
        //如果缓存池里有数据
        if (newsData[type]){
            
            renderList(newsData[type][pageNum]);
            return;
        }
        //缓存池里没有数据
        oListWrapper.innerHTML = PageLoading.tpl();
        newsData[type] = await serviecs.getNewsList(type,count);
        setTimeout(()=>{
            oListWrapper.innerHTML = '';
            renderList(newsData[type][pageNum]);
        },1000);
    }
    
    init();
})(document)