function tplReplace (template, templateObject) {
    return template().replace(/\{\{(.*?)\}\}/g, (node, key) => {
      return templateObject[key.trim()];
    });
  }

function scrollToTop(){
  setTimeout(()=>{
    window.scrollTo(0,0)
  },0)
}
//将pageData进行分页
function setPageData(data,count){
  const len = data.length;
  let pageData = [],
      index = 0;

  while(index < len){
    pageData.push(data.slice(index, index+=count))
  }

  return pageData;
}

export{
    tplReplace,
    scrollToTop,
    setPageData
}