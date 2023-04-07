const Admin = require('../../../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.addAdminData = async(req,res)=>{

    let checkAdmin = await Admin.findOne({email:req.body.email});



    if(checkAdmin)
    {
        return res.json({
            'status' : '400',
            'msg': 'Email id already register!!!'
        })
    }
    req.body.password = await bcrypt.hash(req.body.password,10);
    let addAdmin = await Admin.create(req.body);
    
    if(addAdmin)
    {
        return res.json({'status': 200,'msg': 'Data inserted'});
    }
    else{
        return res.json({
            'status':400,
            'msg':'Something Wrong'
        })
    }
}

module.exports.AdminLogin = async(req,res)=>{
    let checkAdmin = await Admin.findOne({email : req.body.email});

    if(checkAdmin && await bcrypt.compareSync('123',checkAdmin.password)){
        let token = jwt.sign({Data : checkAdmin},'NewAPIProject',{expiresIn:100*1000*10000});
        res.cookie('adminToken',token);

        return res.json({
            'status': 200,
            'msg':'Login Successfully',
            'token': 'your token= '+token
        })
    }
    else{
        return res.json({
            'status': 400,
            'msg': 'Email and Password are Wrong,, Login agian!!!'
        })
    }
}