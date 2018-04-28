<template>
    <div>
        <div id="div3">
            <p>请发表评论</p>
        </div>
        <div>
            <button id="btn1">获取html</button>
            <button id="btn2">获取text</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "richTextor",

            mounted() {
                    console.log("hello editor!");

                    var E = window.wangEditor
                    var editor2 = new E('#div3')
                    editor2.customConfig.uploadImgShowBase64 = true
                    /*editor2.customConfig.menus = [  //菜单配置，不要可以直接去掉这个默认全部功能都有如下图
                        'head',
                        'bold',
                        'italic',
                        'underline'
                    ]*/
                    editor2.create();

                    document.getElementById('btn1').addEventListener('click', function () {
                        console.log(editor2.txt.html());
                        console.log("Hello Editor!");
                        alert(editor2.txt.html())
                    }, false);

                    document.getElementById('btn2').addEventListener('click', function () {
                        alert(editor2.txt.text())
                    }, false)
            }
    }
</script>

<style scoped>

</style>