import './imports';

import Header from '../components/Header/index';
import NavBar from '../components/NavBar/index';

import {NEWS_TYPE} from '../data/index';
import serviecs from '../serviecs';
;((doc)=>{
    const oApp = doc.querySelector('#app');
    const config = {
        type:'top',
        count:10
    };
    const newsData = [];
    
    
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

        oApp.innerHTML += (headerTpl + navBar);
    }

    function setType(type){
        config.type = type;
        console.log(config.type);
    }

    async function getNewsList(){
        const {type, count} = config;

        if (newsData[type]){

            return;
        }

        newsData[type] = await serviecs.getNewsList(type,count);
        console.log(newsData);
    }
    
    init();
})(document)