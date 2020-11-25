import './imports';
import Header from '../components/Header/index';
import { getUrlQueryValue } from '../libs/utils';
import NewsFrame from '../components/Iframe/index';
import Follow from '../components/Follow/index';

;((doc)=>{
    const oApp = doc.querySelector('#app');
    const currentNews = JSON.parse(localStorage.getItem('currentNews'));
    const followedList = JSON.parse(localStorage.getItem('followedList') || '[]')
    const init = ()=>{
        render();
        bindEvent();
    }

    function render(){
        const collectionsTpl = Header.tpl({
            url:getUrlQueryValue('path'),
            title:'新闻详情',
            showLeftIcon:true,
            showRightIcon:false
        })

        const newsFrameTpl = NewsFrame.tpl(
            currentNews.url
        );

        const followTpl = createFolloeTpl();

        oApp.innerHTML += (collectionsTpl+ newsFrameTpl + followTpl);
    }

    function createFolloeTpl(){
        //followedList里是否有当前新闻的uniquekey
        const isExist = followedList.find(item =>{
            return item.uniquekey === currentNews.uniquekey
        })

        return isExist ? Follow.follow() : Follow.unfollow();
    }

    function bindEvent(){
        Follow.bindEvent(doFollow);
    }

    function doFollow(status){
        let followedList = JSON.parse(localStorage.getItem('followedList'))||[] ;

        if(status){
            followedList.push(currentNews);
        }else{
            followedList = followedList.filter(item =>{
                return item.uniquekey !== currentNews.uniquekey
            })
        }

        localStorage.setItem('followedList',JSON.stringify(followedList))
    }

    init()
})(document)