//@login & register
const Koa = require('koa')
const router = require('koa-router')()
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const secret = require('../../config/config').secret
const User = require('../../model/User')
const app = new Koa()

router.get('/index', (ctx, next) => {
    ctx.body = '<h1>dfa</h1>'
    // console.log(ctx.response)
})
router.post('/api/register', async (ctx, next) => {
    const user = await User.findOne({
        email: ctx.request.body.email
    });
    if (user) {
        // return ctx.status(400).json("email:邮箱已被注册")
        ctx.body = JSON.stringify('邮箱已被注册')
        console.log('邮箱已被注册')
    } else {
        const avatar = gravatar.url(ctx.request.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
        
        const newUser = new User({
            email: ctx.request.body.email,
            name: ctx.request.body.name,
            password: ctx.request.body.password,
            avatar,
            identity: ctx.request.body.identity
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err
                newUser.password = hash
                newUser.save()
                    .then(user => JSON.stringify(user))
                    .catch(err => console.log(err))
            })
        })
    }
})
//$route POST api/user/login
//@desc 返回token jwt password
//@access public 
router.post('/api/login', async (ctx, next) => {
    const quser = ctx.request.body
    const user = await User.findOne({
        email: quser.email
    })
    // console.log(user)
    if (!user) {
        ctx.body = JSON.stringify('用户不存在')
    } else {
        const match = await bcrypt.compare(quser.password, user.password)
        if (match) {
            let userToken = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                identity: user.identity
            }
            const token = jwt.sign(userToken, secret, {
                expiresIn: '1h'
            }) //token签名 有效期为1小时
            ctx.body = {
                message: '获取token成功',
                code: 1,
                token
            }
        } else {
            ctx.body = {
                message: '参数错误',
                code: -1
            }
        }

    }
})

//$route GET api/user/current
//@desc 返回 current
//@access private

router.get('/api/current', async (ctx, next) => {
    const token = ctx.header.authorization // 获取jwt
    let payload
    if (token) {
        payload = await jwt.verify(token.split(' ')[1], secret) // // 解密，获取payload
        ctx.body = {
            payload
        }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
})

module.exports = router