const moment = require('moment')
module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Issue',{
        category:{ //문의 종류(ex: 고장수리-0/ 계약관련-1/ 요금납부-2/ 소음관련-3/ 문의사항-4/ 그외-5)
            type:DataTypes.INTEGER,
        },
        title:{ //문의 제목
            type:DataTypes.STRING,
            get:function(){
                return this.getDataValue('title')
            }
        },
        contents:{ //문의 내용
            type:DataTypes.STRING,
        },
        issue_img:{ //문의 이미지
            type:DataTypes.STRING,
            set:function(val){
                return this.setDataValue('issue_img',JSON.stringify(val))
            },
            get:function(){
                return JSON.parse(this.getDataValue('issue_img'))
            },
            defaultValue:"[]"
        },
        requested_term:{ //요청사항
            type:DataTypes.STRING,
        },
        progress:{ //문의 진행사항(확인전-0, 확인중-1, 해결완료-2)
            type:DataTypes.INTEGER,
        },
        is_promise:{ // 문의의 약속여부 tinyint 0:false, 1:true
            type:DataTypes.BOOLEAN,
        },
        solution_method:{ //문의 약속 해결방법(만나서 : 0/ 전화로:1)
            type:DataTypes.INTEGER,
        },
        promise_date:{ //문의 약속 날짜
            type:DataTypes.DATE,
            set:function(val){
                return this.setDataValue('promise_date',moment(val).format("YYYY-MM-DD"))
            },
        },
        promise_time_hope:{ //문의 약속 희망 시간
            type:DataTypes.STRING,
            set:function(val){
                return this.setDataValue('promise_time_hope',JSON.stringify(val))
            },
            get:function(){
                console.log('!!!!!!!!!!!!:',this.getDataValue('promise_time_hope'))
                console.log(typeof this.getDataValue('promise_time_hope'))
                console.log('!!!!',JSON.parse(this.getDataValue('promise_time_hope')))
                return JSON.parse(this.getDataValue('promise_time_hope'))
            }
        },
        promise_option:{ //문의 약속 선택 사항
            type:DataTypes.STRING,
            defaultValue:'[]'
        },
        promise_time_solution:{ //문의 약속 확정 시간
            type:DataTypes.STRING,
            defaultValue:""
        },
    },{
        freezeTableName:true,
        timestamp:true,
        underscored:true
    })
}