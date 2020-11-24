import './imports';

import Header from '../components/Header/index';

import {tplReplace} from '../libs/utils';

;((doc)=>{
    const oApp = doc.querySelector('#app');

    const init = ()=>{
        render()
    }

    function render(){
        const collectionsTpl = Header.tpl({
            url:'/',
            title:'我的收藏',
            showLeftIcon:true,
            showRightIcon:false
        })

        oApp.innerHTML += collectionsTpl;
    }

    init()
})(document)