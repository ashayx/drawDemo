class Draw extends eui.Component implements eui.UIComponent {
	public bg: eui.Rect;
	public clearBtn: eui.Group;
	public ABtn: eui.Group;
	public BBtn: eui.Group;
	public GBtn: eui.Group;
	public english: eui.Image;

	private shp: egret.Shape;

	public constructor() {
		super();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.initUI();
		this.addEvent();
	}

	private initUI() {
		this.bg.touchEnabled = true;
		this.shp = new egret.Shape();
		this.addChild(this.shp);
	}

	private addEvent() {
		this.bg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
		this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchMove, this);
		this.bg.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
		this.clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clearLine, this);
		this.ABtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapA, this);
		this.BBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapB, this);
		this.GBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapG, this);
	}

	private tapA() {
		this.english.source  = 'A_png';
		this.clearLine();
	}

	private tapB() {
		this.english.source  = 'B_png';
		this.clearLine();
	}

	private tapG() {
		this.english.source  = 'G_png';
		this.clearLine();
	}

	private clearLine() {
		this.shp.graphics.clear();
	}

	private touchBegin(e: egret.TouchEvent) {
		this.shp.graphics.lineStyle(35, 0x362c24);
		this.shp.graphics.moveTo(e.stageX, e.stageY);

	}
	private moveIndex = 5;
	private touchMove(e: egret.TouchEvent) {
		this.moveIndex++;
		if (this.moveIndex >= 5) {
			let isHit = this.english.hitTestPoint(e.stageX, e.stageY, true);//简单实现，碰撞检测透明区域不画线
			if (!isHit) {
				this.shp.graphics.moveTo(e.stageX, e.stageY);
				return;
			}
			this.shp.graphics.lineTo(e.stageX, e.stageY);
			this.moveIndex = 0;
		}
	}
	private touchEnd(e: egret.TouchEvent) {
		let isHit = this.english.hitTestPoint(e.stageX, e.stageY, true);
		if (!isHit) return;
		this.shp.graphics.lineTo(e.stageX, e.stageY);
		this.shp.graphics.endFill();
	}

}