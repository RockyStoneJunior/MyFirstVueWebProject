<template>
    <div class='footer'>
        <div class='footer-menu'>
            <ul>
                <li>
                    <router-link to='/'>关于我们</router-link>
                </li>
                <li>
                    <router-link to='/'>产品服务</router-link>
                </li>
                <li>
                    <router-link to='/'>咨询建议</router-link>
                </li>
                <li>
                    <router-link to='/'>法律声明</router-link>
                </li>
                <li>
                    <router-link to='/'>联系我们</router-link>
                </li>
            </ul>
        </div>
        <div class='footer-msg'>
            <p>
                地址：深圳市福田区青海大厦24E
            </p>
            <p>
                客服电话：0755-83211186 传真号码：0755-82880511
            </p>
            <p>
                Copyright © 2002-2016深圳梵摩健康科技有限公司 版权所有
                <a href='http://www.miitbeian.gov.cn' target='_blank'>粤ICP备16005343号  </a>|
                <a href='../../static/images/certificate/certificate-1.jpg' target='_blank'>互联网药品信息服务资格证书  </a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        mounted() {

        }
    };
</script>

<style lang='less'>
    .footer {
        // height: 130px;
        //position: fixed;
        //width:100%;
        font-size: 12px;
        text-align: center;
        bottom: 0; // width:1200px;
        margin: 0 auto;
        margin-top: 0px; // margin-bottom: 20px;
        // border-top: 2px solid #4cab42;
        // padding-top: 20px;
        color: #fff;
        .footer-menu {
            // padding:10px 0;
            background: #3d9035;
            ul {
                li {
                    display: inline-block;
                    padding: 20px 20px;
                    a {
                        font-size: 16px;
                    }
                    &:hover {
                        background: #2b6b24;
                    }
                }
            }
        }
        p {
            line-height: 25px;
        }
        a {
            color: #fff;
            cursor: pointer;
        }
        a>p {
            text-align: center;
            display: inline-block;
            width: 100%;
        }
        .footer-msg {
            padding: 20px 0;
            background: #4cab42;
        }
    }
</style>