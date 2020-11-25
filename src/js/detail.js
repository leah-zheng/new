import './imports';
import Header from '../components/Header/index';
import { getUrlQueryValue } from '../libs/utils';
import NewsFrame from '../components/Iframe/index';

;((doc)=>{
    const oApp = doc.querySelector('#app');
    const currentNews = JSON.parse(localStorage.getItem('currentNews'))
    const init = ()=>{
        render()
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
        )

        oApp.innerHTML += (collectionsTpl+ newsFrameTpl);
    }

    init()
})(document)