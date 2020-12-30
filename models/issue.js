module.exports=function async(sequelize,DataTypes){
    return sequelize.define('Issue',{
        category:{ //문의 종류
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
        },
        requested_term:{ //요청사항
            type:DataTypes.STRING,
        },
        progress:{ //문의 진행사항(확인전-1, 확인중-2, 확인완료-3)
            type:DataTypes.INTEGER,
        },
        promise_solution:{ //문의 약속 해결방법(ex: 고장수리-1/ 계약관련-2/ 요금납부-3/ 소음관련-4/ 문의사항-5/ 그외-6)
            type:DataTypes.INTEGER,
        },
        promise_date:{ //문의 약속 날짜
            type:DataTypes.DATE,
        },
        promise_time_hope:{ //문의 약속 희망 시간
            type:DataTypes.STRING,
        },
        reply:{
            type:DataTypes.STRING,
        },
    },{
        freezeTableName:true,
        timestamp:true,
        underscored:true
    })
}