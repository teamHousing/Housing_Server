const moment = require('moment')
module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Issue',{
        category:{ //문의 종류(ex: 고장수리-1/ 계약관련-2/ 요금납부-3/ 소음관련-4/ 문의사항-5/ 그외-6)
            type:DataTypes.INTEGER,
        },
        title:{ //문의 제목
            type:DataTypes.STRING,
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
        progress:{ //문의 진행사항(확인전-0, 확인중-1, 확인완료-2)
            type:DataTypes.INTEGER,
        },
        is_promise:{
            type:DataTypes.BOOLEAN,
        },
        promise_solution:{ //문의 약속 해결방법(만나서 : 0/ 전화로:1)
            type:DataTypes.INTEGER,
        },
        promise_date:{ //문의 약속 날짜
            type:DataTypes.DATE,
            set:function(val){
                return this.setDataValue('promise_date',moment(val).format("YYYY-MM-DD"))
            }
        },
        promise_time_hope:{ //문의 약속 희망 시간
            type:DataTypes.STRING,
            set:function(val){
                return this.setDataValue('promise_time_hope',JSON.stringify(val))
            },
            get:function(){
                return JSON.parse(this.getDataValue('promise_date'))
            }
        },
        promise_option:{ //문의 약속 선택 사항
            type:DataTypes.STRING,
            defaultValue:'[]'
        },
        promise_time_solution:{ //문의 약속 확정 시간
            type:DataTypes.STRING
        },
    },{
        freezeTableName:true,
        timestamp:true,
        underscored:true
    })
}