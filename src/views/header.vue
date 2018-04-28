<template>
    <div class='headers'>
        <div class='wrap'>
            <el-row>
                <el-col :span="4">
                    <div class='logo'>
                        <img src="../../static/images/logo.png" alt="">
                    </div>
                </el-col>
                <el-col :span="13">
                    <div>
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1">
                                首页
                            </el-menu-item>
                            <el-menu-item index="2">
                                富文本
                            </el-menu-item>
                            <el-menu-item index="3">
                                关于我们
                            </el-menu-item>
                            <el-menu-item index="4">
                                厂家入驻
                            </el-menu-item>
                            <el-menu-item index="5">
                                证件办理
                            </el-menu-item>
                        </el-menu>
                        <div class="line"></div>
                    </div>
                </el-col>
                <el-col :span="7">
                    <ul class='login-btn' v-if='showLogin'>
                        <li v-if='!loginStatue'>
                            <router-link to='/login/logininfo'>
                                <el-button type="text">登录</el-button>
                            </router-link>
                        </li>
                        <li v-if='!loginStatue'>
                            /
                        </li>
                        <li v-if='!loginStatue'>
                            <router-link to='/register'>
                                <el-button type="text">注册</el-button>
                            </router-link>
                        </li>
                        <li v-if='loginStatue'>
                            <el-dropdown @command="handleCommand">
								<span class="el-dropdown-link">
																	<span class='login-name'>
																		<span class='badge' v-if='numMessage' v-text='numMessage'></span> 欢迎，
								<span class='company-name'>{{loginMsg.login_name}}</span>
								<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								</span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command='a'>
                                        消息通知
                                        <el-badge :value="numMessage" v-if='numMessage'></el-badge>
                                    </el-dropdown-item>
                                    <el-dropdown-item command='b'>我的药品</el-dropdown-item>
                                    <el-dropdown-item command='c'>证书信息</el-dropdown-item>
                                    <el-dropdown-item command='d'>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>


    </div>
</template>
<script>
    import {
        mapState,
        mapMutations
    } from "vuex";
    let cookie = require("js-cookie");
    export default {
        name: "headers",
        data() {
            return {
                activeIndex: "1",
                showLogin: true,
                numMessage: 0
            };
        },
        methods: {
            ...mapMutations([
                "loginOut",
                "getActiveRouter",
                "saveLoginMsg",
                "getNumMessage",
                "getCompanyStatus"
            ]),

            handleSelect(key, keyPath) {
                switch (key) {
                    case "1":
                        this.$router.push("/");
                        break;
                    case "2":
                        this.$router.push("/richTextor");
                        break;
                    case "3":
                        this.$router.push("/tree");
                        break;
                    case "4":
                        this.$router.push("/test");
                        break;
                    case "5":
                        this.$router.push("/test");
                        break;
                    default:
                        break;
                }
            },
            //下拉菜单handler
            handleCommand(command) {
                switch (command) {
                    case "a":
                        this.$router.push("/joinus/mymessage");
                        break;
                    case "b":
                        this.$router.push("/joinus/uploadedimg");
                        break;
                    case "c":
                        this.$router.push("/joinus/companymsg");
                        break;
                    case "d":
                        this.$router.push("/login/logininfo");
                        this.loginOut();
                        break;
                }
            },
            //获取新消息的数目
            getNumOfMessage() {
                this.axios
                    .post(
                        "/phmd/handler/queryCount.do",
                        this.$qs.stringify({
                            company_id: cookie.get("_userid")
                        })
                    )
                    .then(res => {
                        if (res.data) {
                            this.numMessage = res.data;
                            this.getNumMessage(res.data);
                        }
                    });
            },
            //获取公司审核状态
            getCompanyStatu() {
                this.axios
                    .post(
                        "/phmd/enterprise/queryByCompany_id.do",
                        this.$qs.stringify({
                            company_id: cookie.get("_userid")
                        })
                    )
                    .then(res => {
                        console.log(res);
                        if (res.data) {
                            this.getCompanyStatus(res.data.audit_flag);
                        }
                    })
                    .catch(err => {});
            },
            //登录
            getLoginMsg() {
                let pathName = this.$route.matched[0].name;
                console.log(pathName)
                switch (pathName) {
                    case "index":
                        this.activeIndex = "1";
                        break;
                    case "news":
                        this.activeIndex = "2";
                        break;
                    case "aboutus":
                        this.activeIndex = "3";
                        break;
                    case "joinus":
                        this.activeIndex = "4";
                        break;
                    case "certificate":
                        this.activeIndex = "5";
                        break;
                    default:
                        this.activeIndex = "0";
                        break;
                }
                //监听是否为登陆状态
                //未登录
                if (this.$route.matched[0].name == "joinus" && !cookie.get("_userid")) {
                    this.$router.push("/login/logininfo");
                }
                if (cookie.get("_userid")) {
                    //已登录
                    this.saveLoginMsg({
                        login_name: cookie.get("_username"),
                        user_id: cookie.get("_userid")
                    });
                }
                //获取新消息的数目
                this.getNumOfMessage();
                //获取公司信息审核状态
                if (pathName == "joinus") {
                    this.getCompanyStatu();
                }
            }
        },
        computed: {
            ...mapState(["loginStatue", "loginMsg"])
        },
        watch: {
            $route() {
                this.getLoginMsg()
            }
        },
        created() {
            this.getNumOfMessage();
        },
        mounted() {
            this.getLoginMsg()
        }
    };
</script>
<style lang='less'>
    .test{
        position: absolute;
        top:300px;

    }
    .headers {
        border-bottom: 1px solid #DFDFDF;//#4CAB42;
        height: 60px;
        //box-shadow: 8px 0px 20px rgba(76, 171, 66, 0.5);
        background: #fff;
        z-index: 20;
        position: fixed;//relative;//absolute;
        top: 0;
        left: 0;
        width: 100%;
        .wrap {
            height: 58px;
            width: 1200px;
            margin: 0 auto;
            .logo {
                height: 58px;
                line-height: 58px;
                img {
                    vertical-align: middle;
                }
            }
            .el-menu--horizontal {
                border: 0;
                background: none;
                .el-menu-item {
                    // border-bottom: 2px solid rgb(76, 171, 66) !important;
                    font-size: 16px;
                    a {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        text-decoration: none;
                    }
                }
                .el-submenu__title {
                    font-size: 16px;
                }
                .is-active {
                    color: #fff;
                    background: rgb(76, 171, 66);
                    border-bottom: 2px solid rgb(76, 171, 66);
                }
            }
            .login-btn {
                display: flex;
                margin: 0;
                padding: 0;
                text-align: right;
                li {
                    list-style: none;
                    height: 58px;
                    line-height: 58px;
                    margin-right: 20px;
                    .el-dropdown {
                        height: 40px;
                    }
                    span {
                        font-size: 16px;
                        color: #878d99;
                        display: inline-block;
                    }
                    span.login-name {
                        font-size: 14px;
                    }
                    span.company-name {
                        display: inline-block;
                        width: 200px;
                        font-size: 14px;
                        height: 36px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        vertical-align: text-bottom;
                        text-align: left;
                    }
                }
            }
        }
    }
</style>
