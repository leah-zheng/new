import ItemTpl from './tpl/item.tpl';
import WrapperTpl from './tpl/index.tpl';
import './index.scss'
import {tplReplace,scrollToTop} from '../../libs/utils';

export default {
    name:'navBar',
    _curIdx:0,
    tpl(data){
        let itemList = '';
        //解构赋值
        data.map(({type,title},index)=>{
           itemList += tplReplace(ItemTpl,{
             isCurrent: !index? 'current' : '',
             title,
             type
           })
        })

        return tplReplace(WrapperTpl,{
            itemList,
            wrapperW:.6 * data.length
        })
    },
    bindEvent(setType){
        const oNavBar = document.querySelector('.nav'),
              oNavItem = document.querySelectorAll('.item');

        oNavBar.addEventListener('click',this._setNav.bind(this,oNavItem,setType),false)
    },

    _setNav(items,setType){
        const tar = arguments[2].target;
        const className = tar.className.trim();
        
        if(className === 'item'){
            const type = tar.dataset.type;
            
            setType(type);
            scrollToTop();
            items[this._curIdx].className = 'item';
            this._curIdx = [].indexOf.call(items,tar);
            items[this._curIdx].className +=' current';
        }
    }
}