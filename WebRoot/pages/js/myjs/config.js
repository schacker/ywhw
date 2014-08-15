/**
 * 原始配置
 * @type 
 */
var GLOBAL={
	imei:'123123123123123',
	os:'android',
	companyId:9,
	companyName:'以物换物',
	dialogTheme:'b',
	//baseUrl:'http://www.1390mall.com',
	baseUrl:'http://192.168.1.110/ywhw',
	downPage:'/software/download?pkg=com.mall1390.mysyxx',
	initPages:{}
};

var GLOBAL_CONFIG = {
	home: {
		pageno:1,
		rows:2,
		total:0,
		itemCnt:0,
		type:1,
		searchWord:null
	},
	activity:{
		page:1,
		rows:3,
		total:10,
		cnt:0,
		activityId:null,
		type:1
	},
	activityDetail:{
		activityId:null
	},
	newsDetail: {
		newsId:null,
	},
	suggest:{
		type: '',
		content: '',
		intervalNum: null
	},
	message:{
		pageno:1,
		rows:10,
		total:0,
		itemCtn:0
	},
	changePsw:{
		userName:'',
		verifyCode:''
	},
	chat: {
		toId: null,
		toName: null,
		toHeadUrl: null,
		faceState:0,
		contentHeight: 0
	},
	faculty:{
		classId:1,
		pageno:1,
		rows:10,
		total:0,
		itemCnt:0,
		open:0
	},
	communication:{
		classId:1,
		userId:0
	},
	notepadList:{
		pageno: 1,
		rows: 5,
		total: 0,
		cnt: 0,
		isClick: true,
		item: null,
		noteId: null
	},
	details:{
		commodityId: null,
		name: null,
		intro: null,
		price: null,
		contact: null
	},
	more:{
		nickName: null
	},
	tradeMall:{
		pageno:1,
		itemCnt:0,
		total:0,
		rows:3
	}
};