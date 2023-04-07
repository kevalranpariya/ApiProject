const Employee = require('../../../models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Manager = require('../../../models/Manager');

module.exports.addEmployee = async(req,res)=>{
    let checkEmployee = await Employee.findOne({
        email : req.body.email
    });
    if(checkEmployee == null)
    {
        let manager =  await jwt.verify(req.cookies.Managertoken,'ManagerData');
        req.body.adminID = manager.Data.adminID;
        req.body.managerID = manager.Data._id;
        req.body.password = await bcrypt.hash(req.body.password,10)
        let addEmployee = await Employee.create(req.body);
        if(addEmployee)
        {
            return res.status(200).json({
                'msg': 'Insert successfully'
            })
        }
        return res.status(400).json({
            'msg':'Record not inserted'
        })
    }
    else{
        return res.status(400).json({
            'msg':'Try another Email ID'
        })
    }
}

module.exports.employeeLogin = async(req,res)=>{
    let checkEmployee = await Employee.findOne({email:req.body.email});

    if(checkEmployee)
    {
        let checkPass = await bcrypt.compare(req.body.password,checkEmployee.password)
        if(checkPass)
        {
            const token = await jwt.sign({Data :checkEmployee},'employeeData',{expiresIn:10*100*1000*10000});

            res.cookie('employeeToken', token)
            return res.status(200).json({
                'msg': 'Login',
                'token':'your token = '+ token
            })
        }
        return res.status(400).json({
            'msg': 'password Wrong'
        })
    }
    return res.status(400).json({
        'msg': 'your mailid not exits please another mail id to login'
    })
}

module.exports.employeeProfile = async (req,res)=>{
    let tokenCookie = req.cookies.employeeToken;
    let tokenData = await jwt.verify(tokenCookie,'employeeData');
    let checkEmployee = await Employee.findById(tokenData.Data._id)
    if(checkEmployee)
    {
        return res.status(200).json({
            'Data': checkEmployee
        });
    }
    return res.status(400).json({
        'msg': 'SOmething Wrong First of all login'
    })
}

module.exports.allEmployee = async (req,res)=>{
    let tokenData = await jwt.verify(req.cookies.Managertoken,'ManagerData');
    let allEmployee = await Employee.find({managerID : tokenData.Data._id}).populate('managerID');

    if(allEmployee)
    {
        return res.status(400).json({
            'Data':allEmployee
        })
    }
    return res.status(400).json({
        'msg': 'Cannot find Data'
    })
}

module.exports.updateEmployee = async(req,res)=>{

    let tokenData = await jwt.verify(req.cookies.employeeToken, 'employeeData')

    req.body.password = await bcrypt.hash(req.body.password,10)
    let updateEmployee = await Employee.findByIdAndUpdate(tokenData.Data._id,req.body);

    if(updateEmployee)
    {
        return res.status(200).json({
            'msg': 'Data Updated Successfully'
        });
    }
    return res.status(400).json({
        'msg': 'can not find data'
    })
}

module.exports.deleteEmployee = async(req,res)=>{
    let tokenData = await jwt.verify(req.cookies.Managertoken,'ManagerData');
    let checkEmployee = await Employee.findById(req.params.id);

    if(checkEmployee.managerID == tokenData.Data._id)
    {
        let deleteEmployee = await Employee.findByIdAndDelete(req.params.id)
    
        if(deleteEmployee)
        {
            return res.status(200).json({
                'msg':'Deleted Success fully'
            })
        }
        return res.status(400).json({
            'msg': 'Can not find data'
        })
    }
    else{
        return res.status(400).json({
            'msg':'This Employee not under you!!!'
        })
    }

}