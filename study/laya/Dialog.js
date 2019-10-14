/**
*<code>DialogManager</code> 对话框管理容器，所有的对话框都在该容器内，并且受管理器管理。
*任意对话框打开和关闭，都会出发管理类的open和close事件
*可以通过UIConfig设置弹出框背景透明度，模式窗口点击边缘是否关闭，点击窗口是否切换层次等
*通过设置对话框的zOrder属性，可以更改弹出的层次
*/
//class laya.ui.DialogManager extends laya.display.Sprite
var DialogManager=(function(_super){
	function DialogManager(){
		/**锁屏层*/
		this.lockLayer=null;
		/**@private 全局默认弹出对话框效果，可以设置一个效果代替默认的弹出效果，如果不想有任何效果，可以赋值为null*/
		this.popupEffect=function(dialog){
			dialog.scale(1,1);
			dialog._effectTween=Tween.from(dialog,{x:Laya.stage.width / 2,y:Laya.stage.height / 2,scaleX:0,scaleY:0},300,Ease.backOut,Handler.create(this,this.doOpen,[dialog]),0,false,false);
		}
		/**@private 全局默认关闭对话框效果，可以设置一个效果代替默认的关闭效果，如果不想有任何效果，可以赋值为null*/
		this.closeEffect=function(dialog){
			dialog._effectTween=Tween.to(dialog,{x:Laya.stage.width / 2,y:Laya.stage.height / 2,scaleX:0,scaleY:0},300,Ease.strongOut,Handler.create(this,this.doClose,[dialog]),0,false,false);
		}
		DialogManager.__super.call(this);
		this.maskLayer=new Sprite();
		this.popupEffectHandler=new Handler(this,this.popupEffect);
		this.closeEffectHandler=new Handler(this,this.closeEffect);
		this.mouseEnabled=this.maskLayer.mouseEnabled=true;
		this.zOrder=1000;
		Laya.stage.addChild(this);
		Laya.stage.on(/*laya.events.Event.RESIZE*/"resize",this,this._onResize);
		if (UIConfig.closeDialogOnSide)this.maskLayer.on("click",this,this._closeOnSide);
		this._onResize(null);
	}

	__class(DialogManager,'laya.ui.DialogManager',_super);
	var __proto=DialogManager.prototype;
	__proto._closeOnSide=function(){
		var dialog=this.getChildAt(this.numChildren-1);
		if ((dialog instanceof laya.ui.Dialog ))dialog.close();
	}

	/**设置锁定界面，如果为空则什么都不显示*/
	__proto.setLockView=function(value){
		if (!this.lockLayer){
			this.lockLayer=new Box();
			this.lockLayer.mouseEnabled=true;
			this.lockLayer.size(Laya.stage.width,Laya.stage.height);
		}
		this.lockLayer.removeChildren();
		if (value){
			value.centerX=value.centerY=0;
			this.lockLayer.addChild(value);
		}
	}

	/**@private */
	__proto._onResize=function(e){
		var width=this.maskLayer.width=Laya.stage.width;
		var height=this.maskLayer.height=Laya.stage.height;
		if (this.lockLayer)this.lockLayer.size(width,height);
		this.maskLayer.graphics.clear(true);
		this.maskLayer.graphics.drawRect(0,0,width,height,UIConfig.popupBgColor);
		this.maskLayer.alpha=UIConfig.popupBgAlpha;
		for (var i=this.numChildren-1;i >-1;i--){
			var item=this.getChildAt(i);
			if (item.isPopupCenter)this._centerDialog(item);
		}
	}

	__proto._centerDialog=function(dialog){
		dialog.x=Math.round(((Laya.stage.width-dialog.width)>> 1)+dialog.pivotX);
		dialog.y=Math.round(((Laya.stage.height-dialog.height)>> 1)+dialog.pivotY);
	}

	/**
	*显示对话框
	*@param dialog 需要显示的对象框 <code>Dialog</code> 实例。
	*@param closeOther 是否关闭其它对话框，若值为ture，则关闭其它的对话框。
	*@param showEffect 是否显示弹出效果
	*/
	__proto.open=function(dialog,closeOther,showEffect){
		(closeOther===void 0)&& (closeOther=false);
		(showEffect===void 0)&& (showEffect=false);
		if (closeOther)this._closeAll();
		this._clearDialogEffect(dialog);
		if (dialog.isPopupCenter)this._centerDialog(dialog);
		this.addChild(dialog);
		if (dialog.isModal || this._getBit(/*laya.Const.HAS_ZORDER*/0x20))Laya.timer.callLater(this,this._checkMask);
		if (showEffect && dialog.popupEffect !=null)dialog.popupEffect.runWith(dialog);
		else this.doOpen(dialog);
		this.event(/*laya.events.Event.OPEN*/"open");
	}

	/**@private */
	__proto._clearDialogEffect=function(dialog){
		if (dialog._effectTween){
			Tween.clear(dialog._effectTween);
			dialog._effectTween=null;
		}
	}

	/**
	*执行打开对话框。
	*@param dialog 需要关闭的对象框 <code>Dialog</code> 实例。
	*/
	__proto.doOpen=function(dialog){
		dialog.onOpened(dialog._param);
	}

	/**
	*锁定所有层，显示加载条信息，防止双击
	*/
	__proto.lock=function(value){
		if (this.lockLayer){
			if (value)this.addChild(this.lockLayer);
			else this.lockLayer.removeSelf();
		}
	}

	/**
	*关闭对话框。
	*@param dialog 需要关闭的对象框 <code>Dialog</code> 实例。
	*/
	__proto.close=function(dialog){
		this._clearDialogEffect(dialog);
		if (dialog.isShowEffect && dialog.closeEffect !=null)dialog.closeEffect.runWith([dialog]);
		else this.doClose(dialog);
		this.event(/*laya.events.Event.CLOSE*/"close");
	}

	/**
	*执行关闭对话框。
	*@param dialog 需要关闭的对象框 <code>Dialog</code> 实例。
	*/
	__proto.doClose=function(dialog){
		dialog.removeSelf();
		dialog.isModal && this._checkMask();
		dialog.closeHandler && dialog.closeHandler.runWith(dialog.closeType);
		dialog.onClosed(dialog.closeType);
		if (dialog.autoDestroyAtClosed)dialog.destroy();
	}

	/**
	*关闭所有的对话框。
	*/
	__proto.closeAll=function(){
		this._closeAll();
		this.event(/*laya.events.Event.CLOSE*/"close");
	}

	/**@private */
	__proto._closeAll=function(){
		for (var i=this.numChildren-1;i >-1;i--){
			var item=this.getChildAt(i);
			if (item && item.close !=null){
				this.doClose(item);
			}
		}
	}

	/**
	*根据组获取所有对话框
	*@param group 组名称
	*@return 对话框数组
	*/
	__proto.getDialogsByGroup=function(group){
		var arr=[];
		for (var i=this.numChildren-1;i >-1;i--){
			var item=this.getChildAt(i);
			if (item && item.group===group){
				arr.push(item);
			}
		}
		return arr;
	}

	/**
	*根据组关闭所有弹出框
	*@param group 需要关闭的组名称
	*@return 需要关闭的对话框数组
	*/
	__proto.closeByGroup=function(group){
		var arr=[];
		for (var i=this.numChildren-1;i >-1;i--){
			var item=this.getChildAt(i);
			if (item && item.group===group){
				item.close();
				arr.push(item);
			}
		}
		return arr;
	}
//遮罩的层级在这里改变哈
	/**@private 发生层次改变后，重新检查遮罩层是否正确*/
	__proto._checkMask=function(){
		this.maskLayer.removeSelf();
		for (var i=this.numChildren-1;i >-1;i--){
			var dialog=this.getChildAt(i);
			if (dialog && dialog.isModal){
				this.addChildAt(this.maskLayer,i);
				return;
			}
		}
	}

	return DialogManager;
})(Sprite)



//class laya.ui.Dialog extends laya.ui.View
var Dialog=(function(_super){
	function Dialog(){
		/**
		*对话框被关闭时会触发的回调函数处理器。
		*<p>回调函数参数为用户点击的按钮名字name:String。</p>
		*/
		this.closeHandler=null;
		/**
		*弹出对话框效果，可以设置一个效果代替默认的弹出效果，如果不想有任何效果，可以赋值为null
		*全局默认弹出效果可以通过manager.popupEffect修改
		*/
		this.popupEffect=null;
		/**
		*关闭对话框效果，可以设置一个效果代替默认的关闭效果，如果不想有任何效果，可以赋值为null
		*全局默认关闭效果可以通过manager.closeEffect修改
		*/
		this.closeEffect=null;
		/**组名称*/
		this.group=null;
		/**是否是模式窗口*/
		this.isModal=false;
		/**是否显示弹出效果*/
		this.isShowEffect=true;
		/**指定对话框是否居中弹。<p>如果值为true，则居中弹出，否则，则根据对象坐标显示，默认为true。</p>*/
		this.isPopupCenter=true;
		/**关闭类型，点击name为"close"，"cancel"，"sure"，"no"，"yes"，"no"的按钮时，会自动记录点击按钮的名称*/
		this.closeType=null;
		/**@private */
		this._dragArea=null;
		/**@private */
		this._param=null;
		/**@private */
		this._effectTween=null;
		Dialog.__super.call(this);
		this.popupEffect=Dialog.manager.popupEffectHandler;
		this.closeEffect=Dialog.manager.closeEffectHandler;
		this._dealDragArea();
		this.on(/*laya.events.Event.CLICK*/"click",this,this._onClick);
	}

	__class(Dialog,'laya.ui.Dialog',_super);
	var __proto=Dialog.prototype;
	/**@private 提取拖拽区域*/
	__proto._dealDragArea=function(){
		var dragTarget=this.getChildByName("drag");
		if (dragTarget){
			this.dragArea=dragTarget._x+","+dragTarget._y+","+dragTarget.width+","+dragTarget.height;
			dragTarget.removeSelf();
		}
	}

	/**@private */
	__proto._onMouseDown=function(e){
		var point=this.getMousePoint();
		if (this._dragArea.contains(point.x,point.y))this.startDrag();
		else this.stopDrag();
	}

	/**@private 处理默认点击事件*/
	__proto._onClick=function(e){
		var btn=e.target;
		if (btn){
			switch (btn.name){
				case "close":
				case "cancel":
				case "sure":
				case "no":
				case "ok":
				case "yes":
					this.close(btn.name);
					return;
				}
		}
	}

	/**@inheritDoc */
	__proto.open=function(closeOther,param){
		(closeOther===void 0)&& (closeOther=true);
		this._dealDragArea();
		this._param=param;
		Dialog.manager.open(this,closeOther,this.isShowEffect);
		Dialog.manager.lock(false);
	}

	/**
	*关闭对话框。
	*@param type 关闭的原因，会传递给onClosed函数
	*/
	__proto.close=function(type){
		this.closeType=type;
		Dialog.manager.close(this);
	}

	/**@inheritDoc */
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this.closeHandler=null;
		this.popupEffect=null;
		this.closeEffect=null;
		this._dragArea=null;
		_super.prototype.destroy.call(this,destroyChild);
	}

	/**
	*显示对话框（以非模式窗口方式显示）。
	*@param closeOther 是否关闭其它的对话框。若值为true则关闭其它对话框。
	*@param showEffect 是否显示弹出效果
	*/
	__proto.show=function(closeOther,showEffect){
		(closeOther===void 0)&& (closeOther=false);
		(showEffect===void 0)&& (showEffect=true);
		this._open(false,closeOther,showEffect);
	}

	/**
	*显示对话框（以模式窗口方式显示）。
	*@param closeOther 是否关闭其它的对话框。若值为true则关闭其它对话框。
	*@param showEffect 是否显示弹出效果
	*/
	__proto.popup=function(closeOther,showEffect){
		(closeOther===void 0)&& (closeOther=false);
		(showEffect===void 0)&& (showEffect=true);
		this._open(true,closeOther,showEffect);
	}

	/**@private */
	__proto._open=function(modal,closeOther,showEffect){
		this.isModal=modal;
		this.isShowEffect=showEffect;
		Dialog.manager.lock(true);
		this.open(closeOther);
	}

	/**
	*用来指定对话框的拖拽区域。默认值为"0,0,0,0"。
	*<p><b>格式：</b>构成一个矩形所需的 x,y,width,heith 值，用逗号连接为字符串。
	*例如："0,0,100,200"。</p>
	*@see #includeExamplesSummary 请参考示例
	*/
	__getset(0,__proto,'dragArea',function(){
		if (this._dragArea)return this._dragArea.toString();
		return null;
		},function(value){
		if (value){
			var a=UIUtils.fillArray([0,0,0,0],value,Number);
			this._dragArea=new Rectangle(a[0],a[1],a[2],a[3]);
			this.on(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this._onMouseDown);
			}else {
			this._dragArea=null;
			this.off(/*laya.events.Event.MOUSE_DOWN*/"mousedown",this,this._onMouseDown);
		}
	});

	/**弹出框的显示状态；如果弹框处于显示中，则为true，否则为false;*/
	__getset(0,__proto,'isPopup',function(){
		return this.parent !=null;
	});

	/**@inheritDoc */
	__getset(0,__proto,'zOrder',_super.prototype._$get_zOrder,function(value){
		Laya.superSet(View,this,'zOrder',value);
		Dialog.manager._checkMask();
	});

	/**对话框管理容器，所有的对话框都在该容器内，并且受管理器管理，可以自定义自己的管理器，来更改窗口管理的流程。
	*任意对话框打开和关闭，都会触发管理类的open和close事件*/
	__getset(1,Dialog,'manager',function(){
		return Dialog._manager=Dialog._manager|| new DialogManager();
		},function(value){
		Dialog._manager=value;
	});

	Dialog.setLockView=function(view){
		Dialog.manager.setLockView(view);
	}

	Dialog.lock=function(value){
		Dialog.manager.lock(value);
	}

	Dialog.closeAll=function(){
		Dialog.manager.closeAll();
	}

	Dialog.getDialogsByGroup=function(group){
		return Dialog.manager.getDialogsByGroup(group);
	}

	Dialog.closeByGroup=function(group){
		return Dialog.manager.closeByGroup(group);
	}

	Dialog.CLOSE="close";
	Dialog.CANCEL="cancel";
	Dialog.SURE="sure";
	Dialog.NO="no";
	Dialog.YES="yes";
	Dialog.OK="ok";
	Dialog._manager=null;
	return Dialog;
})(View)
