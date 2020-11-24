import tpl from './index.tpl';
import './index.scss';

import {tplReplace} from '../../libs/utils';

export default {
    name:'Header',
    tpl(options) {
        //解构赋值
        const { url, title, showLeftIcon, showRightIcon } = options;
        
        return tplReplace(tpl, {
            url,
            title,
            showLeftIcon:showLeftIcon? 'block':'none',
            showRightIcon:showRightIcon? 'block':'none'
        })
    }
}