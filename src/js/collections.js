import './imports';

import Header from '../components/Header/index';
import NewsList from '../components/NewsList/index';
import NoDataTip from '../components/NoDataTip/index';

import {tplReplace} from '../libs/utils';

;((doc)=>{
    const oApp = doc.querySelector('#app');
    const followedList = JSON.parse(localStorage.getItem('followedList')) || [];
    let oListWrapper = null;

    const init = ()=>{
        render();
        bindEvent();
    }

    function render(){
        const collectionsTpl = Header.tpl({
            url:'/',
            title:'我的收藏',
            showLeftIcon:true,
            showRightIcon:false
        });

        if(followedList.length){
            const listWrapperTpl = NewsList.wrapperTpl(44);
            oApp.innerHTML += (collectionsTpl + listWrapperTpl);
            oListWrapper = oApp.querySelector('.news-list');
            renderList(followedList);
            NewsList.imgShow();
        } else{
            oApp.innerHTML += (collectionsTpl+NoDataTip.tpl())
        }
    }

    function renderList(data){
        const newsListTpl = NewsList.tpl({
            data,
            pageNum:-1
        })

        oListWrapper.innerHTML += newsListTpl;
    }

    function bindEvent(){
        followedList.length && NewsList.bindEvent(oListWrapper,setCurrentNews)
    }

    function setCurrentNews(options){
        const {idx} = options;
        const currentNews = followedList[idx];
        localStorage.setItem('currentNews',JSON.stringify(currentNews));
    }

    init()
})(document)