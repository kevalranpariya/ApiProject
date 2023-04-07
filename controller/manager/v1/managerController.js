const Manager = require('../../../models/Manager');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Admin = require('../../../models/Admin');

module.exports.addManager = async (req, res) => {
    let checkManager = await Manager.findOne({ email: req.body.email });
    if (checkManager) {
        return res.json({
            'status': 400,
            'msg': 'Mail already exit Try another!!'
        })
    }
    let cookieToken = req.cookies.adminToken;
    let info = await jwt.verify(cookieToken, 'NewAPIProject')

    req.body.adminID = info.Data._id;
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let addManager = await Manager.create(req.body);
    if (addManager) {
        return res.json({
            'status': 200,
            'msg': 'Record Inserted'
        });
    }
    return res.json({
        'status': 400,
        'msg': 'Record not Inserted'
    });
}

module.exports.managerLogin = async (req, res) => {
    let checkManager = await Manager.findOne({ email: req.body.email });
    if (checkManager != null) {
        let passCheck = await bcrypt.compare(req.body.password, checkManager.password);
        if (passCheck) {
            const token = await jwt.sign({ Data: checkManager }, 'ManagerData', { expiresIn: 10 * 100 * 1000 * 10000 })
            res.cookie('Managertoken', token)
            return res.json({
                'status': 200,
                'msg': 'Login successfully',
                'token': 'Your Token = ' + token
            })
        }
        return res.json({
            'status': 400,
            'msg': 'Check your password!!!'
        });
    }
    return res.json({
        'status': 400,
        'msg': 'Check your mail id!! try agian!!!'
    });
}

module.exports.managerUpdateData = async (req, res) => {
    let tokenData = await jwt.verify(req.cookies.Managertoken,'ManagerData');
    if(req.body.password)
    {
        req.body.password = await bcrypt.hash(req.body.password,10);
    }
    let updateManager = await Manager.findByIdAndUpdate(tokenData.Data._id, req.body);

    if (updateManager) {
        return res.status(200).json({
            'msg': 'Recored Updated'
        })
    }
    return res.status(400).json({
        'msg': 'Something Wrong'
    });
}

module.exports.managerProfile = async (req, res) => {
    let managetToken = req.cookies.Managertoken;
    let manager = await jwt.verify(managetToken, 'ManagerData')
    if (manager) {
        return res.status(200).json({ 'data': manager });
    }
    else {
        return res.status(400).json({ 'msg': 'Login first' })
    }
}

module.exports.viewAllManager = async (req, res) => {

    let tokenCookie = req.cookies.adminToken;
    let tokenData = await jwt.verify(tokenCookie, 'NewAPIProject')

    let allManager = await Manager.find({ adminID: tokenData.Data._id }).populate('adminID');

    if (allManager) {
        return res.status(200).json({
            'manager': allManager
        })
    }
    return res.status(400).json({
        'msg': 'Something Wrong'
    })
}

module.exports.deleteManager = async (req, res) => {
    let tokenData = await jwt.verify(req.cookies.adminToken, 'NewAPIProject');
    let checkManager = await Manager.findById(req.params.id).populate('adminID').exec();

    if (tokenData.Data._id == checkManager.adminID.id) {
        let deleteManager = await Manager.findByIdAndDelete(req.params.id);

        if (deleteManager) {
            return res.status(200).json({
                'msg': 'Delete Successfully'
            })
        }
        return res.status(400).json({
            'msg': 'Can not find Data'
        })
    }
    else {
        return res.status(400).json({
            'msg': 'Not access this Manager!!'
        })
    }


    // if(checkAdmin)
    // {
    //        

    //     // let deleteManager = await Manager.findByIdAndDelete(req.params.id);

    //     // if(deleteManager)
    //     // {
    //     //     return res.status(200).json({
    //     //         'msg':'Delete Successfully'
    //     //     })
    //     // }
    //     // return res.status(400).json({
    //     //     'msg':'Can not find Data'
    //     // })
    // }
    // else{
    //     return res.status(400).json({
    //         'msg': 'Plase fist Admin Login'
    //     })
    // }

}