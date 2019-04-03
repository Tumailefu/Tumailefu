const Koa = require('koa')
const router = require('koa-router')()

const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const secret = require('../../config/config').secret

const Profile = require('../../model/Profile')
const app = new Koa()

// router.get('/api/profiles', async (ctx, next) => {
//     ctx.body = "msg:profile"
//     // console.log(ctx.response)
// })

router.post('/api/profiles/add', async (ctx, next) => {
    const token = ctx.header.authorization // 获取jwt
    if (token) {
        const newProfile = new Profile(ctx.request.body)
        newProfile.save()
            .then(result => JSON.stringify(result))
            .catch(err => console.log(err))
        ctx.body = {
            token
        }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
})

router.get('/api/profiles', async (ctx, next) => {
    const token = ctx.header.authorization // 获取jwt
    if (token) {
        const profile = await Profile.find()
        if (profile) {
            ctx.body = JSON.stringify(profile)
        } else {
            ctx.body = "No content"
        }
    }
})

//获取单个信息
router.get('/api/profiles/:id', async (ctx, next) => {
    const token = ctx.header.authorization // 获取jwt
    if (token) {
        console.log(ctx.params)
        const profile = await Profile.findOne({
            _id: ctx.params.id
        })
        if (profile) {
            ctx.body = JSON.stringify(profile)
        } else {
            ctx.body = "No content"
        }
    }
})

//编辑单个信息
router.post('/api/profiles/edit/:id', async (ctx, next) => {
    const token = ctx.header.authorization // 获取jwt
    if (token) {
        const newProfile = ctx.request.body
        const UpdatedProfile = await Profile.findOneAndUpdate({
                _id: ctx.params.id
            }, {
                $set: newProfile
            }, {
                new: true
            })
            .catch(err => console.log(err))
         ctx.body = {
            UpdatedProfile,
            code: 1
        }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
})
//删除单个信息
router.delete('/api/profiles/del/:id', async (ctx, next) => {
    const token = ctx.header.authorization // 获取jwt
    if (token) {
        const profile = await Profile.findOneAndDelete({
            _id: ctx.params.id
        })
        if (profile) {
            ctx.body = "删除成功"
        } else {
            ctx.body = "No content"
        }
    }
})

module.exports = router