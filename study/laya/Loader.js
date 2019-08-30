/**
*<code>Loader</code> 类可用来加载文本、JSON、XML、二进制、图像等资源。
*/
//class laya.net.Loader extends laya.events.EventDispatcher
var Loader=(function(_super){
	function Loader(){
		/**@private 加载后的数据对象，只读*/
		this._data=null;
		/**@private */
		this._url=null;
		/**@private */
		this._type=null;
		/**@private */
		this._cache=false;
		/**@private */
		this._http=null;
		/**@private */
		this._useWorkerLoader=false;
		/**@private 自定义解析不派发complete事件，但会派发loaded事件，手动调用endLoad方法再派发complete事件*/
		this._customParse=false;
		/**@private */
		this._constructParams=null;
		/**@private */
		this._propertyParams=null;
		/**@private */
		this._createCache=false;
		Loader.__super.call(this);
	}

	__class(Loader,'laya.net.Loader',_super);
	var __proto=Loader.prototype;
	/**
	*加载资源。加载错误会派发 Event.ERROR 事件，参数为错误信息。
	*@param url 资源地址。
	*@param type (default=null)资源类型。可选值为：Loader.TEXT、Loader.JSON、Loader.XML、Loader.BUFFER、Loader.IMAGE、Loader.SOUND、Loader.ATLAS、Loader.FONT。如果为null，则根据文件后缀分析类型。
	*@param cache (default=true)是否缓存数据。
	*@param group (default=null)分组名称。
	*@param ignoreCache (default=false)是否忽略缓存，强制重新加载。
	*@param useWorkerLoader(default=false)是否使用worker加载（只针对IMAGE类型和ATLAS类型，并且浏览器支持的情况下生效）
	*/
	__proto.load=function(url,type,cache,group,ignoreCache,useWorkerLoader){
		(cache===void 0)&& (cache=true);
		(ignoreCache===void 0)&& (ignoreCache=false);
		(useWorkerLoader===void 0)&& (useWorkerLoader=false);
		if (!url){
			this.onLoaded(null);
			return;
		}
		Loader.setGroup(url,"666");
		this._url=url;
		if (url.indexOf("data:image")===0)type="image";
		else url=URL.formatURL(url);
		this._type=type || (type=Loader.getTypeFromUrl(this._url));
		this._cache=cache;
		this._useWorkerLoader=useWorkerLoader;
		this._data=null;
		if (useWorkerLoader)WorkerLoader.enableWorkerLoader();
		if (!ignoreCache && Loader.loadedMap[url]){
			this._data=Loader.loadedMap[url];
			this.event(/*laya.events.Event.PROGRESS*/"progress",1);
			this.event(/*laya.events.Event.COMPLETE*/"complete",this._data);
			return;
		}
		if (group)Loader.setGroup(url,group);
		if (Loader.parserMap[type] !=null){
			this._customParse=true;
			if (((Loader.parserMap[type])instanceof laya.utils.Handler ))Loader.parserMap[type].runWith(this);
			else Loader.parserMap[type].call(null,this);
			return;
		}
		if (type==="image" || type==="htmlimage" || type==="nativeimage")return this._loadImage(url);
		if (type==="sound")return this._loadSound(url);
		if (type==="ttf")return this._loadTTF(url);
		var contentType;
		switch (type){
			case "atlas":
			case "prefab":
			case "plf":
				contentType="json";
				break ;
			case "font":
				contentType="xml";
				break ;
			case "plfb":
				contentType="arraybuffer";
				break ;
			default :
				contentType=type;
			}
		if (Loader.preLoadedMap[url]){
			this.onLoaded(Loader.preLoadedMap[url]);
			}else {
			if(Browser.onVVMiniGame){
				this._http=new HttpRequest();
				this._http.on(/*laya.events.Event.PROGRESS*/"progress",this,this.onProgress);
				this._http.on(/*laya.events.Event.ERROR*/"error",this,this.onError);
				this._http.on(/*laya.events.Event.COMPLETE*/"complete",this,this.onLoaded);
				}else{
				if (!this._http){
					this._http=new HttpRequest();
					this._http.on(/*laya.events.Event.PROGRESS*/"progress",this,this.onProgress);
					this._http.on(/*laya.events.Event.ERROR*/"error",this,this.onError);
					this._http.on(/*laya.events.Event.COMPLETE*/"complete",this,this.onLoaded);
				}
			}
			this._http.send(url,null,"get",contentType);
		}
	}

	/**
	*@private
	*加载TTF资源。
	*@param url 资源地址。
	*/
	__proto._loadTTF=function(url){
		url=URL.formatURL(url);
		var ttfLoader=new TTFLoader();
		ttfLoader.complete=Handler.create(this,this.onLoaded);
		ttfLoader.load(url);
	}

	/**
	*@private
	*加载图片资源。
	*@param url 资源地址。
	*/
	__proto._loadImage=function(url){
		url=URL.formatURL(url);
		var _this=this;
		var image;
		function clear (){
			var img=image;
			if (img){
				img.onload=null;
				img.onerror=null;
				delete Loader._imgCache[url];
			}
		};
		var onerror=function (){
			clear();
			_this.event(/*laya.events.Event.ERROR*/"error","Load image failed");
		}
		if (this._type==="nativeimage"){
			var onload=function (){
				clear();
				_this.onLoaded(image);
			};
			image=new Browser.window.Image();
			image.crossOrigin="";
			image.onload=onload;
			image.onerror=onerror;
			image.src=url;
			Loader._imgCache[url]=image;
			}else {
			var ext=Utils.getFileExtension(url);
			if (ext==="ktx" || ext==="pvr"){
				onload=function (imageData){
					var format=0;
					switch (ext){
						case "ktx":
							format=5;
							break ;
						case "pvr":
							format=12;
							break ;
						}
					image=new Texture2D(0,0,format,false,false);
					image.wrapModeU=/*laya.resource.BaseTexture.WARPMODE_CLAMP*/1;
					image.wrapModeV=/*laya.resource.BaseTexture.WARPMODE_CLAMP*/1;
					image.setCompressData(imageData);
					image._setCreateURL(url);
					clear();
					_this.onLoaded(image);
				};
				var tempHttp;
				tempHttp=new HttpRequest();
				tempHttp.on(/*laya.events.Event.ERROR*/"error",null,onerror);
				tempHttp.on(/*laya.events.Event.COMPLETE*/"complete",null,onload);
				tempHttp.send(url,null,"get",/*CLASS CONST:laya.net.Loader.BUFFER*/"arraybuffer");
				}else {
				var imageSource=new Browser.window.Image();
				onload=function (){
					var tex=new Texture2D(imageSource.width,imageSource.height,1,false,false);
					tex.wrapModeU=/*laya.resource.BaseTexture.WARPMODE_CLAMP*/1;
					tex.wrapModeV=/*laya.resource.BaseTexture.WARPMODE_CLAMP*/1;
					tex.loadImageSource(imageSource,true);
					tex._setCreateURL(url);
					clear();
					_this.onLoaded(tex);
				};
				imageSource.crossOrigin="";
				imageSource.onload=onload;
				imageSource.onerror=onerror;
				imageSource.src=url;
				Loader._imgCache[url]=imageSource;
			}
		}
	}

	/**
	*@private
	*加载声音资源。
	*@param url 资源地址。
	*/
	__proto._loadSound=function(url){
		var sound=(new SoundManager._soundClass());
		var _this=this;
		sound.on(/*laya.events.Event.COMPLETE*/"complete",this,soundOnload);
		sound.on(/*laya.events.Event.ERROR*/"error",this,soundOnErr);
		sound.load(url);
		function soundOnload (){
			clear();
			_this.onLoaded(sound);
		}
		function soundOnErr (){
			clear();
			sound.dispose();
			_this.event(/*laya.events.Event.ERROR*/"error","Load sound failed");
		}
		function clear (){
			sound.offAll();
		}
	}

	/**@private */
	__proto.onProgress=function(value){
		if (this._type==="atlas")this.event(/*laya.events.Event.PROGRESS*/"progress",value *0.3);
		else this.event(/*laya.events.Event.PROGRESS*/"progress",value);
	}

	/**@private */
	__proto.onError=function(message){
		this.event(/*laya.events.Event.ERROR*/"error",message);
	}

	/**
	*资源加载完成的处理函数。
	*@param data 数据。
	*/
	__proto.onLoaded=function(data){
		var type=this._type;
		if (type=="plfb"){
			this.parsePLFBData(data);
			this.complete(data);
		}else
		if (type=="plf"){
			this.parsePLFData(data);
			this.complete(data);
			}else if (type==="image"){
			var tex=new Texture(data);
			tex.url=this._url;
			this.complete(tex);
			}else if (type==="sound" || type==="htmlimage" || type==="nativeimage"){
			this.complete(data);
			}else if (type==="atlas"){
			if (!data.url && !data._setContext){
				if (!this._data){
					this._data=data;
					if (data.meta && data.meta.image){
						var toloadPics=data.meta.image.split(",");
						var split=this._url.indexOf("/")>=0 ? "/" :"\\";
						var idx=this._url.lastIndexOf(split);
						var folderPath=idx >=0 ? this._url.substr(0,idx+1):"";
						var changeType;
						if (Browser.onAndroid && data.meta.compressTextureAndroid){
							changeType=".ktx";
						}
						if (Browser.onIOS && data.meta.compressTextureIOS){
							changeType=".pvr";
						}
						for (var i=0,len=toloadPics.length;i < len;i++){
							if (changeType){
								toloadPics[i]=folderPath+toloadPics[i].replace(".png",changeType);
								}else{
								toloadPics[i]=folderPath+toloadPics[i];
							}
						}
						}else {
						toloadPics=[this._url.replace(".json",".png")];
					}
					toloadPics.reverse();
					data.toLoads=toloadPics;
					data.pics=[];
				}
				this.event(/*laya.events.Event.PROGRESS*/"progress",0.3+1 / toloadPics.length *0.6);
				return this._loadImage(toloadPics.pop());
				}else {
				this._data.pics.push(data);
				if (this._data.toLoads.length > 0){
					this.event(/*laya.events.Event.PROGRESS*/"progress",0.3+1 / this._data.toLoads.length *0.6);
					return this._loadImage(this._data.toLoads.pop());
				};
				var frames=this._data.frames;
				var cleanUrl=this._url.split("?")[0];
				var directory=(this._data.meta && this._data.meta.prefix)? this._data.meta.prefix :cleanUrl.substring(0,cleanUrl.lastIndexOf("."))+"/";
				var pics=this._data.pics;
				var atlasURL=URL.formatURL(this._url);
				var map=Loader.atlasMap[atlasURL] || (Loader.atlasMap[atlasURL]=[]);
				map.dir=directory;
				var scaleRate=1;
				if (this._data.meta && this._data.meta.scale && this._data.meta.scale !=1){
					scaleRate=parseFloat(this._data.meta.scale);
					for (var name in frames){
						var obj=frames[name];
						var tPic=pics[obj.frame.idx ? obj.frame.idx :0];
						var url=URL.formatURL(directory+name);
						(tPic).scaleRate=scaleRate;
						var tTexture;
						tTexture=Texture._create(tPic,obj.frame.x,obj.frame.y,obj.frame.w,obj.frame.h,obj.spriteSourceSize.x,obj.spriteSourceSize.y,obj.sourceSize.w,obj.sourceSize.h,laya.net.Loader.getRes(url));
						Loader.cacheRes(url,tTexture);
						tTexture.url=url;
						map.push(url);
					}
					}else {
					for (name in frames){
						obj=frames[name];
						tPic=pics[obj.frame.idx ? obj.frame.idx :0];
						url=URL.formatURL(directory+name);
						tTexture=Texture._create(tPic,obj.frame.x,obj.frame.y,obj.frame.w,obj.frame.h,obj.spriteSourceSize.x,obj.spriteSourceSize.y,obj.sourceSize.w,obj.sourceSize.h,laya.net.Loader.getRes(url));
						Loader.cacheRes(url,tTexture);
						tTexture.url=url;
						map.push(url);
					}
				}
				delete this._data.pics;
				this.complete(this._data);
			}
			}else if (type==="font"){
			if (!data._source){
				this._data=data;
				this.event(/*laya.events.Event.PROGRESS*/"progress",0.5);
				return this._loadImage(this._url.replace(".fnt",".png"));
				}else {
				var bFont=new BitmapFont();
				bFont.parseFont(this._data,new Texture(data));
				var tArr=this._url.split(".fnt")[0].split("/");
				var fontName=tArr[tArr.length-1];
				Text.registerBitmapFont(fontName,bFont);
				this._data=bFont;
				this.complete(this._data);
			}
			}else if (type==="prefab"){
			var prefab=new Prefab();
			prefab.json=data;
			this.complete(prefab);
			}else {
			this.complete(data);
		}
	}

	__proto.parsePLFData=function(plfData){
		var type;
		var filePath;
		var fileDic;
		for (type in plfData){
			fileDic=plfData[type];
			switch (type){
				case "json":
				case "text":
					for (filePath in fileDic){
						Loader.preLoadedMap[URL.formatURL(filePath)]=fileDic[filePath]
					}
					break ;
				default :
					for (filePath in fileDic){
						Loader.preLoadedMap[URL.formatURL(filePath)]=fileDic[filePath]
					}
				}
		}
	}

	__proto.parsePLFBData=function(plfData){
		var byte;
		byte=new Byte(plfData);
		var i=0,len=0;
		len=byte.getInt32();
		for (i=0;i < len;i++){
			this.parseOnePLFBFile(byte);
		}
	}

	__proto.parseOnePLFBFile=function(byte){
		var fileLen=0;
		var fileName;
		var fileData;
		fileName=byte.getUTFString();
		fileLen=byte.getInt32();
		fileData=byte.readArrayBuffer(fileLen);
		Loader.preLoadedMap[URL.formatURL(fileName)]=fileData;
	}

	/**
	*加载完成。
	*@param data 加载的数据。
	*/
	__proto.complete=function(data){
		this._data=data;
		if (this._customParse){
			this.event(/*laya.events.Event.LOADED*/"loaded",(data instanceof Array)? [data] :data);
			}else {
			Loader._loaders.push(this);
			if (!Loader._isWorking)Loader.checkNext();
		}
	}

	/**
	*结束加载，处理是否缓存及派发完成事件 <code>Event.COMPLETE</code> 。
	*@param content 加载后的数据
	*/
	__proto.endLoad=function(content){
		content && (this._data=content);
		if (this._cache)Loader.cacheRes(this._url,this._data);
		this.event(/*laya.events.Event.PROGRESS*/"progress",1);
		this.event(/*laya.events.Event.COMPLETE*/"complete",(this.data instanceof Array)? [this.data] :this.data);
	}

	/**加载地址。*/
	__getset(0,__proto,'url',function(){
		return this._url;
	});

	/**返回的数据。*/
	__getset(0,__proto,'data',function(){
		return this._data;
	});

	/**是否缓存。*/
	__getset(0,__proto,'cache',function(){
		return this._cache;
	});

	/**加载类型。*/
	__getset(0,__proto,'type',function(){
		return this._type;
	});

	Loader.getTypeFromUrl=function(url){
		var type=Utils.getFileExtension(url);
		if (type)return Loader.typeMap[type];
		console.warn("Not recognize the resources suffix",url);
		return "text";
	}

	Loader.checkNext=function(){
		Loader._isWorking=true;
		var startTimer=Browser.now();
		var thisTimer=startTimer;
		while (Loader._startIndex < Loader._loaders.length){
			thisTimer=Browser.now();
			Loader._loaders[Loader._startIndex].endLoad();
			Loader._startIndex++;
			if (Browser.now()-startTimer > Loader.maxTimeOut){
				console.warn("loader callback cost a long time:"+(Browser.now()-startTimer)+" url="+Loader._loaders[Loader._startIndex-1].url);
				Laya.systemTimer.frameOnce(1,null,Loader.checkNext);
				return;
			}
		}
		Loader._loaders.length=0;
		Loader._startIndex=0;
		Loader._isWorking=false;
	}

	Loader.clearRes=function(url){
		url=URL.formatURL(url);
		var arr=Loader.getAtlas(url);
		if (arr){
			for (var i=0,n=arr.length;i < n;i++){
				var resUrl=arr[i];
				var tex=Loader.getRes(resUrl);
				delete Loader.loadedMap[resUrl];
				if (tex)tex.destroy();
			}
			arr.length=0;
			delete Loader.atlasMap[url];
			delete Loader.loadedMap[url];
			}else {
			var res=Loader.loadedMap[url];
			if (res){
				delete Loader.loadedMap[url];
				if ((res instanceof laya.resource.Texture )&& res.bitmap)(res).destroy();
			}
		}
	}

	Loader.clearTextureRes=function(url){
		url=URL.formatURL(url);
		var arr=laya.net.Loader.getAtlas(url);
		var res=(arr && arr.length > 0)? laya.net.Loader.getRes(arr[0]):laya.net.Loader.getRes(url);
		if ((res instanceof laya.resource.Texture ))
			res.disposeBitmap();
	}

	Loader.getRes=function(url){
		return Loader.loadedMap[URL.formatURL(url)];
	}

	Loader.getAtlas=function(url){
		return Loader.atlasMap[URL.formatURL(url)];
	}

	Loader.cacheRes=function(url,data){
		url=URL.formatURL(url);
		if (Loader.loadedMap[url] !=null){
			console.warn("Resources already exist,is repeated loading:",url);
			}else {
			Loader.loadedMap[url]=data;
		}
	}

	Loader.setGroup=function(url,group){
		if (!Loader.groupMap[group])Loader.groupMap[group]=[];
		Loader.groupMap[group].push(url);
	}

	Loader.clearResByGroup=function(group){
		if (!Loader.groupMap[group])return;
		var arr=Loader.groupMap[group],i=0,len=arr.length;
		for (i=0;i < len;i++){
			Loader.clearRes(arr[i]);
		}
		arr.length=0;
	}

	Loader.TEXT="text";
	Loader.JSON="json";
	Loader.PREFAB="prefab";
	Loader.XML="xml";
	Loader.BUFFER="arraybuffer";
	Loader.IMAGE="image";
	Loader.SOUND="sound";
	Loader.ATLAS="atlas";
	Loader.FONT="font";
	Loader.TTF="ttf";
	Loader.PLF="plf";
	Loader.PLFB="plfb";
	Loader.HIERARCHY="HIERARCHY";
	Loader.MESH="MESH";
	Loader.MATERIAL="MATERIAL";
	Loader.TEXTURE2D="TEXTURE2D";
	Loader.TEXTURECUBE="TEXTURECUBE";
	Loader.ANIMATIONCLIP="ANIMATIONCLIP";
	Loader.AVATAR="AVATAR";
	Loader.TERRAINHEIGHTDATA="TERRAINHEIGHTDATA";
	Loader.TERRAINRES="TERRAIN";
	Loader.typeMap={"ttf":"ttf","png":"image","jpg":"image","jpeg":"image","ktx":"image","pvr":"image","txt":"text","json":"json","prefab":"prefab","xml":"xml","als":"atlas","atlas":"atlas","mp3":"sound","ogg":"sound","wav":"sound","part":"json","fnt":"font","plf":"plf","plfb":"plfb","scene":"json","ani":"json","sk":"arraybuffer"};
	Loader.parserMap={};
	Loader.maxTimeOut=100;
	Loader.groupMap={};
	Loader.loadedMap={};
	Loader.atlasMap={};
	Loader.preLoadedMap={};
	Loader._imgCache={};
	Loader._loaders=[];
	Loader._isWorking=false;
	Loader._startIndex=0;
	return Loader;
})(EventDispatcher)