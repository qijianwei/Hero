/**
*<p><code>URL</code> 提供URL格式化，URL版本管理的类。</p>
*<p>引擎加载资源的时候，会自动调用formatURL函数格式化URL路径</p>
*<p>通过basePath属性可以设置网络基础路径</p>
*<p>通过设置customFormat函数，可以自定义URL格式化的方式</p>
*<p>除了默认的通过增加后缀的格式化外，通过VersionManager类，可以开启IDE提供的，基于目录的管理方式来替代 "?v=" 的管理方式</p>
*@see laya.net.VersionManager
*/
//class laya.net.URL
var URL=(function(){
	function URL(url){
		/**@private */
		this._url=null;
		/**@private */
		this._path=null;
		this._url=URL.formatURL(url);
		this._path=URL.getPath(url);
	}

	__class(URL,'laya.net.URL');
	var __proto=URL.prototype;
	/**地址的文件夹路径（不包括文件名）。*/
	__getset(0,__proto,'path',function(){
		return this._path;
	});

	/**格式化后的地址。*/
	__getset(0,__proto,'url',function(){
		return this._url;
	});

	/**基础路径。如果不设置，默认为当前网页的路径。最终地址将被格式化为 basePath+相对URL地址，*/
	__getset(1,URL,'basePath',function(){
		return URL._basePath;
		},function(value){
		URL._basePath=Laya._getUrlPath();
		URL._basePath=URL.formatURL(value);
	});

	URL.formatURL=function(url){
		if (!url)return "null path";
		if (url.indexOf(":")> 0)return url;
		if (URL.customFormat !=null)url=URL.customFormat(url);
		if (url.indexOf(":")> 0)return url;
		var char1=url.charAt(0);
		if (char1==="."){
			return URL._formatRelativePath(URL._basePath+url);
			}else if (char1==='~'){
			return URL.rootPath+url.substring(1);
			}else if (char1==="d"){
			if (url.indexOf("data:image")===0)return url;
			}else if (char1==="/"){
			return url;
		}
		return URL._basePath+url;
	}

	URL._formatRelativePath=function(value){
		var parts=value.split("/");
		for (var i=0,len=parts.length;i < len;i++){
			if (parts[i]=='..'){
				parts.splice(i-1,2);
				i-=2;
			}
		}
		return parts.join('/');
	}

	URL.getPath=function(url){
		var ofs=url.lastIndexOf('/');
		return ofs > 0 ? url.substr(0,ofs+1):"";
	}

	URL.getFileName=function(url){
		var ofs=url.lastIndexOf('/');
		return ofs > 0 ? url.substr(ofs+1):url;
	}

	URL.getAdptedFilePath=function(url){
		if (!URL.exportSceneToJson || !url)return url;
		var i=0,len=0;
		len=URL._adpteTypeList.length;
		var tArr;
		for (i=0;i < len;i++){
			tArr=URL._adpteTypeList[i];
			url=url.replace(tArr[0],tArr[1]);
		}
		return url;
	}

	URL.version={};
	URL.exportSceneToJson=false;
	URL._basePath="";
	URL.rootPath="";
	URL.customFormat=function(url){
		var newUrl=URL.version[url];
		if (!Render.isConchApp && newUrl)url+="?v="+newUrl;
		return url;
	}

	__static(URL,
	['_adpteTypeList',function(){return this._adpteTypeList=[[".scene3d",".json"],[".scene",".json"],[".taa",".json"],[".prefab",".json"]];}
	]);
	return URL;
})()